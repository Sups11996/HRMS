import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    contactNumber: String,
    address: String,
    hireDate: Date,
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    position: String,
    salary: Number,
    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract'],
    },
    leaveBalance: {
        annual: Number,
        sick: Number,
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

export const Employee = mongoose.model('Employee', EmployeeSchema);
