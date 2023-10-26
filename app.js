const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require("nodemailer");

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
      sendEmail(name, email);
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



async function sendEmail(name, email) {
  try {
    // Create a transporter using your email service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "deshmukhaishwarya484@gmail.com",
        pass: "ufge sijo uvbh emjo",
      },
    });

    // Email configuration
    const mailOptions = {
      from: "mentaldivine.com",
      to: email,
      subject: "Contact request recived",
      text: "Thank " + name + " for connecting with us",
    };

    // Send the email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Email sending failed:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.error("Email setup error:", error);
  }
}


