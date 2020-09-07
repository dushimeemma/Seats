import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import Student from '../../models/Student';

chai.use(chaiHttp);
chai.should();

describe('Student', () => {
  beforeEach((done) => {
    Student.deleteMany({}, (err) => {
      done(err);
    });
  });
  describe('Create Student', () => {
    it('should create a student', (done) => {
      const newStudent = new Student({
        name: 'Dushime Emmanuel',
        reg: 'D/BCS/17/09/6177',
        level: '3',
        dept: 'BCS',
      });
      chai
        .request(app)
        .post('/api/students')
        .send(newStudent)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it('it should get student given registration number', (done) => {
      const newStudent = new Student({
        name: 'Dushime Emmanuel',
        reg: 'D/BCS/17/09/6177',
        level: '3',
        dept: 'BCS',
        atd: 'not',
        fnc: 'not',
      });
      newStudent.save((err, student) => {
        const reg = student.reg;
        const cStudent = Student.find({ reg });
        if (cStudent) {
          chai
            .request(app)
            .get('/api/students/seat')
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
              done();
            });
        }
      });
    });
    it('it should get all students', (done) => {
      const newStudent = new Student(
        {
          name: 'Dushime Emmanuel',
          reg: 'D/BCS/17/09/6177',
          level: '3',
          dept: 'BCS',
        },
        {
          name: 'Dushime Emmanuel 1',
          reg: 'D/BCS/17/09/6178',
          level: '3',
          dept: 'BCS',
        }
      );
      newStudent.save((err, students) => {
        chai
          .request(app)
          .get('/api/students')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
    it('it should update student attendance', (done) => {
      const newStudent = new Student({
        name: 'Dushime Emmanuel',
        reg: 'D/BCS/17/09/6177',
        level: '3',
        dept: 'BCS',
        atd: 'not',
        fnc: 'not',
      });
      newStudent.save();
      chai
        .request(app)
        .patch(`/api/students/attendance/${newStudent._id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it('it should update student finance', (done) => {
      const newStudent = new Student({
        name: 'Dushime Emmanuel',
        reg: 'D/BCS/17/09/6177',
        level: '3',
        dept: 'BCS',
        atd: 'not',
        fnc: 'not',
      });
      newStudent.save();
      chai
        .request(app)
        .patch(`/api/students/finance/${newStudent._id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it('it should update student attendance', (done) => {
      const newStudent = new Student({
        name: 'Dushime Emmanuel',
        reg: 'D/BCS/17/09/6177',
        level: '3',
        dept: 'BCS',
        atd: 'not',
        fnc: 'not',
      });
      newStudent.save();
      chai
        .request(app)
        .delete(`/api/students/${newStudent._id}`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});
