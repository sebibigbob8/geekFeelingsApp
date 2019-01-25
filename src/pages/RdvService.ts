import { CreateRDV } from './../models/create-rdv';
import { Subject } from 'rxjs/Subject';

export class RdvService {
  private rdvs: CreateRDV[];
  public rdvSubject = new Subject<CreateRDV[]>();

  emitRdvs() {
    this.rdvSubject.next(this.rdvs.slice());
  }

  addUser(rdv: CreateRDV) {
    this.rdvs.push(rdv);
    this.emitRdvs();
  }
}
