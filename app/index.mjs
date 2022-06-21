
import {} from 'dotenv/config';
import path from "path";
import express from 'express';
// import routerView from './router/index.mjs'
import router from './router.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';



const __dirname = path.resolve();

const app = express();
app.use(cors('*'));

// app.set("view engine", 'ejs');
// app.set('views', "./app/views")


// app.use(
//     '/public/css',
//     express.static(__dirname + '/public/css')
// );
app.use(bodyParser.json());

app.use(express.urlencoded());
app.use(cookieParser());

app.post("send_mail", async(req, res) => {
    let {text} = req.body;

    const transport = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port:process.env.MAIL_PORT,
        auth:{
            user:process.env.MAIL_HOSTprocess.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    await transport.sendMail({
        from: process.env.MAIL.FROM,
        to: "virgilejoinville@gmail.com",
        subject: "test email",
        html: `<h2> Voici l'email </h2>`
    })
})

app.use((req, res, next) => {
    const cookies = req.headers.cookie;

    req.cookies = {};

    if (!cookies) {
        return next();
    }

    const cookiesArray = cookies.split("; ");
    const parsedCookies = {};

    for (let cookie of cookiesArray) {
        const [key, value] = cookie.split("=");
        parsedCookies[key] = value;
    }

    req.cookies = parsedCookies;

    next();
});
app.use(router);
// app.use(routerView);

app.listen(8080, async () => {
    console.log("Started!");
});


