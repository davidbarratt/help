import Customer from '../entities/customer.js';
import Entity from '../entities/entity.js';
import Email from '../entities/email.js';
import Normalizer from './normalizer.js';

class EntityNormalizer extends Normalizer {
  constructor () {
    super();
    this.entityClassList = {
      customer: Customer,
      email: Email
    };
  }

  normalize (data = {}) {
    let EntityClass = Entity;

    if (typeof data.type !== 'undefined') {
      EntityClass = this.getEntityClass(data.type);
    }

    return EntityClass.create(data);
  }

  getEntityClass (type) {
    if (this.entityClassList[type] !== 'undefined') {
      return this.entityClassList[type];
    }

    return Entity;
  }
}

export default EntityNormalizer;
