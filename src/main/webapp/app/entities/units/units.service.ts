import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IUnits } from '@/shared/model/units.model';
import buildSearchQueryOpts from "@/shared/search/search";

const baseApiUrl = 'api/units';

export default class UnitsService {
  public find(id: number): Promise<IUnits> {
    return new Promise<IUnits>((resolve, reject) => {
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

  public retrieve(paginationQuery?: any, searchForm?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
      .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`+ `&${buildSearchQueryOpts(searchForm)}`)
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

  public create(entity: IUnits): Promise<IUnits> {
    return new Promise<IUnits>((resolve, reject) => {
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

  public update(entity: IUnits): Promise<IUnits> {
    return new Promise<IUnits>((resolve, reject) => {
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

  public partialUpdate(entity: IUnits): Promise<IUnits> {
    return new Promise<IUnits>((resolve, reject) => {
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
}
