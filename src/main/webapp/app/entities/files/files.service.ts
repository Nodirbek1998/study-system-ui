import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IFiles } from '@/shared/model/files.model';
import {IImages} from "@/shared/model/images.model";

const baseApiUrl = 'api/files';

export default class FilesService {
  public find(id: number): Promise<IFiles> {
    return new Promise<IFiles>((resolve, reject) => {
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

  public create(entity: IFiles): Promise<IFiles> {
    return new Promise<IFiles>((resolve, reject) => {
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

  public update(entity: IFiles): Promise<IFiles> {
    return new Promise<IFiles>((resolve, reject) => {
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

  public partialUpdate(entity: IFiles): Promise<IFiles> {
    return new Promise<IFiles>((resolve, reject) => {
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

  public uploadFile(entity: File, type): Promise<IFiles> {
    const formData = new FormData();
    formData.append('file', entity);
    formData.append('type', type);
    return new Promise<IFiles>((resolve, reject) => {
      axios
        .post(`api/files-upload`, formData)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getFileUrl(fileId: number): string {
    const protocol = location.protocol;
    const slashes = protocol.concat('//');
    const host = slashes.concat(window.location.hostname);
    let port = slashes.concat(window.location.port);
    if (port) {
      port = port.replace('http://', '');
      port = port.replace('https://', '');
      return host + `:` + port + `/api/files-download/` + (fileId || 0);
    }
    return host + `/api/files-download/` + (fileId || 0);
  }

}
