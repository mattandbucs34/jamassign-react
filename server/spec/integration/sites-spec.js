const request = require('request');
const server = require('../../../server');
const base = "http://localhost:5000/api/sites";
const sequelize = require('../../db/models/index').sequelize;
const Site = require('../../db/models').Site;
const User = require('../../db/models').User;

describe('routes : sites', () => {
  beforeEach(async (done) => {
    this.site;
    try {
      await sequelize.sync({ force: true });
      const site = await Site.create({
        name: 'Fake Site',
        address: '24 Fake Way',
        city: 'Somewhere',
        state: 'CA',
        zip: '12345'
      });
      this.site = site;
      done();
    }catch(err) {
      console.log("Error");
      done();
    }
  });

  describe('coordinator performing CRUD operations for Sites', () => {
    beforeEach(async (done) => {
      try{
        const user = await User.create({
          userEmail: 'powerman@marvel.com',
          password: '123',
          role: 'coordinator'
        });

        request.get({
          url: 'http://localhost:5000/auth/fake',
          form: {
            userId: user.id,
            userEmail: user.userEmail,
            role: user.role
          }
        // }, (err, res, body) => {
        //   done();
        });
        done();
      }catch(err) {
        console.log("Creation Error");
        done();
      }

      
    });

    describe('GET /sites/dashboard', () => {
      it('should return a status code 200', (done) => {
        request.get(`${base}/dashboard`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body).toContain('Fake Site');
          done();
        });
      });
    });

    describe('GET /sites/create', () => {
      it('should return a status code of 200', (done) => {
        request.get(`${base}/create`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body).toContain(302);
          done();
        });
      });
    });

    describe('POST /sites/create', () => {
      const values = {
        url: `${base}/create`,
        form: {
          siteName: 'Kentucky',
          address: '1 Wildcat Way',
          city: 'Lexington',
          state: 'KY',
          zip: '12345'
        }
      };
      it('should create a new Site', (done) => {
        request.post(values, async (err, res, body) => {
          try{
            const site = await Site.findOne({ where: {name: 'Kentucky'}});
            expect(body).toContain(303);
            expect(site.name).toBe('Kentucky');
            done();
          }catch(err){
            console.log(err.message);
            done();
          }
        });
      });
    });

    describe('GET /sites/:siteId/edit', () => {
      it('should return a status 200', (done) => {
        request.get(`${base}/${this.site.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain(200);
          done();
        });
      });
    });

    describe('POST /sites/:siteId/update', () => {
      it('should update the Site with the given values', (done) => {
        const values = {
          url:`${base}/${this.site.id}/update`,
          form: {
            name: 'Kentucky - John Cropp Stadium',
            zip: '40506'
          }
        };

        request.post(values, async (err, res, body) => {
          try{
            expect(err).toBeNull();
            const site = await Site.findOne({ where: {id: this.site.id }});
            expect(site.name).toBe('Kentucky - John Cropp Stadium')
            expect(site.zip).toBe('40506');
            done();
          }catch(err) {
            console.log(err.message);
            done();
          }
        });
      });
    });

    describe('POST /sites/:siteId/delete', () => {
      it('should delete the site with the associated ID', async (done) => {
        const sites = await Site.all();
        const sitesCount = sites.length;

        expect(sitesCount).toBe(1);

        request.post(`${base}/${this.site.id}/delete`, async (err, res, body) => {
          const sites = await Site.all();
          expect(err).toBeNull();
          expect(sites.length).toBe(sitesCount - 1);
          done();
        });
      });
    });
  });

  describe('member performing CRUD operations for Sites', () => {
    beforeEach((done) => {
      request.get({
        url: 'http://localhost:5000/auth/fake',
        form: {
          role: 'member'
        }
      });
      done();
    });

    describe('GET /sites/dashboard', () => {
      it('should return a status code 401 and a false auth', (done) => {
        request.get(`${base}/dashboard`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toContain(401);
          expect(res.body).toContain('"type":"danger"')
          done();
        });
      });
    });

    describe('POST /sites/create', () => {
      const options = {
        url: `${base}/create`,
        form: {
          siteName: 'Kentucky',
          address: '1 Wildcat Way',
          city: 'Lexington',
          state: 'KY',
          zip: '12345'
        }
      };
      it('should not create a new Site', (done) => {
        request.post(options, async (err, res, body) => {
          try{
            const site = await Site.findOne({ where: { name: 'Kentucky' }});
            expect(site).toBeNull();
            expect(body).toContain(401);
            done();
          }catch(err){
            console.log(err.message);
            done();
          }
        })
      })
    });

    describe('GET /sites/:siteId/edit', () => {
      it('should return a status of 401', (done) => {
        request.get(`${base}/${this.site.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(res.statusCode).toBe(401);
          done();
        });
      });
    });

    describe('POST /sites/:siteId/update', () => {
      it('should NOT update the site with given information', (done) => {
        request.post(`${base}/${this.site.id}/update`, 
          async (err, res, body) => {
            const site = await Site.findOne({ where: { id: this.site.id }});
            expect(site.name).toBe('Fake Site');
            done();
        })
      })
    })
  });
});