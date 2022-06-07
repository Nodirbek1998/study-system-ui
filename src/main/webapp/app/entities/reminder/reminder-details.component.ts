import { Component, Vue, Inject } from 'vue-property-decorator';

import { IArticle } from '@/shared/model/article.model';
import AlertService from '@/shared/alert/alert.service';
import ReminderService from "@/entities/reminder/reminder.service";
import {IReminder} from "@/shared/model/reminder.model";

@Component
export default class ReminderDetailsComponent extends Vue {
  @Inject('reminderService') private reminderService: () => ReminderService;
  @Inject('alertService') private alertService: () => AlertService;

  public reminder: IReminder = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reminderId) {
        vm.retrieveReminder(to.params.reminderId);
      }
    });
  }

  public retrieveReminder(articleId) {
    this.reminderService()
      .find(articleId)
      .then(res => {
        this.reminder = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }

}
