import { Component, Inject, Vue } from 'vue-property-decorator';
import JhiDataUtils from '@/shared/data/data-utils.service';
import {ICalendar} from "@/shared/calendar.model";
import TranslationService from "@/locale/translation.service";
import CalendarService from "@/entities/calendar/calendar.service";

@Component
export default class CalendarHomeComponent extends Vue {
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('calendarService') private calendarService: () => CalendarService;
  // @ts-ignore
  public currentLanguage = this.translationService().getCurrentLanguage();

  public events: ICalendar[] = [];
  public todoEvents: ICalendar[] = [];
  public calendarValue = '';
  public context = null;
  public hideHeader = true;
  public dataUtilsService: JhiDataUtils;

  created(): void {
    this.dataUtilsService = new JhiDataUtils();
  }

  public onContext(ctx): void {
    this.context = ctx;
    let dateSelected = ctx.selectedDate;
    if (!dateSelected) {
      dateSelected = new Date();
    }
    const dateBegin = this.dataUtilsService.getDateWithFormat(dateSelected);
    this.retrieveEventCalendar(dateBegin, dateBegin);
  }

  public retrieveEventCalendar(beginDate: string, endDate: string): void {
    this.calendarService()
      .findByDate(beginDate, endDate)
      .then(res => {
        const todoE = [];
        this.events = res.data.filter(function (e) {
          if (e.id != null) {
            todoE.push(e);
          }
          return e.id == null;
        });
        this.todoEvents = todoE;
        this.sortingEvents();
      });
  }

  public sortingEvents(): void {
    if (this.events && this.events.length > 0) {
      const eventsCopy = this.events;
      const todayEvents = [];
      const otherEvents = [];
      eventsCopy.forEach(value => {
        const showDate = this.dataUtilsService.getDateFromFormat(value.showDate);
        if (this.dataUtilsService.isTodayDate(showDate)) {
          todayEvents.push(value);
        } else {
          otherEvents.push(value);
        }
      });
      this.events = [];
      todayEvents.forEach(value => this.events.push(value));
      const _this = this;
      otherEvents.sort((a, b) => {
        const date1 = _this.dataUtilsService.getDateFromFormat(a.showDate);
        const date2 = _this.dataUtilsService.getDateFromFormat(b.showDate);
        return new Date(date1).getTime() - new Date(date2).getTime();
      });
      otherEvents.forEach(value => this.events.push(value));
    } else {
      this.events = [];
    }
  }


}
