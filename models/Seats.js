import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  reg: { type: String, required: true },
  exam: { type: String, required: true },
  room: { type: String, required: true },
  seat: { type: String, required: true },
});

const Seat = mongoose.model('Seat', SeatSchema);
export default Seat;
