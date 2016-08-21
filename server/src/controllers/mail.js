import  nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';

export default (name, email) => {
const template = fs.readFileSync(__dirname + '/../views/mail.html', 'utf-8');
const compiledTemplate = ejs.render(template);

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'docstashcare@gmail.com',
		pass: 'docstash123456'
	}
});

const mailOptions = {
	from: 'Docstash <docstashcare@gmail.com>',
	to: 'shetty.raxx555@gmail.com',
	subject: 'Welcome to Docstash',
	html: compiledTemplate
};
transporter.sendMail(mailOptions, (err, info) => {
	if (err) {
		console.log(err);
	}
	console.log('Message sent: ' + info.response);
});

}
