const mailer = require('nodemailer');
const prompt = require('prompt');

prompt.start();

prompt.get({
    properties: {
        from: {
            required: true
        },
        to: {
            required: true
        },
        password: {
            hidden: true,
            required: true
        }
    }
}, (error, result) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    
    const server = mailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true,
        logger: true,
        auth: {
            user: result.from,
            pass: result.password
        }
    });
    
    server.sendMail({
        from: result.from,
        to: result.to,
        subject: 'It Works',
        html: 'Hello World'
    }).catch(error => {
        console.error(`Error: ${error}`);
    });
});