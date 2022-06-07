import { Component, Inject, Vue } from 'vue-property-decorator';
import TranslationService from '@/locale/translation.service';
import {IReminder} from "@/shared/model/reminder.model";
import ReminderService from "@/entities/reminder/reminder.service";

@Component
export default class ReminderHomeComponent extends Vue {
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('reminderService') private reminderService: () => ReminderService;

  public currentLanguage = 'en';
  public reminders: IReminder[] = [];

  created(): void {
    this.retrieveReminders();
  }

  public retrieveReminders() {
    this.reminderService()
      .retrieve()
      .then(res => {
        this.reminders = res.data;
      });
  }

}
