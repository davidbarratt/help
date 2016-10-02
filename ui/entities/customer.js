import Entity from './entity.js';

class Customer extends Entity {
  constructor () {
    super();
    this.firstName = '';
    this.lastName = '';
    this.emails = [];
  }
}

export default Customer;
