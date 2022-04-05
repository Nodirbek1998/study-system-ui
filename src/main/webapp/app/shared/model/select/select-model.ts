export interface ISelectModel {
  id?: any;
  label?: string;
  item?: object;
}

export class SelectModel implements ISelectModel {
  constructor(public id?: any, public label?: string, public item?: object) {}
}
