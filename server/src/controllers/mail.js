/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';
import secret from '../config/secret';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'docstashcare@gmail.com',
        pass: secret.emailPass
    }
});
const transpoter = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log('Message sent: ' + info.response);
    });
}

export const newUserEmail = (name, email) => {
    const template = fs.readFileSync(__dirname + '/../views/mailNewUser.html', 'utf-8');
    const compiledTemplate = ejs.render(template, {name: name});
    const mailOptions = {
        from: 'Docstash <docstashcare@gmail.com>',
        to: email,
        subject: 'Welcome to Docstash',
        html: compiledTemplate
    };
    transpoter(mailOptions);
}
export const resetPasswordEmail = (name, email, password) => {
    const template = fs.readFileSync(__dirname + '/../views/mailResetPass.html', 'utf-8');
    const compiledTemplate = ejs.render(template, {
        name: name,
        password: password
    });
    const mailOptions = {
        from: 'Docstash <docstashcare@gmail.com>',
        to: email,
        subject: 'Reset Password',
        html: compiledTemplate
    };
    transpoter(mailOptions);
}
