const sequelize = require('../../db/models/index').sequelize;
const Site = require('../../db/models').Site;
const User = require('../../db/models').User;

describe('Site', () => {
  beforeEach(async (done) => {
  //   this.site;
  //   this.user;

    await sequelize.sync({force: true})
  //   const user = await User.create({
  //     userEmail: 'velma@mysterymachine.com',
  //     password: '1234',
  //     role: 'coordinator'
  //   });

  //   const site = await Site.create({
  //     name: 'Kentucky',
  //     address: '1 Wildcat Way',
  //     city: 'Lexington',
  //     state: 'KY',
  //     zip: '12345'
  //   })
    done();
  });

  describe('#create', () => {
    it('should create a new site with the given information', async(done) => {
      try{
        const site = await Site.create({
          name: 'Kentucky',
          address: '1 Wildcat Way',
          city: 'Lexington',
          state: 'KY',
          zip: '12345'
        });

        expect(site.name).toBe('Kentucky');
        expect(site.city).toBe('Lexington');
        done();
      }catch(err) {
        console.log("Error");
        done();
      }
    });
  });
})
