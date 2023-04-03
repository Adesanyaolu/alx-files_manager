import { createClient } from './utils/redis';

class RedisClient {
    constructor () {
        this.client = createClient();
        this.client.on('error', (err) => {
            console.error(err);
        });
    }


    isAlive(){
        return this.client.connected;
    };


    async get(key) {
        return new Promise ((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if(err) {
                    return reject (err);
                }
                resolve(value);
            });
        });
    }


    async set(key, value, duration) {
        return new Promise ((resolve, reject) => {
            this.client.setex(key, duration, value, (err) => {
                if (err) {
                    return reject (err);
                }
                resolve (true);
            })
        })

    }

    async del (key) {
        return new Promise ((resolve, reject) => {
            this.client.del (key, (err, response) => {
                if (err) {
                    return reject (err);
                }
                resolve (response > 0)
            });
        });
    };

}

const redisClient = new RedisClient();


export default RedisClient;

