import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.post("/", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.password,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.to,
        subject: req.body.title,
        text: req.body.content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o e-mail: ' + error);
        } else {
            res.send({
                message: "Email Enviado com suscesso",
                data: mailOptions.text
            });
        }
    });

});

app.listen(PORT, () => console.log("SERVIÇO RODANDO NA PORTA " + PORT));