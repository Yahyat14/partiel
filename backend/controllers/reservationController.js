const Reservation = require('../models/Reservation');
const Workshop = require('../models/Workshop');

// Generate reservation number
const generateReservationNumber = () => {
  return `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Get all reservations (admin) or user's reservations (client)
exports.getReservations = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'client') {
      query.userId = req.user.id;
    }

    const reservations = await Reservation.find(query)
      .populate('userId', 'firstName lastName email')
      .populate('workshopId', 'title date time price')
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('workshopId', 'title date time price capacity');

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    if (req.user.role === 'client' && reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const { workshopId, quantity, participants } = req.body;

    if (!workshopId || !quantity) {
      return res.status(400).json({ error: 'Workshop ID and quantity are required' });
    }

    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    if (workshop.registrations.length + quantity > workshop.maxParticipants) {
      return res.status(400).json({ error: 'Not enough available spots' });
    }

    const reservation = new Reservation({
      reservationNumber: generateReservationNumber(),
      userId: req.user.id,
      workshopId,
      quantity,
      price: workshop.price * quantity,
      participants,
      status: 'confirmed'
    });

    await reservation.save();

    // Add users to workshop registrations
    for (let i = 0; i < quantity; i++) {
      if (!workshop.registrations.includes(req.user.id)) {
        workshop.registrations.push(req.user.id);
      }
    }
    await workshop.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update reservation
exports.updateReservation = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ message: 'Reservation updated', reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel reservation
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    if (req.user.role === 'client' && reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json({ message: 'Reservation cancelled', reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
