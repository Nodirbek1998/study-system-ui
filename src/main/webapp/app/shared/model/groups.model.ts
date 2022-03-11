import { IStudyUsers } from '@/shared/model/study-users.model';
import { ISubjects } from '@/shared/model/subjects.model';

export interface IGroups {
  id?: number;
  name?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  studyUsers?: IStudyUsers[] | null;
  subjects?: ISubjects[] | null;
}

export class Groups implements IGroups {
  constructor(
    public id?: number,
    public name?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public studyUsers?: IStudyUsers[] | null,
    public subjects?: ISubjects[] | null
  ) {}
}
