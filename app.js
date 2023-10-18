const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Port_number = 2004;
mongoose.connect('mongodb://127.0.0.1:27017/Itemdb', { useNewUrlParser: true, useUnifiedTopology: true });
// Connect to your MongoDB database
//mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose model for your data
const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  subject: String,
  message: String,
});

// Middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML and static files
app.use(express.static('public')); // Assuming your HTML file is in a "public" directory

// Handle form submission
app.post('/submit', (req, res) => {
  // Create a new Contact document from the form data
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });

  // Save the data to the database
  contact.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving the data.');
    } else {
      res.send('Data saved successfully!');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
