var hbs = require('handlebars');
var handlebars = require('handlebars');
var fs = require('fs');
const path = require('path'); 
//var fooJson = require('path/to/foo.json');
var nodemailer = require('nodemailer');

module.exports = async (nome: string, email: string, assunto: string, mensagem: string) => {
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'samukdias97@gmail.com',
            pass: 'samuk1415'
        },
    })
    
    var usuario = {
        remetente: `${nome} <${email}>`,
        destinatario: `Samuel de Sousa Dias <samukdias97@gmail.com>`,
        assunto: assunto,
        mensagem: mensagem,
    }
    const path1 = path.resolve("src/controller", "contact.hbs")
    const templateFileContent = await fs.promises.readFile(path1, {
        encoding: 'utf-8'
    })
    var parseTemplate = handlebars.compile(templateFileContent);

    var html = parseTemplate(usuario);

    const mail = {
        from: {
            name: `${nome} - ${email}`,
            address: email,
        },
        to: 'samukdias97@gmail.com',
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