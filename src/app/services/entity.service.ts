import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private storage: Storage) { }

  addEntity(entity: any): Promise<any> {
    return this.storage.get('entity_individual').then( items => {
      if (items) {
        items.push(entity);
        return this.storage.set('entity_individual', items);
      } else {
        return this.storage.set('entity_individual', [entity]);
      }
    });
  }

  getItems(): Promise<any[]> {
    return this.storage.get('entity_individual');
  }

  updateEntity(entity: any): Promise<any> {
    return this.storage.get('entity_individual').then( items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for(let i of items) {
        if (i.objid == entity.objid) {
          newItems.push(entity);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set('entity_individual', newItems);
    });
  }

  deleteEntity(objid:string): Promise<any> {
    return this.storage.get('entity_individual').then( items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== objid) {
          toKeep.push(i);
        }
      }
      return this.storage.set('entity_individual', toKeep);
    });
  }
}
