const mongoose = require('mongoose');

// Define the blog schema
const blogSchema = new mongoose.Schema({
    author: { type: String, required: true },    // Blog author
    title: { type: String, required: true },     // Blog title
    category: { type: String, required: true },  // Blog category
    content: { type: String, required: true },   // Blog content
    message:{type: String, required: true}                  // Embedded comments array
}, { timestamps: true });

// Ensure models are not overwritten
mongoose.models = {};

// Export the blog model
export default mongoose.model("blogs", blogSchema);
