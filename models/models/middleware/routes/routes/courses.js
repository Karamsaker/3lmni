const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// list courses
router.get('/', async (req, res) => {
  const courses = await Course.find().populate('instructor', 'name email');
  res.json(courses);
});

// get single
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name email');
  if (!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
});

// create (instructor)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'instructor' && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { title, description, lessons } = req.body;
  const course = await Course.create({ title, description, lessons, instructor: req.user.id });
  res.json(course);
});

module.exports = router;
