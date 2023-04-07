const redis = require('redis');

// I still dont know
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.error(err);
    });
  }

  isAlive() {
    return this.client.connect;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.client.get(key, (err, value) => {
        if (err) {
          return reject(err);
        }
        resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.client.del(key, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response > 0);
      });
    });
  }
}

export default RedisClient;
