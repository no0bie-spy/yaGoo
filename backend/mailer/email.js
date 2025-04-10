// forgot-pw.js
import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

// SMTP transport setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Function to send the recovery email
export async function sendRecoveryEmail(userEmail) {
    const token = (100000 + parseInt(Math.random() * 1000000)).toString();

    // Send mail with the defined transport object
    const info = await transporter.sendMail({
        from: '"Test User" <node-class@padxu.com>',
        to: userEmail, // Send to the user's email
        subject: "Password Recovery - Verify Your Email",
        text: "Hello, use the token to verify your email.",
        html: `<p>Dear User, <br /> Use this token to verify your email: 
        <b style='font-size: 20px;'>${token}</b>
        <br />
        Do not share this email with anyone.</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    return{token, info};
}
