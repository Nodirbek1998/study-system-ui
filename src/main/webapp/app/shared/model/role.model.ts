export interface IRole {
  id?: number;
  nameUz?: string | null;
  nameRu?: string | null;
  nameEn?: string | null;
}

export class Role implements IRole {
  constructor(public id?: number, public nameUz?: string | null, public nameRu?: string | null, public nameEn?: string | null) {}
}
