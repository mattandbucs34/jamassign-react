'use strict';
const faker = require('faker');

let news = [];

for(let i = 0; i < 30; i++) {
  news.push({
    subject: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    userId: faker.random.number({ min: 25, max: 27}),
    createdAt: new Date(),
    updatedAt: new Date(),
    trash: false
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('News', news, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('News', null, {});
  }
};
