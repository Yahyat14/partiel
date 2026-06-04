const Workshop = require('../models/Workshop');

// Get all workshops
exports.getAllWorkshops = async (req, res) => {
  try {
    const { category, level, page = 1, limit = 10 } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }

    const skip = (page - 1) * limit;
    const workshops = await Workshop.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ date: 1 });

    const total = await Workshop.countDocuments(query);

    res.json({
      workshops,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get workshop by ID
exports.getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id)
      .populate('registrations', 'firstName lastName email');

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json(workshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create workshop (admin only)
exports.createWorkshop = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      category,
      instructor,
      date,
      time,
      duration,
      capacity,
      price,
      level,
      materials,
      maxParticipants
    } = req.body;

    if (!title || !description || !date || !capacity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workshop = new Workshop({
      title,
      description,
      image,
      category,
      instructor,
      date,
      time,
      duration,
      capacity,
      registrations: [],
      price,
      level,
      materials,
      maxParticipants: maxParticipants || capacity
    });

    await workshop.save();
    res.status(201).json({ message: 'Workshop created', workshop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update workshop (admin only)
exports.updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json({ message: 'Workshop updated', workshop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete workshop (admin only)
exports.deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json({ message: 'Workshop deleted', workshop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register user for workshop
exports.registerWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    if (workshop.registrations.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already registered for this workshop' });
    }

    if (workshop.registrations.length >= workshop.maxParticipants) {
      return res.status(400).json({ error: 'Workshop is full' });
    }

    workshop.registrations.push(req.user.id);
    await workshop.save();

    res.json({ message: 'Registered for workshop', workshop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unregister from workshop
exports.unregisterWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    workshop.registrations = workshop.registrations.filter(
      id => id.toString() !== req.user.id
    );

    await workshop.save();

    res.json({ message: 'Unregistered from workshop', workshop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
