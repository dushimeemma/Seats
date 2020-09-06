import Student from '../models/Student';
import Seat from '../models/Seats';

class StudentController {
  async getStudent(req, res) {
    const students = await Student.find().populate('Seat');
    res.status(200).json({
      status: 'ok',
      msg: 'Retrieved students success',
      students,
    });
  }
  async getSingleSeat(req, res) {
    const reg = req.body.reg;
    const student = await Student.find({ reg });
    res.status(200).json({
      status: 'ok',
      msg: 'Seat retrieved success',
      student,
    });
  }
  async createStudent(req, res) {
    const { name, reg, level, dept } = req.body;
    const student = {
      name,
      reg,
      level,
      dept,
      atd: 'not',
      fnc: 'not',
    };
    const newStudent = new Student(student);
    await newStudent.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Student registered success',
      student: newStudent,
    });
  }
  async updateAtd(req, res) {
    const student = await Student.findById(req.params.id);
    student.atd = 'yes';
    await student.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Marked as attended success',
      student,
    });
  }
  async updateFnc(req, res) {
    const student = await Student.findById(req.params.id);
    student.fnc = 'yes';
    await student.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Marked as paid success',
      student,
    });
  }
  async deleteStudent(req, res) {
    const student = await Student.findById(req.params.id);
    await student.remove();
    res.status(200).json({
      status: 'ok',
      msg: 'Student deleted success',
    });
  }
}
export default StudentController;
