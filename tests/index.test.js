import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Application', () => {
  it('Should return Welcome To EXAM SEATS ARRANGEMENT SYSTEM', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
