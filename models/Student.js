import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  reg: { type: String, required: true },
  level: { type: String, required: true },
  dept: { type: String, required: true },
  atd: { type: String, required: true },
  fnc: { type: String, required: true },
  seat: [{ type: Schema.Types.ObjectId, ref: 'Seats' }],
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;
