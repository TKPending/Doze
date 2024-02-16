const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema({
    dashboard_background: {
        type: String,
        required: false
    },
    dashboard_title: {
        type: String,
        required: true,
    },
    dashboard_quote: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model("Header", headerSchema);