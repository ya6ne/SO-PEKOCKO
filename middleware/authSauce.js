const jwt = require('jsonwebtoken');
const Sauce = require('../models/Sauce');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.jwtKey); /* variable d'envirenement */
      const userId = decodedToken.userId;
      Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
          if (sauce.userId !== userId){
            throw 'Invalid user ID';
          } else {
            next()
          }
      }).catch(
          error => res.status(401).json({error})
      )
      

    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };
  