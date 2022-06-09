
import {} from 'dotenv/config';
import path from "path";
import express from 'express';
// import routerView from './router/index.mjs'
import router from './router.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';


const __dirname = path.resolve();

const app = express();
app.use(cors('*'));

// app.set("view engine", 'ejs');
// app.set('views', "./app/views")


// app.use(
//     '/public/css',
//     express.static(__dirname + '/public/css')
// );

app.use(express.urlencoded());
app.use(cookieParser());

// app.use((req, res, next) => {
//     const cookies = req.headers.cookie;

//     req.cookies = {};

//     if (!cookies) {
//         return next();
//     }

//     const cookiesArray = cookies.split("; ");
//     const parsedCookies = {};

//     for (let cookie of cookiesArray) {
//         const [key, value] = cookie.split("=");
//         parsedCookies[key] = value;
//     }

//     req.cookies = parsedCookies;

//     next();
// });
app.use(router);
// app.use(routerView);

app.listen(8080, async () => {
    console.log("Started!");
});


