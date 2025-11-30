const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String // لاحقًا يمكن استبداله بمرجع فيديو/ملف
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [lessonSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
