import * as nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587, // Use port 587 for STARTTLS
    secure: false, // For port 587, secure should be false
    auth: {
        user: 'maddison53@ethereal.email', // Replace with valid Ethereal user
        pass: 'jn7jnAPss4f63QBp6D' // Replace with valid Ethereal password
    }
});

export const sendMail = async (options: Options): Promise<boolean> => {
    try {
        const info = await transporter.sendMail(options);

        console.log(`Email sent: ${info.messageId}`); // Log the message ID
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`); // Preview link for Ethereal
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
