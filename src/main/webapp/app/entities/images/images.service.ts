import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IImages } from '@/shared/model/images.model';

const baseApiUrl = 'api/images';

export default class ImagesService {
  public find(id: number): Promise<IImages> {
    return new Promise<IImages>((resolve, reject) => {
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

  public create(entity: IImages): Promise<IImages> {
    return new Promise<IImages>((resolve, reject) => {
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

  public update(entity: IImages): Promise<IImages> {
    return new Promise<IImages>((resolve, reject) => {
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

  public partialUpdate(entity: IImages): Promise<IImages> {
    return new Promise<IImages>((resolve, reject) => {
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

  public uploadImage(entity: File, type): Promise<IImages> {
    const formData = new FormData();
    formData.append('file', entity);
    return new Promise<IImages>((resolve, reject) => {
      axios
        .post(`api/images-upload`, formData)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getCurrUserAvatarUrl(userId: any): string {
    userId = userId === undefined ? 0 : userId;
    const protocol = location.protocol;
    const slashes = protocol.concat('//');
    const host = slashes.concat(window.location.hostname);
    let port = slashes.concat(window.location.port);
    if (port) {
      port = port.replace('http://', '');
      port = port.replace('https://', '');
      return host + `:` + port + `/api/images-by-user/` + (userId || 0);
    }
    return host + `/api/images-by-user/` + (userId || 0);
  }
}
