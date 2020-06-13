var authRoutes = require('./users/auth/auth.routes.js');
var topLevelRoutes = require('./users/top-level/top_level.routes.js');

module.exports.routes = (app) => {
  app.use('/api/v1', authRoutes),
  app.use('/api/v1', topLevelRoutes)
}