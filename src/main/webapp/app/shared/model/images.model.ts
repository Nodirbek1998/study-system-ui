import { IStudyUsers } from '@/shared/model/study-users.model';

export interface IImages {
  id?: number;
  name?: string | null;
  imageSize?: number | null;
  contentType?: string | null;
  createdAt?: Date | null;
  studyUser?: IStudyUsers | null;
}

export class Images implements IImages {
  constructor(
    public id?: number,
    public name?: string | null,
    public imageSize?: number | null,
    public contentType?: string | null,
    public createdAt?: Date | null,
    public studyUser?: IStudyUsers | null
  ) {}
}
