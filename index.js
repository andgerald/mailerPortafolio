const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require('dotenv').config();
const SERVER_PORT  = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

const  transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: process.env.EMAIL,
 pass: process.env.EMAIL_PASSWORD,
 },
})

app.post("/enviar", async ( req, res) => {
    const { email,subject,message} = req.body;
    try{
        const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    replyTo: email,
    subject: subject,
    text: message,
    };
    await transporter.sendMail(mailOptions)
    
    res.send('correo enviado con exito')
    }catch(e){
        console.log('error',e);
        res.status(500).send('Error  al enviar el correo')
    }
})


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port http://localhost:${SERVER_PORT}`);
});