'use strict';

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  listen_host: process.env.LISTEN_HOST || '0.0.0.0',
  db: {
    name: 'nodetest',
    host: 'localhost',
    port: 27017,
    user: '',
    pass: ''
  },
  session: {
    secret: process.env.SESSION_SECRET || 'nodesugs',
    ttl: process.env.SESSION_TTL || 900
  }
};
