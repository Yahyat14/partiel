const Contact = require('../models/Contact');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      status: 'new'
    });

    await contact.save();

    res.status(201).json({
      message: 'Contact message sent successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contact messages (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const contacts = await Contact.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
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

// Get contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reply to contact (admin only)
exports.replyContact = async (req, res) => {
  try {
    const { response } = req.body;

    if (!response) {
      return res.status(400).json({ error: 'Response is required' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        response,
        status: 'replied',
        respondedAt: Date.now(),
        respondedBy: req.user.id
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json({ message: 'Reply sent', contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete contact (admin only)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
