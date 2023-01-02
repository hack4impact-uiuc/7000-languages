const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: ,
            pass: 
        }
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('../templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('../templates/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions));


var mailOptions = {
    from: '"Adebola" <adebola.rb.js@gmail.com>', // sender address
    to: 'adebola.rb.js@gmail.com', // list of receivers
    subject: 'Welcome!',
    template: 'email', // the name of the template file i.e email.handlebars
    context: {
        name: "Adebola", // replace {{name}} with Adebola
        company: 'My Company' // replace {{company}} with My Company
    }
};



// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});