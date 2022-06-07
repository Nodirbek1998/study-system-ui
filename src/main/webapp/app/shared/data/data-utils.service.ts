import { Component, Vue } from 'vue-property-decorator';

/**
 * An utility service for data.
 */
@Component
export default class JhiDataUtils extends Vue {
  /**
   * Method to abbreviate the text given
   */
  abbreviate(text, append = '...') {
    if (text.length < 30) {
      return text;
    }
    return text ? text.substring(0, 15) + append + text.slice(-10) : '';
  }

  /**
   * Method to find the byte size of the string provides
   */
  byteSize(base64String) {
    return this.formatAsBytes(this.size(base64String));
  }

  /**
   * Method to open file
   */
  openFile(contentType, data) {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: contentType,
    });
    const objectURL = URL.createObjectURL(blob);
    const win = window.open(objectURL);
    if (win) {
      win.onload = () => URL.revokeObjectURL(objectURL);
    }
  }

  /**
   * Method to convert the file to base64
   */
  toBase64(file, cb) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: any) => {
      const base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
    };
  }

  /**
   * Method to clear the input
   */
  clearInputImage(entity, elementRef, field, fieldContentType, idInput) {
    if (entity && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(entity, field)) {
        entity[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(entity, fieldContentType)) {
        entity[fieldContentType] = null;
      }
      if (elementRef && idInput && elementRef.nativeElement.querySelector('#' + idInput)) {
        elementRef.nativeElement.querySelector('#' + idInput).value = null;
      }
    }
  }

  endsWith(suffix, str) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  paddingSize(value) {
    if (this.endsWith('==', value)) {
      return 2;
    }
    if (this.endsWith('=', value)) {
      return 1;
    }
    return 0;
  }

  size(value) {
    return (value.length / 4) * 3 - this.paddingSize(value);
  }

  formatAsBytes(size) {
    return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
  }

  setFileData(event, entity, field, isImage) {
    if (event && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (isImage && !/^image\//.test(file.type)) {
        return;
      }
      this.toBase64(file, base64Data => {
        entity[field] = base64Data;
        entity[`${field}ContentType`] = file.type;
      });
    }
  }

  /**
   * Method to download file
   */
  downloadFile(contentType, data, fileName) {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: contentType,
    });
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(blob);
    tempLink.download = fileName;
    tempLink.target = '_blank';
    tempLink.click();
  }

  /**
   * Method to parse header links
   */
  parseLinks(header) {
    const links = {};

    if (header === null || header.indexOf(',') === -1) {
      return links;
    }
    // Split parts by comma
    const parts = header.split(',');

    // Parse each part into a named link
    parts.forEach(p => {
      if (p.indexOf('>;') === -1) {
        return;
      }
      const section = p.split('>;');
      const url = section[0].replace(/<(.*)/, '$1').trim();
      const queryString = { page: null };
      url.replace(new RegExp(/([^?=&]+)(=([^&]*))?/g), ($0, $1, $2, $3) => {
        queryString[$1] = $3;
      });
      let page = queryString.page;
      if (typeof page === 'string') {
        page = parseInt(page, 10);
      }
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = page;
    });
    return links;
  }

  public removeAllElements(arr): object[] {
    if (arr && arr.length > 0) {
      arr.splice(0, arr.length);
      return arr;
    } else {
      return [];
    }
  }

  public removeItemOnce(arr, value): object[] {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  public removeItemWithIndexes(arr, indexes): object[] {
    if (!indexes || indexes.length === 0) {
      return arr;
    }
    const newArray = [];
    if (arr && arr.length > 0) {
      arr.forEach((value, index) => {
        if (!indexes.includes(index)) {
          newArray.push(value);
        }
      });
    }
    // indexes.forEach(index => {
    //   if (index > -1) {
    //     arr.splice(index, 1);
    //   }
    // });
    return newArray;
  }

  public getDateWithFormat(date_ob): string {
    if (!date_ob) {
      return '';
    }
    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // return date in dd.MM.yyyy format
    return date + '.' + month + '.' + year;
  }

  /**
   * Get date from dd.MM.yyyy format
   * */
  public getDateFromFormat(dateStr): Date {
    if (!dateStr) {
      return null;
    }
    const splitDate = dateStr.split('.');
    if (splitDate.length === 3) {
      const day = splitDate[0];
      const month = splitDate[1];
      const year = splitDate[2];

      const date = new Date();
      date.setFullYear(year, parseInt(month, 0) - 1, day);

      return date;
    }

    return null;
  }
  public isTodayDate(date: Date): boolean {
    if (!date) {
      return false;
    }
    const curDate = new Date();
    return curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth() && curDate.getFullYear() === date.getFullYear();
  }

  public getCurrentHost(): string {
    const protocol = location.protocol;
    const slashes = protocol.concat('//');
    const host = slashes.concat(window.location.hostname);
    let port = slashes.concat(window.location.port);
    if (port) {
      port = port.replace('http://', '');
      port = port.replace('https://', '');
      return host + `:` + port;
    }
    return host;
  }

  public getFileUrl(fileId: number): string {
    const protocol = location.protocol;
    const slashes = protocol.concat('//');
    const host = slashes.concat(window.location.hostname);
    let port = slashes.concat(window.location.port);
    if (port) {
      port = port.replace('http://', '');
      port = port.replace('https://', '');
      return host + `:` + port + `/api/edo-files-download/` + (fileId || 0);
    }
    return host + `/api/edo-files-download/` + (fileId || 0);
  }

  public getImageFileUrl(fileId: number): string {
    const protocol = location.protocol;
    const slashes = protocol.concat('//');
    const host = slashes.concat(window.location.hostname);
    let port = slashes.concat(window.location.port);
    if (port) {
      port = port.replace('http://', '');
      port = port.replace('https://', '');
      return host + `:` + port + `/api/images/` + (fileId || 0);
    }
    return host + `/api/images/` + (fileId || 0);
  }
}
