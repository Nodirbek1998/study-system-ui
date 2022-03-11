export interface ITask {
  id?: number;
  topic?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deadline?: Date | null;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public topic?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public deadline?: Date | null
  ) {}
}
