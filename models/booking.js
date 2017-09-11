// DEPENDENCIES
var mongoose = require("mongoose");

// SCHEMA SETUP
var bookingSchema = new mongoose.Schema({
    campName: String,
    price: Number,
    firstName: String,
    lastName: String,
    email: String,
    people: Number,
    startDate: String,
    endDate: String,
    days: Number,
    total: Number,
    customer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// EXPORTS
module.exports = mongoose.model("Booking", bookingSchema);