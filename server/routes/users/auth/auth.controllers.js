const knex = require('./../../../db/knex');
const { check, validationResult } = require('express-validator');
const {unExpectedError} = require('./../../../messages/error');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const signUp = async (req, res) => {
  // Validation *******
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: 'Got error while submitting',
      data: errors.array()
    });
  }
  // Validation *******

  const { first_name, last_name, email, password } = req.body;
  let email_exists = await knex('ed_users').where('u_email', email).returning(['u_email', 'u_id']).first();
  if (email_exists) {
    return res.status(400).send(
      unExpectedError(
        'Can\'t signup',
        'This email already exists, please try logging in!',
        'email'
      )
    );
  }

  bcrypt.hash(password, 8, async function(err, hash){
     if (err) return res.status(422).send(
      unExpectedError(
        'Can\'t signup',
        'Something went wrong!',
        'email'
      )
    );
     let username = slugify(email.split('@')[0], {
                          replacement: '',
                          remove: /[*+~.(][)'"!:@, .:;`~!@#$%^&{}]/g,
                          lower: true
                        });

     let count = await knex('ed_users').where('u_username', 'like', `%${username}%`).count('').first();
     count = parseInt(count.count);
     if (count > 0) {
      username = username + '-' + ( count + 1 );
     }

     username = '@' + username;

     knex('ed_users')
       .insert({u_first_name: first_name, u_last_name: last_name, u_username: username, u_email: email, u_password: hash})
       .returning(['u_id', 'u_uuid', 'u_first_name', 'u_last_name', 'u_username', 'u_email'])
       .then(function(user) {
         let user_obj = user[0];
         let obj = {
           uid: user_obj.u_id,
           uuid: user_obj.u_uuid,
           first_name: user_obj.u_first_name,
           last_name: user_obj.u_last_name,
           username: user_obj.u_username,
           email: user_obj.u_email
         }
         req.logIn(obj, function (err) {
           return res.status(200).send(obj);
         });
       })
       .catch(error => {
          console.log(error)
          return res.status(422).send(
            unExpectedError(
              'Can\'t signup',
              'Student can not be signed up, please try again later.',
              'email'
            )
          );
       })
     })

}

const signIn = async (req, res, next) => {
  // Validation *******
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Got error while signining',
      data: errors.array()
    });
  }
  // Validation *******
  try {
    const { email, password } = req.body;
    let user_obj = await knex('ed_users').where('u_email', email).first();
    if (!user_obj) {
      return res.status(400).send(
        unExpectedError(
          'Can\'t signin',
          'This email does not exist. please create a new account!',
          'email'
        )
      );
    }
    bcrypt.compare(password, user_obj.u_password, function(err, result){
         if(err) {
           return res.status(401).send(
             unExpectedError(
               'Unauthorized access',
               'Unauthorized access',
               'email'
           ));
         }
         if (result) {
           let obj = {
              uid: user_obj.u_id,
              uuid: user_obj.u_uuid,
              first_name: user_obj.u_first_name,
              last_name: user_obj.u_last_name,
              username: user_obj.u_username,
              email: user_obj.u_email
            }
           req.logIn(obj, function (err) {
             res.status(200).send(obj);
           });
         } else {
           return res.status(400).send(
             unExpectedError(
               'Can\'t signin',
               'Password did not match.',
               'password'
             )
           )
         }
      });
  } catch (err) {
    res.status(422).send(
      unExpectedError(
       'Can\'t signin',
       'Something went while signin',
       'password'
     ));
  }
}

const loggedIn = async (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user)
  }
  return res.status(401)
            .send({
              uid: '',
              uuid: '',
              name: '',
              email: '',
              slug: ''
            });
}

const logOut = async (req, res, next) => {
  req.session.destroy(function (err) {
    return res.status(200).send('logged-out')
  });
}

module.exports = { signUp, signIn, loggedIn, logOut }