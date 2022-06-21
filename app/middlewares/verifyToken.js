import pkg from 'jsonwebtoken';
const { verify } = pkg;

const verifyToken = (request, response, next) => {
    const bearerToken = request.headers.authorization;
    if(!bearerToken) {
        return response.status(500).send("Pas de token");
    }

    const bearer = bearerToken.split(" ");


    request.token = bearer[1];
    next();
}

export default verifyToken