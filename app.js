import express from "express";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: req.body.from,
            pass: req.body.password,
        },
    });

    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.title,
        text: req.body.content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o e-mail: ' + error);
        } else {
            res.send("Email Enviado Com Sucesso");
        }
    });

});

app.listen(PORT, () => console.log("SERVIÇO RODANDO NA PORTA " + PORT));
