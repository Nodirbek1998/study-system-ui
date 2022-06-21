import {IFiles} from "@/shared/model/files.model";

export interface ITask {
  id?: number;
  topic?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deadline?: Date | null;
  time?: string | null;
  filesDTO?: IFiles;
  fileId?: number;
  unitsId?: number;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public topic?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public deadline?: Date | null,
    public files?: IFiles,
    public time?: string,
    public fileId?: number,
    public unitsId?: number
  ) {}
}
