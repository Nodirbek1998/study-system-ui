import { IStudyUsers } from '@/shared/model/study-users.model';

export interface IArticle {
  id?: number;
  name?: string | null;
  text?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  studyUser?: IStudyUsers | null;
  createdBy?: IStudyUsers | null;
  updatedBy?: IStudyUsers | null;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public name?: string | null,
    public text?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public studyUser?: IStudyUsers | null,
    public createdBy?: IStudyUsers | null,
    public updatedBy?: IStudyUsers | null
  ) {}
}
