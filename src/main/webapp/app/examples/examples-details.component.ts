import { Component, Vue, Inject } from 'vue-property-decorator';

import {EnumArticle, IArticle} from '@/shared/model/article.model';
import ExamplesService from './examples.service';
import AlertService from '@/shared/alert/alert.service';
import {IExamples} from "@/shared/model/examples.model";
import FilesService from "@/entities/files/files.service";
import {ExamplesAnswer, IExamplesAnswer} from "@/shared/model/examples-answer.model";
import ExamplesAnswerService from "@/examples-answer/examples-answer.service";

@Component
export default class ArticleDetails extends Vue {
  @Inject('examplesService') private examplesService: () => ExamplesService;
  @Inject('examplesAnswerService') private examplesAnswerService: () => ExamplesAnswerService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('filesService') private filesService: () => FilesService;

  public examples: IExamples = {};
  public examplesAnswer: IExamplesAnswer = new ExamplesAnswer();
  public isSaving = false;
  public currentLanguage = '';
  public isFullViewPdf = false;
  public openAnswer = false;
  public uploadDocument = null;


  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.examplesId) {
        vm.retrieveExamples(to.params.examplesId);
      }
    });
  }

  created(): void{
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  }

  public retrieveExamples(articleId) {
    this.examplesService()
      .find(articleId)
      .then(res => {
        this.examples = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }

  public  approvalPdfUrl(id): string {
    let makeUrl = '/api/edo-files-pdf/' + id + '?Accept-Language=' + this.currentLanguage;
    return makeUrl;
  }

  public save(): void {
    this.isSaving = true;
    if (this.examples.id) {
      this.examplesService()
        .update(this.examples)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.article.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }


  public onChangeAttachment(event): void {
    let file = null;
    if (event && event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    }
    if (!file) {
      return;
    }
    this.filesService()
      .uploadFile(file,'3')
      .then(res => {
        (<any>this.$root).showLoader(false);
        console.log(res);
        this.examplesAnswer.filesDTO = res;
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastFailed(err);
      });
  }

  public createExamplesAnswer(): void {
    this.openAnswer = !this.openAnswer;
  }


  public saveIA(): void {
    this.isSaving = true;
    (<any>this.$root).showLoader(true);
    if (this.examplesAnswer.id) {
      this.examplesAnswerService()
        .update(this.examplesAnswer)
        .then(param => {
          (<any>this.$root).showLoader(false);
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('kdbemdocsuiApp.edoDtDepartment.updated', { param: param.id });
          (<any>this.$root).toastSuccess(message);
        })
        .catch(err => {
          (<any>this.$root).showLoader(false);
          (<any>this.$root).toastError(err.toString());
        });
    } else {
      this.examplesAnswerService()
        .create(this.examplesAnswer)
        .then(param => {
          (<any>this.$root).showLoader(false);
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('kdbemdocsuiApp.edoDtDepartment.created', { param: param.id });
          (<any>this.$root).toastSuccess(message);
        })
        .catch(err => {
          (<any>this.$root).showLoader(false);
          (<any>this.$root).toastError(err.toString());
        });
    }
  }

}
