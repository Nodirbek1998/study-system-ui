import { IRole } from '@/shared/model/role.model';
import { IGroups } from '@/shared/model/groups.model';
import { ITestAnswer } from '@/shared/model/test-answer.model';
import { ITaskAnswer } from '@/shared/model/task-answer.model';

export interface IStudyUsers {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
  phone?: string | null;
  email?: string | null;
  login?: string | null;
  password?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  role?: IRole | null;
  groups?: IGroups[] | null;
  testAnswers?: ITestAnswer[] | null;
  taskAnswers?: ITaskAnswer[] | null;
}

export class StudyUsers implements IStudyUsers {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public age?: number | null,
    public phone?: string | null,
    public email?: string | null,
    public login?: string | null,
    public password?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public role?: IRole | null,
    public groups?: IGroups[] | null,
    public testAnswers?: ITestAnswer[] | null,
    public taskAnswers?: ITaskAnswer[] | null
  ) {}
}
