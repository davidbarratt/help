import Customer from '../entities/customer.js';
import Email from '../entities/email.js';
import Normalizer from './normalizer.js';

class CustomerNormalizer extends Normalizer {
  normalize (data = {}) {
    let emails = [];
    if (Array.isArray(data.emails)) {
      for (let i = 0; i < data.emails.length; i++) {
        emails.push(Email.create(data.emails[i]));
      }
    }

    data.emails = emails;

    return Customer.create(data);
  }
}

export default CustomerNormalizer;
