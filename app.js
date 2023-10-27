const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000; // You can change this to the desired port.
// const mongoURI =

// MongoDB connection setup
const mongoURI =
  "mongodb+srv://deshmukhaishwarya484:deshmukhaishwarya484@cluster0.c2qnvez.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection URI.

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// Middleware to parse JSON and url-encoded data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML files from the "yoga" directory
app.use(express.static(__dirname));

// Route for handling form submissions
app.post("/submit", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name);

  // Create a new contact record
  const newContact = new Contact({
    name,
    email,
    subject,
    message,
  });

  // Save the record to the database

  newContact
    .save()
    .then(() => {
      sendEmail(name, email);
      res.status(200).send("Contact information saved successfully.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving contact information.");
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
      subject: "Contact request received",
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Thank You for Connecting Mental Divine</title>
        <style>
            /* Reset some default styles */
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }

            /* Email content styles */
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }

            .header {
                background-color: #007BFF;
                color: #fff;
                padding: 20px;
                border-radius: 5px 5px 0 0;
            }

            .header h1 {
                font-size: 24px;
                margin: 0;
            }

            .email-content {
                padding: 20px;
            }

            .email-content p {
                font-size: 16px;
                margin: 5px 0;
            }

            .footer {
                background-color: #007BFF;
                color: #fff;
                padding: 10px;
                text-align: center;
                border-radius: 0 0 5px 5px;
            }
        </style>
    </head>
    <body>
    <div class="email-container">
        <div class="header">
            <h1>Thank You for Connecting Mental Divine</h1>
        </div>
        
        <div class="email-content">
         <p>"Dear" ${name},</p>           
            <p>We want to express our gratitude for reaching out to Mental Divine. Your mental well-being is important to us, and we are here to provide you with the support and guidance you need to manage stress and improve your mental health.</p>
            
            <p>At Mental Divine, we offer a wide range of resources and services to help you reduce stress and find solutions to your mental health concerns. You can explore:</p>
            
            <ul>
                <li>Yoga sessions and courses</li>
                <li>Stress reduction techniques</li>
                <li>Mental health articles and advice</li>
                <li>Community support</li>
            </ul>
            
            <p>We encourage you to visit our website regularly and take advantage of the valuable information and resources we provide. Your well-being is our top priority, and we are here to support you on your journey to better mental health.</p>
            
            <p>If you have any further questions or need assistance, please do not hesitate to contact us at [Your Contact Information].</p>
            
            <p>Thank you for choosing Mental Divine as your partner in mental health and well-being. We look forward to accompanying you on your path to a healthier, happier life.</p>
        </div>
    
        <div class="footer">
            <p>@mentaldivine</p>
            <p>123 Street, Manish Nagar ,Pune ,Maharashtra</p>
        </div>
    </div>
    </body>
    </html>
  `,
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
