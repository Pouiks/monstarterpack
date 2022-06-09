import { sign, verify } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function generateTokenForUser(userData) {
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
}
export function verifyToken(request, response, next) {
    var token = request.headers.authorization;
    console.log(token);
    var jwtToken = verify(token, ACCESS_TOKEN_SECRET);
    if (jwtToken) {
        next();
    }


}