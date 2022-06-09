import { genSaltSync, hashSync, compareSync } from 'bcrypt';

// Fonction de hashage bcrypt :
const hashPassword = (password) => {
    const saltRounds = 4;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
};

// Fonction de comparaison. Retourn true si valide, et inversement.
const checkPassword = (password, hash) => {
    return compareSync(password, hash);
};

export default {
    hashPassword,
    checkPassword
};