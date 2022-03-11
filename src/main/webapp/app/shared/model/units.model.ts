import { ISubjects } from '@/shared/model/subjects.model';

export interface IUnits {
  id?: number;
  nameUz?: string | null;
  nameRu?: string | null;
  nameEn?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  subject?: ISubjects | null;
}

export class Units implements IUnits {
  constructor(
    public id?: number,
    public nameUz?: string | null,
    public nameRu?: string | null,
    public nameEn?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public subject?: ISubjects | null
  ) {}
}
