export class BaseCollection<Entity> {
  items: (Entity | [])[];

  totalRecords: number;

  extraData: any;

  constructor(items: (Entity | [])[], totalRecords: number, extraData?: any) {
    this.totalRecords = totalRecords || 0;
    this.items = items;
    this.extraData = extraData;
  }
}
