import  nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';

export default (name, email) => {
const template = fs.readFileSync(__dirname + '/../views/mail.ejs', 'utf-8');
const compiledTemplate = ejs.compile(template, name);

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'docstashcare@gmail.com',
		pass: 'docstash123456'
	}
});

const mailOptions = {
	from: 'Docstash <docstashcare@gmail.com>',
	to: email,
	subject: 'Welcome to Docstash',
	// text: 'hi',
	html: compiledTemplate
};

transporter.sendMail(mailOptions, (err, info) => {
	if (err) {
		throw err;
	}
	// console.log('Message sent: ' + info.response);
});

}
