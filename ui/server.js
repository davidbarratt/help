// Use babel for ES2015 modules.
require('babel-register');

const CustomerController = require('./controllers/customer');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: 80
});

server.handler('test', (route, options) => {
  return (request, reply) => {
    return reply('new handler: ' + options.msg);
  };
});

const customer = new CustomerController();

server.route({
  method: 'GET',
  path: '/customer/duplicates',
  handler: (request, reply) => {
    return customer.duplicateCustomers(request, reply);
  }
});

/**
 * @TODO Make Routes to fetch a single item.
 */
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: (request, reply) => {
    return customer.allCustomers(request, reply);
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
