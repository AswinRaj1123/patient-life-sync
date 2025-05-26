const express = require('express');
const router = express.Router();
const { 
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor
} = require('../controllers/doctor.controller');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(getAllDoctors)
  .post(protect, createDoctor);

router.route('/:id')
  .get(getDoctorById)
  .put(protect, updateDoctor);

module.exports = router;
