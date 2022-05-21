export interface IRoleUser {
  id?: number;
  userId?: number;
  roleId?: number;
  login?: string;
  password?: string;
}

export class RoleUser implements IRoleUser {
  constructor(public id?: number, public userId?: number, public login?: string, public password?: string, public roleId?: number) {}
}
