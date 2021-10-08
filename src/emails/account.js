const sgMail = require('@sendgrid/mail')
//------------------------------------------------------
const sender = 'whentheashesaretwo@outlook.com'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: sender,
        subject: 'WELCOME TO DA APP',
        text:`Welcome to the dunes, stranger - or should I say, ${name}. I hope you like your stay.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: sender,
        subject: 'FAREWELL STRANGER',
        text: `It was good knowin' ya while we did. I'm glad ya found yer way out of these dunes. Come back and visit sometime, ${name}.`
    })
}


module.exports= {
    sendWelcomeEmail,
    sendCancelEmail
}