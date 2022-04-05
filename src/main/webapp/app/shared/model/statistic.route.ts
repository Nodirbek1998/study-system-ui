export interface IRouteStatistic {
  main?: boolean;
  entity?: boolean;
  admin?: boolean;
  subject?: boolean;
}

export class RouteStatistic implements IRouteStatistic{
  constructor(
    public main?: boolean,
    public entity?: boolean,
    public admin?: boolean,
    public subject?: boolean
    ) {
      this.main = this.main || false;
      this.entity = this.entity || false;
      this.admin = this.admin || false;
      this.subject = this.subject || false;
  }
}
