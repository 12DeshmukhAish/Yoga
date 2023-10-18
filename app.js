const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // You can change this to the desired port.
const mongoURI = 'mongodb+srv://maneprathamesh019:maneprathamesh019@cluster0.6tn2owo.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'; // Replace with your MongoDB connection URI.

// MongoDB connection setup
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// Middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML files from the "yoga" directory
app.use(express.static(__dirname));

// Route for handling form submissions
app.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name);

  // Create a new contact record
  const newContact = new Contact({
    name,
    email,
    subject,
    message
  });

  // Save the record to the database
  newContact.save()
  .then(() => {
    res.status(200).send('Contact information saved successfully.');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error saving contact information.');
  });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
