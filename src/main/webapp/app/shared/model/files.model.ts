import { IStudyUsers } from '@/shared/model/study-users.model';

export interface IFiles {
  id?: number;
  name?: string | null;
  fileSize?: number | null;
  contentType?: string | null;
  createdAt?: Date | null;
  createdBy?: IStudyUsers | null;
}

export class Files implements IFiles {
  constructor(
    public id?: number,
    public name?: string | null,
    public fileSize?: number | null,
    public contentType?: string | null,
    public createdAt?: Date | null,
    public createdBy?: IStudyUsers | null
  ) {}
}
