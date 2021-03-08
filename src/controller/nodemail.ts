var nodemailer = require('nodemailer');
 
module.exports = (nome: string, email: string, assunto: string, mensagem: string) => {

    const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'samukdias97@gmail.com',
            pass: 'samuk1415'
        }
    })
    
    const mail = {
        from: email,
        to: 'samukdias97@gmail.com',
        subject: `Nome: ${nome} - Email: ${email} - Assunto: ${assunto}`,
        text: mensagem,
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