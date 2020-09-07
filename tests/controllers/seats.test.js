import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import Seat from '../../models/Seats';
import Student from '../../models/Student';

chai.use(chaiHttp);
chai.should();

describe('Seat', () => {
  beforeEach((done) => {
    Seat.deleteMany({}, (err) => {
      done(err);
    });
  });
  describe('Seats', () => {
    it('it should return all seats', (done) => {
      const newSeat = new Seat({
        reg: 'D/BCS/17/09/6177',
        exam: 'JavaScript',
        room: 'Muhabura',
        seat: '001',
      });
      newSeat.save();
      chai
        .request(app)
        .get('/api/seats')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should delete a seat', (done) => {
      const newSeat = new Seat({
        reg: 'D/BCS/17/09/6177',
        exam: 'JavaSCript',
        room: 'Muhabura',
        seat: '001',
      });
      newSeat.save();
      chai
        .request(app)
        .delete(`/api/seats/${newSeat._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should update seat', (done) => {
      const newSeat = new Seat({
        reg: 'D/BCS/17/09/6177',
        exam: 'JavaSCript',
        room: 'Muhabura',
        seat: '001',
      });
      newSeat.save((err, seats) => {
        const room = 'Muhabura';
        const seat = '001';
        seats.room = room;
        seats.seat = seat;
        chai
          .request(app)
          .patch(`/api/seats/${newSeat._id}`)
          .send({ room, seat })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
