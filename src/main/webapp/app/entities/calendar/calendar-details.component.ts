import { Component, Vue, Inject } from 'vue-property-decorator';

import CalendarService from './calendar.service';
import {ICalendar} from "@/shared/calendar.model";

@Component
export default class EdoCalendarDetails extends Vue {
  @Inject('edoCalendarService') private edoCalendarService: () => CalendarService;
  public calendar: ICalendar = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.edoCalendarId) {
        vm.retrieveEdoCalendar(to.params.edoCalendarId);
      }
    });
  }

  public retrieveEdoCalendar(edoCalendarId) {
    this.edoCalendarService()
      .find(edoCalendarId)
      .then(res => {
        this.calendar = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
