'use strict';

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  listen_host: process.env.LISTEN_HOST || '0.0.0.0',
  db: {
    name: process.env.MONGO_NAME || 'nodetest',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    user: process.env.MONGO_USER || '',
    pass: process.env.MONGO_PASS || ''
  },
  session: {
    secret: process.env.SESSION_SECRET || 'nodesugs',
    ttl: process.env.SESSION_TTL || 900
  }
};
