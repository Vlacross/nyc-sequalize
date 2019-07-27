const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const should = chai.should();

const app = require('../app');

const { Restaurant, Grade } = require('../models');

chai.use(chaiHttp);


function seedRestaurantData(seedNum=10) {
  const restaurants = [];
  for (let i = 1; i <=seedNum; i++) {
    restaurants.push(generateRestaurantData());
  }
  return Promise.all(restaurants)
}

function generateBoroughName() {
  const boroughs = [ 'Manhattan', 'Queens', 'Brooklyn', 'Bronx', 'Staten Island' ];
  return boroughs[Math.floor(Math.random() * boroughs.length)]
};

function generateGrades() {
  const grades = [ 'A', 'B', 'C', 'D', 'F' ];
  const date = faker.date.recent();
  const grade = grades[Math.floor(Math.random() * grades.length)];
  return {
    inspectionDate: faker.date.past(),
    grade: grade,
    createdAt: date,
    updatedAt: date
  };
};

function generateCuisineType() {
  const cuisines = [ 'Italian', 'Thai', 'Columbian' ];
  return cuisines[Math.floor(Math.random() * cuisines.length)];
};

function generateRestaurantData() {
  const date = faker.date.recent();
  return Restaurant.create({
    name: faker.company.companyName(),
    borough: generateBoroughName(),
    cuisine: generateCuisineType(),
    addressBuildingNumber: faker.address.streetAddress(),
    addressStreet: faker.address.streetName(),
    addressZipcode: faker.address.zipCode(),
    createdAt: date,
    updatedAt: date,
    grades: generateGrades(3)
  }, {
    include: [{
      model: Grade,
      as: 'grades'
    }]
  });
};

bet = generateRestaurantData()

// console.log(bet)

describe('Restaurants API resource', function() {

  beforeEach(function() {
    return Restaurant
    .truncate({ cascade: true })
    .then(() => seedRestaurantData());
  });

  describe('GET endpoint', function() {

    it.only('should return all existing restaurants', function() {

      let res;

      return chai.request(app)
      .get('/restaurants')
      .then(function(_res) {
        res = _res;
        console.log('1131')
        console.log('1131', res.body.restaurants[2])
        res.should.have.status(200);

        res.body.restaurants.should.have.lengthOf.above(1);
        return Restaurant.count();
      })
      .then(function(count) {
        res.body.restaurants.should.have.lengthOf(count);
      })
    })

    it('should return up to 15 existing grades for given restaurant id', function() {

      let res;

      return chai.request(app)
      .get('/restaurants/grades/')
    })






  });











})

