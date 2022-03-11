import { IStudyUsers } from '@/shared/model/study-users.model';

import { EnumActionType } from '@/shared/model/enumerations/enum-action-type.model';
export interface IStudyLogs {
  id?: number;
  operationName?: string | null;
  clientIp?: string | null;
  host?: string | null;
  createdAt?: Date | null;
  actionType?: EnumActionType | null;
  studyUser?: IStudyUsers | null;
}

export class StudyLogs implements IStudyLogs {
  constructor(
    public id?: number,
    public operationName?: string | null,
    public clientIp?: string | null,
    public host?: string | null,
    public createdAt?: Date | null,
    public actionType?: EnumActionType | null,
    public studyUser?: IStudyUsers | null
  ) {}
}
