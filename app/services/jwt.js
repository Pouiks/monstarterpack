import pkg from 'jsonwebtoken';
const { sign, verify,  } = pkg;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const generateTokenForUser = (userData) => {
    return sign({
        user_id: userData.id,
        user_email: userData.email,
        user_role: userData.role
    },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        }
    );
};
const verifyToken = (request, response, next)  =>{
    var token = request.headers.authorization;
    console.log(token);
    var jwtToken = verify(token, ACCESS_TOKEN_SECRET);
    if (jwtToken) {
        next();
    }


};

export default {
    generateTokenForUser,
    verifyToken
};