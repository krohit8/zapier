import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: process.env.SMTP_endpoint,
    port:587,
    secure: false,
    auth:{
        user: process.env.SMTP_username,
        pass: process.env.SMTP_password,
    },

})
export async function sendEmail(to: string, body: string){
    await transport.sendMail({
        from:" rohit@gmail.com",
        sender:" rohit@gmail.com",
        to,
        subject:"Hello from Zapier",
        text: body
    })
}