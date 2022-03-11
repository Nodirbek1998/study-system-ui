import { IStudyUsers } from '@/shared/model/study-users.model';

export interface ITestAnswer {
  id?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  right?: boolean | null;
  studyUsers?: IStudyUsers[] | null;
}

export class TestAnswer implements ITestAnswer {
  constructor(
    public id?: number,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public right?: boolean | null,
    public studyUsers?: IStudyUsers[] | null
  ) {
    this.right = this.right ?? false;
  }
}
