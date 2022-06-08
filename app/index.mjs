
import 'dotenv/config';
import path from "path";
import express from 'express';
import router from './router/index.mjs'
import cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize';


const __dirname = path.resolve();

const app = express();

app.set("view engine", 'ejs');
app.set('views', "./app/views")


app.use(
    '/public/css',
    express.static(__dirname + '/public/css')
);

app.use(express.urlencoded());
app.use(cookieParser());

app.use((req, res, next) => {
    const cookies = req.headers.cookie;
    console.log(cookies);

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


const sequelize = new Sequelize(process.env.PG_URL);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.listen(3000, async () => {
    console.log("Started!");
});

