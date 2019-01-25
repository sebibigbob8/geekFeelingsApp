export class CreateRDV {
  push(rdv: CreateRDV): any {
    throw new Error("Method not implemented.");
  }
  slice(): CreateRDV {
    throw new Error("Method not implemented.");
  }

  creator: string;
  purposeTitle: string;
  description: string;
  date: Date;
  city: string;
  long: string;
  lat: string;
  category: string;
  guest: Array<string>;
  location: string;
}
