import { CreateRDV } from './../models/create-rdv';
import { Subject } from 'rxjs/Subject';

export class RdvService {
  private rdvs: CreateRDV;
  rdvSubject = new Subject<CreateRDV>();

  emitRdvs() {
    this.rdvSubject.next(this.rdvs.slice());
  }

  private newMethod() {
    return this;
  }

  addUser(rdv: CreateRDV) {
    this.rdvs.push(rdv);
    this.emitRdvs();
  }
}
