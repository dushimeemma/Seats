import express from 'express';
import Seat from '../controllers/seats';

const router = express.Router();
const seat = new Seat();

router.get('/', seat.getSeats);
router.post('/:id', seat.assignSeat);
router.patch('/:id', seat.updateSeat);
router.delete('/:id', seat.deleteSeat);

export default router;
