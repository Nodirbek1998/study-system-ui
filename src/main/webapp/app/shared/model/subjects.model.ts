import { IGroups } from '@/shared/model/groups.model';

export interface ISubjects {
  id?: number;
  nameUz?: string | null;
  nameRu?: string | null;
  nameEn?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  groups?: IGroups[] | null;
  groupsDTOS?: IGroups[] | null;
}

export class Subjects implements ISubjects {
  constructor(
    public id?: number,
    public nameUz?: string | null,
    public nameRu?: string | null,
    public nameEn?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public groups?: IGroups[] | null,
    public groupsDTOS?: IGroups[] | null
  ) {}
}
