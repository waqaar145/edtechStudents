module.exports = {
  SERVER_URL: process.env.SERVER_URL,
  PORT: process.env.PORT,
  SESSTION_SECRET: process.env.SESSTION_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
  HASH_SECRET: process.env.HASH_SECRET,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  ORIGINS: process.env.ORIGINS || '*:*',
}