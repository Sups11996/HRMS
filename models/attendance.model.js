import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkIn: Date,
  checkOut: Date,
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Attendance = mongoose.model('Attendance', AttendanceSchema);
