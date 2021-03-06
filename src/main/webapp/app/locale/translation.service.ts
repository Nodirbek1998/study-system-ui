import axios from 'axios';
import VueI18n from 'vue-i18n';
import { Store } from 'vuex';
import dayjs from 'dayjs';
import {ISelectModel, SelectModel} from "@/shared/model/select/select-model";

export default class TranslationService {
  private store: Store<{}>;
  private i18n: VueI18n;

  constructor(store: Store<{}>, i18n: VueI18n) {
    this.store = store;
    this.i18n = i18n;
  }

  public getCurrentLanguage(): string {
    return this.store.getters.currentLanguage;
  }


  public refreshTranslation(newLanguage: string) {
    let currentLanguage = this.store.getters.currentLanguage;
    currentLanguage = newLanguage ? newLanguage : 'en';
    if (this.i18n && !this.i18n.messages[currentLanguage]) {
      this.i18n.setLocaleMessage(currentLanguage, {});
      axios.get(`i18n/${currentLanguage}.json?_=${I18N_HASH}`).then((res: any) => {
        if (res.data) {
          this.i18n.setLocaleMessage(currentLanguage, res.data);
          this.setLocale(currentLanguage);
        }
      });
    } else if (this.i18n) {
      this.setLocale(currentLanguage);
    }
  }

  private setLocale(lang: string) {
    dayjs.locale(lang);
    this.i18n.locale = lang;
    this.store.commit('currentLanguage', lang);
    axios.defaults.headers.common['Accept-Language'] = lang;
    document.querySelector('html').setAttribute('lang', lang);
  }

  public chooseLangLabelFromObj(obj): string {
    if (obj) {
      const locale = this.getCurrentLanguage();
      if (locale.startsWith('uz')) {
        return obj['nameUz'];
      } else if (locale.startsWith('en')) {
        return obj['nameEn'];
      } else {
        return obj['nameRu'];
      }
    }
    return '';
  }

  public selectBoxOptions(list, emptyModel?: ISelectModel): ISelectModel[] {
    const options: ISelectModel[] = [];
    if (emptyModel) {
      options.push(emptyModel);
    }
    if (list && list.length > 0) {
      list.forEach(val => {
        const label = this.chooseLangLabel(val.nameUz, val.nameRu, val.nameEn);
        const docType = new SelectModel(val.id, label, val);
        options.push(docType);
      });
    }

    return options;
  }

  public chooseLangLabel(labUz, labRu, labEn): string {
    const locale = this.getCurrentLanguage();
    let lab = '';
    if (locale.startsWith('uz')) {
      lab = labUz;
    } else if (locale.startsWith('en')) {
      lab = labEn;
    } else {
      lab = labRu;
    }

    return lab;
  }

}
