import {IStudyUsers} from "@/shared/model/study-users.model";
import {IFiles} from "@/shared/model/files.model";
import {IExamples} from "@/shared/model/examples.model";

export interface IExamplesAnswer {
  id?: number;
  name?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  createdBy?: IStudyUsers | null;
  filesDTO?: IFiles | null;
  examplesDTO?: IExamples | null;
  filesId?: number | null;
  status?: string | null;
  ball?: number | null;
  examplesId?: number | null;
}

export class ExamplesAnswer implements IExamplesAnswer {
  constructor(
    public id?: number,
    public name?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public createdBy?: IStudyUsers | null,
    public filesDTO?: IFiles | null,
    public examplesDTO?: IExamples | null,
    public filesId?: number | null,
    public status?: string | null,
    public ball?: number | null,
    public examplesId?: number | null
  ) {}
}

