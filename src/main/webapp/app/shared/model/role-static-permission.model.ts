import { IRole } from '@/shared/model/role.model';

import { EnumStaticPermission } from '@/shared/model/enumerations/enum-static-permission.model';
export interface IRoleStaticPermission {
  id?: number;
  staticPermission?: EnumStaticPermission | null;
  role?: IRole | null;
}

export class RoleStaticPermission implements IRoleStaticPermission {
  constructor(public id?: number, public staticPermission?: EnumStaticPermission | null, public role?: IRole | null) {}
}
