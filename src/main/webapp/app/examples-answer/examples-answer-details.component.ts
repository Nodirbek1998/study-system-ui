import { Component, Vue, Inject } from 'vue-property-decorator';

import {EnumArticle, IArticle} from '@/shared/model/article.model';
import ExamplesAnswerService from './examples-answer.service';
import AlertService from '@/shared/alert/alert.service';
import {IExamplesAnswer} from "@/shared/model/examples-answer.model";

@Component
export default class ArticleDetails extends Vue {
  @Inject('examplesAnswerService') private examplesAnswerService: () => ExamplesAnswerService;
  @Inject('alertService') private alertService: () => AlertService;

  public examplesAnswer: IExamplesAnswer = {};
  public isSaving = false;
  public isFullViewPdf = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.examplesAnswerId) {
        vm.retrieveArticle(to.params.examplesAnswerId);
      }
    });
  }

  created(): void{
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  }

  public retrieveArticle(articleId) {
    this.examplesAnswerService()
      .find(articleId)
      .then(res => {
        this.examplesAnswer = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }

  public get imageUrl(): string {
    let makeUrl = '/api/images/' + 0;

    if (this.examplesAnswer && this.examplesAnswer.filesDTO) {
      if (this.examplesAnswer.filesDTO.id) {
        makeUrl = '/api/images/' + this.examplesAnswer.filesDTO.id;
      }
    }
    return makeUrl;
  }

  public save(): void {
    this.isSaving = true;
    if (this.examplesAnswer.id) {
      this.examplesAnswerService()
        .update(this.examplesAnswer)
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

  public  approvalPdfUrl(id): string {
    let makeUrl = '/api/edo-files-pdf/' + id + '?Accept-Language=' + this.currentLanguage;
    return makeUrl;
  }
}
