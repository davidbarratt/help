import Entity from './entity.js';

class Customer extends Entity {
  constructor () {
    super();
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.emails = [];
    this.state = 'clean';
  }
}

export default Customer;
