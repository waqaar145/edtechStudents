var authRoutes = require('./users/auth/auth.routes.js');
var topLevelRoutes = require('./users/top-level/top_level.routes.js');
var contentRoutes = require('./users/contents/content.routes.js');

module.exports.routes = (app) => {
  app.use('/api/v1', authRoutes),
  app.use('/api/v1', topLevelRoutes),
  app.use('/api/v1', contentRoutes)
}