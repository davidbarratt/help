const rp = require('request-promise');

class ClientRequest {

  constructor (baseUrl) {
    this.options = {
      baseUrl: baseUrl,
      method: 'GET',
      json: true
    };
  }

  get client () {
    return rp.defaults(this.options);
  }

  get (path, params = {}) {
    return this.client({
      uri: path,
      qs: params
    });
  }

  put (path, data = {}) {
    return this.client({
      uri: path,
      method: 'PUT',
      body: data
    });
  }
}

export default ClientRequest;