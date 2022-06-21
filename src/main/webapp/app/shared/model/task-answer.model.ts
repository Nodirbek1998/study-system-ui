import { IStudyUsers } from '@/shared/model/study-users.model';
import {IFiles} from "@/shared/model/files.model";

export interface ITaskAnswer {
  id?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  studyUsers?: IStudyUsers[] | null;
  files?: IFiles;
  fileId?: number;
}

export class TaskAnswer implements ITaskAnswer {
  constructor(
    public id?: number,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public studyUsers?: IStudyUsers[] | null,
    public filesDTO?: IFiles,
    public fileId?: number
  ) {}
}
