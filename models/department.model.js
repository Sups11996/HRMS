import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
   managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Department = mongoose.model('Department', DepartmentSchema);
