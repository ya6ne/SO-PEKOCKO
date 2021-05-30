const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f"); /* key et iv pour CryptoJs */
var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");


exports.signup = (req, res, next) => {
  var cryptedMail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: cryptedMail,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  var cryptedMail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
    User.findOne({ email: cryptedMail })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {

            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'SECRET_KEY',
                { expiresIn: '1h'} /* (ms) => 5min */
                
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };