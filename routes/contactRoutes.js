const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Get All Contacts" });
});

router.route("/").post((req, res) => {
    res.status(200).json({ message: "Create a Contact" });
});

router.route("/:id").get((req, res) => {
    res.status(200).json({ message: `Get a Contact ${req.params.id} ` });
});

router.route("/:id").put((req, res) => {
    res.status(200).json({ message: `Update a Contact ${req.params.id} ` });
});

router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `Delete a Contact ${req.params.id} ` });
});

module.exports = router;