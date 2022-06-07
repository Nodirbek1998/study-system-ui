import { IStudyUsers } from '@/shared/model/study-users.model';

export interface IReminder {
  id?: number;
  title?: string | null;
  body?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  createdBy?: IStudyUsers | null;
}

export class Reminder implements IReminder {
  constructor(
    public id?: number,
    public name?: string | null,
    public body?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public createdBy?: IStudyUsers | null,
  ) {}
}
