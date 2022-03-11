import { ISubjects } from '@/shared/model/subjects.model';

import { EnumTest } from '@/shared/model/enumerations/enum-test.model';
export interface ITests {
  id?: number;
  name?: string | null;
  status?: EnumTest | null;
  deadline?: Date | null;
  subject?: ISubjects | null;
}

export class Tests implements ITests {
  constructor(
    public id?: number,
    public name?: string | null,
    public status?: EnumTest | null,
    public deadline?: Date | null,
    public subject?: ISubjects | null
  ) {}
}
