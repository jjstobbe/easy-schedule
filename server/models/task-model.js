import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId: String, // User associated with the task
    calendarId: String, // Calendar that the task will be scheduled to

    name: String, // Title or message that describes the task
    description: String, // Describes task in more detail
    isCompleted: Boolean, // Whether or not task is complete. i.e. should be still scheduled
    timeEstimateInMinutes: Number, // Time estimate, to help schedule appropriate block of time. Decided on minutes since seconds might be too high fidelity for no real reason
});

const Task = mongoose.model('task', taskSchema);

export default Task;
