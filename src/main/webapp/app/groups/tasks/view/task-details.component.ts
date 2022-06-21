import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITask } from '@/shared/model/task.model';
import AlertService from '@/shared/alert/alert.service';
import FilesService from "@/entities/files/files.service";
import JhiDataUtils from "@/shared/data/data-utils.service";
import TaskService from "@/entities/task/task.service";

@Component
export default class TaskDetails extends Vue {
  @Inject('taskService') private taskService: () => TaskService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('filesService') private filesService: () => FilesService;
  public dataUtilsService: JhiDataUtils;

  public isFullViewPdf = false;
  public currentLanguage = '';

  public task: ITask = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskId) {
        vm.retrieveTask(to.params.taskId);
      }
    });
  }

  created(): void{
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  }

  public retrieveTask(taskId) {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }

  public get approvalPdfUrl(): string {
    let makeUrl = '/api/edo-task-files-pdf/' + this.$route.params.taskId + '?Accept-Language=' + this.currentLanguage;
    return makeUrl;
  }
}
