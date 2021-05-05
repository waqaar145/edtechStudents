module.exports.redisConnection = () => {
  const redis = require("redis");
  const client = redis.createClient();
  client.on("connect", function () {
    console.log("Redis client connected");
  });
  client.set("count", "1");
};
