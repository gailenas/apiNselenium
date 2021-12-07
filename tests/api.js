const { expect, assert } = require('chai');
var chai = require('chai'),
  chaiHttp = require('chai-http');
const url = 'http://www.google.com';

chai.use(chaiHttp);

describe('Google API testing', async () => {
  describe('GET method', async () => {
    it('Should return status of 200', async () => {
      chai
        .request(url)
        .get('/search')
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(200);
          } else {
            throw err;
          }
        });
    });

    it('Document type must be: text/html', async () => {
      chai
        .request(url)
        .get('/search')
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.header(
              'Content-Type',
              'text/html; charset=ISO-8859-1'
            );
          } else {
            throw err;
          }
        });
    });

    it('Should build correct URL', async () => {
      chai
        .request(url)
        .get('/search')
        .query({ q: 'test' })
        .end((err, res) => {
          if (!err) {
            expect(res.request.url).to.be.equal(
              'http://www.google.com/search?q=test'
            );
          } else {
            throw err;
          }
        });
    });

    it('Document charset must be: UTF-8', async () => {
      chai
        .request(url)
        .post('/search')
        .query({ q: 'test' })
        .end((err, res) => {
          if (!err) {
            expect(res.charset).to.be.equal('UTF-8');
          } else {
            throw err;
          }
        });
    });
  });

  describe('POST method', async () => {
    it('Confirm that POST method not allowed', () => {
      chai
        .request(url)
        .post('/search?q=test')
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(405);
          } else {
            throw err;
          }
        });
    });
  });
});
