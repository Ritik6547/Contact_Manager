const asyncHandler = require('express-async-handler');
const Contact = require('../models/contact');


// route - GET /api/contacts
// @access - private
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json({ contacts });
})

// route - GET /api/contacts/:id
// @access - private
const getSingleContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contacts = await Contact.findById(id);
    if (!contacts) {
        res.status(404);
        throw new Error(`contact not found by id : ${id}`);
    }
    if (contacts.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user is not authorized to update")
    }
    res.status(200).json({ contacts });
})

// route - POST /api/contacts
// @access - private
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contacts = await Contact.create({ name, email, phone, user_id: req.user.id });
    res.status(201).json({ contacts });
})

// route - PUT /api/contacts/:id
// @access - private
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contacts = await Contact.findById(id);
    if (!contacts) {
        res.status(400);
        throw new Error("contact not found");
    }
    if (contacts.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user is not authorized to update")
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(200).json({ updatedContact });
})

// route - DELETE /api/contacts/:id
// @access - private
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contacts = await Contact.findById(id);
    if (!contacts) {
        res.status(400);
        throw new Error("contact not found")
    }
    if (contacts.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User is not authorized to delete")
    }
    const deletedContact = await Contact.findByIdAndDelete(id);
    res.status(200).json({ deletedContact, msg: "deleted" });
})

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact }