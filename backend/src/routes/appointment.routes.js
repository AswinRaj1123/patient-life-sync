const express = require('express');
const router = express.Router();
const { 
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth');

// Routes
router.route('/')
  .get(protect, getAllAppointments)
  .post(protect, createAppointment);

router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

module.exports = router;
