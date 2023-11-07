import User from "../../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config();
const rounds = 5;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!.]).{8,}$/;

export default async function signUpController(req, res) {
  try {
    if (!passwordRegExp.test(req.body.password)) {
      throw new Error("La contraseña no cumple los requisitos", {
        cause: "password",
      });
    }
    const newUserData = {
      ...req.body,
      roleID: 2,
      password: await bcrypt.hash(req.body.password, rounds),
    };
    const newUser = User.build(newUserData);
    await newUser.save();

    const jsonResponse = {
      success: true,
      data: {
        msg: "Usuario registrado exitosamente",
        user: newUser.get("email"),
      },
    };

    const confirmationLink = `${process.env.ORIGIN}/user/confirmation/${newUser.get('token')}`;
    var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: newUser.get("email"),
      subject: "Confirmación de correo electrónico",
      html: `<b>Por favor, haz clic en el <a href=${confirmationLink}>enlace de confirmación</a> para activar tu cuenta.</b>`,
    };

    const mail = await transport.sendMail(mailOptions)



    res.status(200).json(jsonResponse);
  } catch (error) {

    console.log(error)

    const jsonResponse = {
      success: false,
      data: {
        msg: error.message,
        cause: error.cause
          ? [error.cause]
          : error.errors.map((error) => error.path),
      },
    };

    res.status(400).json(jsonResponse);
  }
}
