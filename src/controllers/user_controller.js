/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });
// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  // maybe have to do more here
  console.log(req);
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  User.exists({ email }).then((result) => {
    if (result) {
      return res.status(422).send('User already exists');
    } else {
      const user = new User();
      user.email = email;
      user.password = password;
      user.save()
        .then((newUser) => {
        // don't know what to insert in parameter
          return res.send({ token: tokenForUser(newUser) });
        })
        .catch((error) => {
          return res.send(error);
        });
    }
  })
    .catch((error) => {
      return res.send(error);
    });
};
