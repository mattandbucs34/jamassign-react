'use strict';
const faker = require('faker');

let profiles = [];

for(let i = 0; i <= 25; i++) {
  profiles.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    mobile: faker.phone.phoneNumberFormat(),
    userId: i,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Profiles", "Profiles_userId_fkey", {}).then(() => {
      return queryInterface.bulkInsert('Profiles', profiles, {});
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
