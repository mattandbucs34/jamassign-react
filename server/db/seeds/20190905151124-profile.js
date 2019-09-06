'use strict';
const faker = require('faker');

let profiles = [];

for(let i = 1; i <= 26; i++) {
  profiles.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    mobile: faker.phone.phoneNumber(),
    userId: i,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profiles', profiles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
