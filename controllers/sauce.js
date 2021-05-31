const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  console.log('test')  
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));

};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  console.log('ff')
  Sauce.findOne({_id: req.params.id})
  .then(masauce => {
    console.log(masauce)
    switch(req.body.like){
      case 1:
        Sauce.updateOne({_id: req.params.id},{$inc:{likes : 1}, $push:{usersLiked :req.body.userId}})
        .then(() => res.status(200).json({ message : 'sauce likée'}))
        .catch( error => res.status(400).json({ error}));
        break;
        case -1:
          Sauce.updateOne({_id: req.params.id},{$inc:{dislikes : 1}, $push:{usersDisliked :req.body.userId}})
        .then(() => res.status(200).json({ message : 'sauce dislikée'}))
        .catch( error => res.status(400).json({ error}));
        break;
        case 0:
          let field = masauce.usersLiked.includes(req.body.userId) ? "likes": "dislikes"
          let data = {};
          data[field] = -1
          Sauce.updateOne({_id: req.params.id},{$inc:data, $pull :{usersDisliked :req.body.userId , usersLiked :req.body.userId }})
        .then(() => res.status(200).json({ message : 'action annulée'}))
        .catch( error => res.status(400).json({ error}));
        break;

    }
  })
}