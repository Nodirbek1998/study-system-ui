import { ITests } from '@/shared/model/tests.model';

export interface ITestQuestion {
  id?: number;
  name?: string | null;
  level?: number | null;
  answerA?: boolean | null;
  answerB?: boolean | null;
  answerC?: boolean | null;
  answerD?: boolean | null;
  test?: ITests | null;
}

export class TestQuestion implements ITestQuestion {
  constructor(
    public id?: number,
    public name?: string | null,
    public level?: number | null,
    public answerA?: boolean | null,
    public answerB?: boolean | null,
    public answerC?: boolean | null,
    public answerD?: boolean | null,
    public test?: ITests | null
  ) {
    this.answerA = this.answerA ?? false;
    this.answerB = this.answerB ?? false;
    this.answerC = this.answerC ?? false;
    this.answerD = this.answerD ?? false;
  }
}
