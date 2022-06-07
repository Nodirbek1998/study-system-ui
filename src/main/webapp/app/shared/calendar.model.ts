export interface ICalendar {
  id?: number;
  nameUz?: string;
  nameRu?: string;
  nameEn?: string;
  showDate?: Date;
  createdOn?: Date;
  isDeleted?: boolean;
}

export class Calendar implements ICalendar {
  constructor(
    public id?: number,
    public nameUz?: string,
    public nameRu?: string,
    public nameEn?: string,
    public showDate?: Date,
    public createdOn?: Date,
    public isDeleted?: boolean
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
