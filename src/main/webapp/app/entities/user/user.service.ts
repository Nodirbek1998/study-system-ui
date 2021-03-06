import axios from 'axios';
import buildPaginationQueryOpts from "@/shared/sort/sorts";

const baseApiUrl = 'api/users';

export default class UserService {
  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl+`?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
