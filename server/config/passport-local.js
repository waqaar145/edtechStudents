const passport = require('passport');
const knex = require('./../db/knex.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(user, done) {
  console.log('PASSPORT LOCAL', user);
  let user1 = await knex('ed_users').where('u_id', user.uid).first();
  if (!user1) {
    done(null, false)
  }
  let obj = {
    uid: user.uid,
    uuid: user.uuid,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email
  }
  done(null, obj)
});