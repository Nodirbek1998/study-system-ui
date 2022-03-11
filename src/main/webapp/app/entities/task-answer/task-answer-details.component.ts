import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITaskAnswer } from '@/shared/model/task-answer.model';
import TaskAnswerService from './task-answer.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TaskAnswerDetails extends Vue {
  @Inject('taskAnswerService') private taskAnswerService: () => TaskAnswerService;
  @Inject('alertService') private alertService: () => AlertService;

  public taskAnswer: ITaskAnswer = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskAnswerId) {
        vm.retrieveTaskAnswer(to.params.taskAnswerId);
      }
    });
  }

  public retrieveTaskAnswer(taskAnswerId) {
    this.taskAnswerService()
      .find(taskAnswerId)
      .then(res => {
        this.taskAnswer = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
