import express from "express";
import cors from "cors";
import { createTransport } from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: req.body.email,
      pass: req.body.password,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: req.body.to,
    subject: req.body.title,
    text: `${req.body.content}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erro ao enviar o e-mail: " + error);
      res.status(400).send(error);
    } else {
      res.send({
        message: "Email Enviado com suscesso",
        data: mailOptions,
      });
    }
  });
});

app.listen(PORT, () => console.log("SERVIDOR RODANDO NA PORTA " + PORT));
