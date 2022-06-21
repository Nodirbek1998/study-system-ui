import Component from "vue-class-component";
import Vue from "vue";
import AlertService from "@/shared/alert/alert.service";
import {Inject} from "vue-property-decorator";
import ExamplesService from "@/examples/examples.service";
import {Examples, IExamples} from "@/shared/model/examples.model";
import SubjectsService from "@/entities/subjects/subjects.service";
import {ISubjects} from "@/shared/model/subjects.model";
import {ISelectModel} from "@/shared/model/select/select-model";
import TranslationService from "@/locale/translation.service";
import FilesService from "@/entities/files/files.service";
import {EnumArticle} from "@/shared/model/article.model";


const validations: any = {
  examples:{

  }
}


@Component({
  validations,
})
export default class EdoDtDepartmentUpdate extends Vue {

  @Inject('alertService') private alertService: () => AlertService;
  @Inject('examplesService') private examplesService: () => ExamplesService;
  @Inject('subjectsService') private subjectsService: () => SubjectsService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('filesService') private filesService: () => FilesService;

  public examples: IExamples = new Examples();
  public currentLanguage = '';
  public subjects: ISelectModel[] = [];
  public isSaving = false;
  public convertFileAttachments = [];
  public uploadDocument = null;


  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.examplesId) {
        vm.retrieveExamples(to.params.examplesId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }


  public saveIA(): void {
    this.isSaving = true;
    (<any>this.$root).showLoader(true);
    this.examples.status = EnumArticle.NEW;
    if (this.examples.id) {
      this.examplesService()
        .update(this.examples)
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
      this.examplesService()
        .create(this.examples)
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
        this.examples.filesDTO = res;
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastFailed(err);
      });
  }



  public retrieveExamples(examplesId): void {
    (<any>this.$root).showLoader(true);
    this.examplesService()
      .find(examplesId)
      .then(res => {
        (<any>this.$root).showLoader(false);
        this.examples = res;
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastError(err.toString());
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.subjectsService()
      .retrieve()
      .then(res => {
        this.subjects = this.translationService().selectBoxOptions(res.data);
      })
      .catch(err => {
      (<any>this.$root).showLoader(false);
      (<any>this.$root).toastError(err.toString());
    });
  }

}
