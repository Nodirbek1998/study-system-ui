import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IRoleStaticPermission } from '@/shared/model/role-static-permission.model';

const baseApiUrl = 'api/role-static-permissions';

export default class RoleStaticPermissionService {
  public find(id: number): Promise<IRoleStaticPermission> {
    return new Promise<IRoleStaticPermission>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IRoleStaticPermission): Promise<IRoleStaticPermission> {
    return new Promise<IRoleStaticPermission>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IRoleStaticPermission): Promise<IRoleStaticPermission> {
    return new Promise<IRoleStaticPermission>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: IRoleStaticPermission): Promise<IRoleStaticPermission> {
    return new Promise<IRoleStaticPermission>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getAllPermissions(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get('/api/static-permissions')
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getUserRoles(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get('/api/roles')
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getRolePermissionsById(roleId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`/api/role-static-permissions?roleId=${roleId}&size=1000`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public addRolePermissions(staticPermissionDto: IRoleStaticPermission): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(`/api/role-static-permissions`, staticPermissionDto)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public deleteRolePermissions(staticPermissionDto: IRoleStaticPermission): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`/api/role-static-permissions`, { data: staticPermissionDto })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
