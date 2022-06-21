import {IStudyUsers} from "@/shared/model/study-users.model";
import {IImages} from "@/shared/model/images.model";
import {IFiles} from "@/shared/model/files.model";

export interface IExamples {
  id?: number;
  name?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  createdBy?: IStudyUsers | null;
  filesDTO?: IFiles | null;
  filesId?: number | null;
  status?: string | null;
  ball?: number | null;
}

export class Examples implements IExamples {
  constructor(
    public id?: number,
    public name?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public createdBy?: IStudyUsers | null,
    public filesDTO?: IFiles | null,
    public filesId?: number | null,
    public status?: string | null,
    public ball?: number | null
  ) {}
}

