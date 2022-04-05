import { IRole } from '@/shared/model/role.model';

import { EnumStaticPermission } from '@/shared/model/enumerations/enum-static-permission.model';
export interface IRoleStaticPermission {
  id?: number;
  staticPermission?: EnumStaticPermission | null;
  role?: IRole | null;
  staticPermissions?: string[];
  roleId?: number;
}

export class RoleStaticPermission implements IRoleStaticPermission {
  constructor(public id?: number, public staticPermission?: EnumStaticPermission | null, public role?: IRole | null, public staticPermissions?: string[],  public roleId?: number) {}
}
