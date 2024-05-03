const asyncHandler = require("express-async-handler");

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getAllContacts = asyncHandler((req, res) => {
    res.status(200).json({ message: "Get All Contacts" });
})


//@desc Create a Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler((req,res) => {
    console.log("Request Body is: ", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }else{
        res.status(200).json({ message: "Create a Contact" });
    }
})

//@desc Get a Contact
//@route GET /api/contact/:id
//@access public
const getContact = asyncHandler((req, res) => {
    res.status(200).json({ message: `Get a Contact ${req.params.id} ` });
})

//@desc Update a Contact
//@route PUT /api/contact/:id
//@access public
const updateContact = asyncHandler((req, res) => {
    res.status(200).json({ message: `Update a Contact ${req.params.id} ` });
})

//@desc Delete a Contact
//@route Delete /api/contact/:id
//@access public
const deleteContact = asyncHandler((req, res) => {
    res.status(200).json({ message: `Delete a Contact ${req.params.id} ` });
})

module.exports = { getAllContacts,createContact,getContact,updateContact,deleteContact };