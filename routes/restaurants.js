const express = require('express');
const router = express.Router();

const { Restaurant, Grade } = require('../models');

router.get('/', (req, res) => {
  Restaurant.findAll(
    {
      limit: 15,
      include: [{
        model: Grade,
        as: 'grades'
      }]
    }
  )
  .then(restaurants => {
    res.json({
    restaurants: restaurants.map(rest => rest.apiRepr())
  })})
});

router.get('/grades/:id', (req, res) => {
  Grade.findAll(
    {
      limit: 15,
      where: {
        restaurant_id: req.params.id
      }
    }
  )
  .then(grades => {
    console.log(grades.length)
    res.json(grades)
  })
})


router.get('/:id', (req, res) => {
  Restaurant.findAll({
    limit: 1,
    where: {
      id: req.params.id
    }
  }, {
    include: [{
      model: Grade,
      as: 'grades'
    }]
  })
  .then(restaurant => res.json(restaurant[0].apiRepr()))
});


router.post('/', (req, res) => {
  const requiredFields = ['name', 'borough', 'cuisine'];

  for (let i =0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body!`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  return Restaurant.create({
    name: req.body.name,
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    addressBuildingNumber: req.body.addressBuildingNumber,
    addressStreet: req.body.addressStreet,
    addressZipcode: req.body.addressZipcode
  })
  .then(restaurant => res.status(201).json(restaurant.apiRepr()))
  .catch(err => res.status(500).send({ message: err.message }));
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id.toString())) {
    const message = {
      message: `Request path id ${req.params.id} and request body id ${req.body.id} must match!`
    }
    console.error(message);
    res.status(400).json(message)
  }

  const toUpdate = {};
  const updateableFields = ['name', 'borough', 'cuisine', 'addressBuildingNumber', 'addressStreet', 'addressZipcode'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field]
    }
  });

  return Restaurant.update(toUpdate, {
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204).end())
  .catch(err => res.status(500).json({ message: `Internal server error!!` }));
});

router.delete('/:id', (req, res) => {
  return Restaurant
  .destroy({
    where: {
      id: req.params.id
    }
  })
  .then(restaurant => res.status(204).end())
  .catch(err => res.status(500).json({ message: `Internal Soiver Errors!` }));
});

router.get('/:id/grades', (req, res) => {
  return Restaurant
  .findById(req.params.id, {
    include: [{
      model: Grade,
      as: 'grades'
    }]
  })
  .then(restaurant => res.json({
    grades: restaurant.grades.map(grade => grade.apiRepr())
  }));
});


module.exports = router;
