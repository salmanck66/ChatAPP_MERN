import nodemailer from "nodemailer";

// Gmail with an App Password (Google Account → Security → App passwords)
export const isMailConfigured = Boolean(process.env.EMAIL && process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
