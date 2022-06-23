import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';

import CalendarService from './calendar.service';
import AlertMixin from '@/shared/alert/alert.mixin';
import {ICalendar} from "@/shared/calendar.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Calendar extends mixins(AlertMixin) {
  @Inject('edoCalendarService') private edoCalendarService: () => CalendarService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = true;
  public totalItems = 0;

  public calendars: ICalendar[] = [];

  public isFetching = false;
  public fields = [
    { key: 'id', label: 'id', class: 'text-truncate' },
    { key: 'nameEn', label: 'nameEn', class: 'text-truncate' },
    { key: 'showDate', label: 'showDate', class: 'text-truncate' },
    { key: 'createdOn', label: 'createdOn', class: 'text-truncate' },
    { key: 'action', label: 'Action', class: 'text-center' },
  ];
  public tableOptions = {
    striped: true,
    bordered: false,
    borderless: false,
    outlined: false,
    small: false,
    hover: false,
    dark: false,
    fixed: false,
    footClone: false,
    headVariant: null,
    tableVariant: '',
    noCollapse: false,
    responsive: true,
    selectable: true,
    selectMode: 'single',
    stickyHeader: false,
  };
  public selectedRow = [];

  public mounted(): void {
    this.retrieveAllEdoCalendars();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllEdoCalendars();
  }

  public retrieveAllEdoCalendars(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    (<any>this.$root).showLoader(true);
    this.edoCalendarService()
      .retrieve(paginationQuery)
      .then(
        res => {
          (<any>this.$root).showLoader(false);
          this.calendars = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          (<any>this.$root).showLoader(false);
          this.isFetching = false;
          (<any>this.$root).toastError(err.toString());
        }
      )
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastError(err.toString());
      });
  }

  public prepareRemove(id): void {
    this.removeId = id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEdoCalendar(): void {
    (<any>this.$root).showLoader(true);
    this.edoCalendarService()
      .delete(this.removeId)
      .then(() => {
        (<any>this.$root).showLoader(false);
        const message = this.$t('kdbemdocsuiApp.edoCalendar.deleted', { param: this.removeId });
        (<any>this.$root).toastSuccess(message);
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllEdoCalendars();
        this.closeDialog();
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastError(err.toString());
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllEdoCalendars();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public onClickEdit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'EdoCalendarEdit', params: { edoCalendarId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public onSelectRow(row): void {
    this.selectedRow = row;
  }

  public onDbClickEdit(item, index, event): void {
    this.$router.push({ name: 'EdoCalendarEdit', params: { edoCalendarId: item.id } });
  }
}
