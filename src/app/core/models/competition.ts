export class Competition {
  public id: string;
  public name: string;

  constructor(obj?: Partial<Competition>) {
    this.id = (obj && obj.id) || undefined;
    this.name = (obj && obj.name) || undefined;
  }
}
