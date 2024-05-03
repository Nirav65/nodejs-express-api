const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})


//@desc Create a Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req,res) => {
    console.log("Request Body is: ", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }else{
        const contact = await Contact.create({
            name,
            email,
            phone,
        });
        res.status(201).json(contact);
    }
})

//@desc Get a Contact
//@route GET /api/contact/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found.");
    }
    res.status(200).json(contact);
})

//@desc Update a Contact
//@route PUT /api/contact/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found.");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact);
})

//@desc Delete a Contact
//@route Delete /api/contact/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found.");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
    
})

module.exports = { getAllContacts,createContact,getContact,updateContact,deleteContact };