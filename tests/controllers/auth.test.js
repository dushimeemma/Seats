import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

chai.use(chaiHttp);
chai.should();

describe('Auth User', () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done(err);
    });
  });

  describe('Create User', () => {
    it('it should not create user without name', (done) => {
      const newUser = new User({
        email: 'dushimeemma@gmail.com',
        password: 'ever',
      });
      chai
        .request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
    it('it should not create a user with an existing email', (done) => {
      const newUser = new User({
        name: 'Dushime Emmanuel',
        email: 'dushimeemma@gmail.com',
        password: 'ever',
      });
      newUser.save((err, user) => {
        if (err) {
          done(err);
        }
        let email = user.email;
        let cUser = User.findOne({ email });
        if (cUser) {
          chai
            .request(app)
            .post('/api/auth/signup')
            .send(newUser)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(400);
              done();
            });
        }
      });
    });
    it('it should create user', (done) => {
      const newUser = new User({
        name: 'Dushime Emmanuel',
        email: 'dushimeemma@gmail.com',
        password: 'ever',
      });
      chai
        .request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it('it should not login without password', (done) => {
      const newUser = new User({
        email: 'dushimeemma@gmail.com',
      });
      chai
        .request(app)
        .post('/api/auth/login')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
    it('it should not login a user with unexisted email', (done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'ever',
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(400);
          done();
        });
    });
    it('it should not login a user with invalid password', (done) => {
      const newUser = new User({
        name: 'dushimeemma@gmail.com',
        email: 'dushimeemma@gmail.com',
        password: 'ever',
      });
      newUser.save((err, user) => {
        const cUser = {
          email: 'dushimeemma@gmail.com',
          password: 'ever1',
        };
        if (user.password != cUser.password) {
          chai
            .request(app)
            .post('/api/auth/login')
            .send(cUser)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(400);
              done();
            });
        }
      });
    });
  });
});
