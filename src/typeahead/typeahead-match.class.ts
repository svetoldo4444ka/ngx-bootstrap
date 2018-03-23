export class TypeaheadMatch {
  readonly value: string;
  readonly item: any;
  protected header: boolean;
  public idItem?: string;

  constructor(item: any, value: string = item, header = false, idItem?: string) {
    this.item = item;
    this.value = value;
    this.header = header;
    this.idItem = idItem;
  }

  isHeader(): boolean {
    return this.header;
  }

  toString(): string {
    return this.value;
  }
  isIdItem(): string {
    return  this.idItem;
  }
}
