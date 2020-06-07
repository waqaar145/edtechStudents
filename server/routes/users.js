var authRoutes = require('./users/auth/auth.routes.js');

module.exports.routes = (app) => {
  app.use('/api/v1', authRoutes)
}