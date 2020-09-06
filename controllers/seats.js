import Seat from '../models/Seats';
import Student from '../models/Student';

class SeatController {
  async getSeats(req, res) {
    const seats = await Seat.find();
    res.status(200).json({
      status: 'ok',
      msg: 'Seats retrieved success',
      seats,
    });
  }
  async assignSeat(req, res) {
    const { reg, exam, room, seat } = req.body;
    const newSeat = new Seat({ reg, exam, room, seat });
    const student = await Student.findById(req.params.id);
    student.seat.push(newSeat);
    await student.save();
    await newSeat.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Assigned seat success',
      seat: newSeat,
    });
  }
  async updateSeat(req, res) {
    const { room, seat } = req.body;
    const seats = await Seat.findById(req.params.id);
    seats.seat = seat;
    seats.room = room;
    await seats.save();
    res.status(200).json({
      status: 'ok',
      msg: 'Seats updated success',
      seats,
    });
  }
  async deleteSeat(req, res) {
    const seats = await Seat.findById(req.params.id);
    await seats.remove();
    res.status(200).json({
      status: 'ok',
      msg: 'Seats deleted success',
    });
  }
}
export default SeatController;
