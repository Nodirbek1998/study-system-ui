import Vue from "vue";
import {Component, Inject} from "vue-property-decorator";
import TaskService from "@/entities/task/task.service";
import AlertService from "@/shared/alert/alert.service";
import Vue2Filters from "vue2-filters";
import {ITask, Task} from "@/shared/model/task.model";
import FilesService from "@/entities/files/files.service";



@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Tasks extends Vue{
  @Inject('taskService') private taskService: () => TaskService;
  @Inject('filesService') private filesService: () => FilesService;
  @Inject('alertService') private alertService: () => AlertService;

  public task: ITask = new Task();
  public isSaving = false;
  public currentLanguage = '';
  public uploadDocument = null;


  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.groupId) {
        vm.retrieveArticle(to.params.groupId);
      }
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

  public save(): void {
    this.isSaving = true;
    this.task.unitsId = Number(this.$route.params.unitsId);
    if (this.task.id) {
      this.taskService()
        .update(this.task)
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
    } else {
      this.taskService()
        .create(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.article.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
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

  public retrieveTask(taskId): void {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
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
        this.task.filesDTO = res;
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastFailed(err);
      });
  }

}
