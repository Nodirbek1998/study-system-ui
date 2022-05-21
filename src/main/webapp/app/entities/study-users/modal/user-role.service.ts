import {IRoleUser} from "@/shared/model/role.user.model";
import axios from "axios";
import buildPaginationQueryOpts from "@/shared/sort/sorts";
// @ts-ignore
import buildSearchQueryOpts from "@/shared/search/search";


const baseApiUrl = 'api/user-roles';

export default class UserRoleService {

  public create(entity: IRoleUser): Promise<IRoleUser> {
    return new Promise<IRoleUser>((resolve, reject) => {
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

  public retrieve(paginationQuery?: any, searchForm?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}` + `${buildSearchQueryOpts(searchForm)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}
