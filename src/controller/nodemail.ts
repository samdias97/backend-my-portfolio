import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

module.exports = async (nome: string, email: string, assunto: string, mensagem: string) => {
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        },
    })
    
    const usuario = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem,
    }
    const path1 = path.resolve("src/controller", "contact.hbs")
    const templateFileContent = await fs.promises.readFile(path1, {
        encoding: 'utf-8'
    })
    const parseTemplate = handlebars.compile(templateFileContent);
    const html = parseTemplate(usuario);

    const mail = {
        from: {
            name: nome,
            address: email,
        },
        to: process.env.MY_EMAIL,
        subject: `${assunto} - My Portfolio`,
        text: mensagem,
        html: html,
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then((response: Response) => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch((error: Error) => {
                smtpTransport.close();
                return reject(error);
            });
    })
}