import express from 'express';
import Student from '../controllers/student';

const student = new Student();
const router = express.Router();

router.get('/', student.getStudent);
router.get('/seat', student.getSingleSeat);
router.post('/', student.createStudent);
router.delete('/:id', student.deleteStudent);
router.patch('/attendance/:id', student.updateAtd);
router.patch('/finance/:id', student.updateFnc);

export default router;
