import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEdoCalendar } from '@/shared/model/edo-calendar.model';
import CalendarService from './calendar.service';

@Component
export default class EdoCalendarDetails extends Vue {
  @Inject('edoCalendarService') private edoCalendarService: () => CalendarService;
  public edoCalendar: IEdoCalendar = {};

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
        this.edoCalendar = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
