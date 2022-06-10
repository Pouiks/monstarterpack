import User from '../models/user';
import bcrypt from 'bcrypt';
import validator from "email-validator";


const userController = {

    findUsers : async(request, response) => {
        try{
            console.log('>>>>>>>>>>>>>><');
            const users = await User.findAll();
            response.status(200).json(users);
        } catch(err){
            console.error(err);
        }
    },

    findOneUser: async(request, response) => {
        try {
            const userId = request.params.id;
            const user = await User.findOne(userId);
            response.status(200).json({user});
        } catch (error) {
            console.error(error);
            response.status(500).json(`User not found`)
        }
    },

    findByEmail: async (request, response) => {
        try {
            const email = request.params.email;
            const user = await User.findByEmail(email);
            if (user) {
                response.status(200).json({
                    user
                })
            } else {
                response.status(400).json({error:"Email inexistant"})
            }
        } catch (err) {
            console.trace("Aucun utilisateur avec cet email correspondant .", error);
            response.status(404).json('Aucun utilisateur avec cet email correspondant.');
        }
    }, 

    createUser: async(request, response) => {
        try {
            const data = request.body;

                const userEmail = await User.findByEmail(data.email)
                if (userEmail) {
                    return response.status(409).json("L'Email existe déja.");
                }
                bcrypt.hash(data.password, 5, function (error, bcryptPassword) {
                    const user = new User(data);
                    User.create({
                        name: data.name,
                        email: data.email,
                        password: bcryptPassword,
                        role: data.role
                    });
                    console.log(user);
                    response.status(200).json({
                        message: `Utilisateur ${data.email} Créée.`
                    });
                });

        } catch (error) {
            console.log(error);
            response.status(400).json({error: 'User was not created'});
        }
    },

    login: async (request, response) => {

        const email = request.body.email;
        const password = request.body.password;
        console.log(password);

        if (email == null || password == null) {
            return response.status(400).json({
                'Error': "Il manque l'email ou le password."
            });
        }
        const user = await User.loginByEmail(email);
        if (!user) {
            return response.status(404).json({
                'error': 'Aucune adresse mail correspondante en BDD.'
            })
        } else {

            // If crypt password match, return the user with token
            bcrypt.compare(password, user.password, function (errBycrypt, resByCrypt) {
                if (resByCrypt) {
                    response.status(200).json({
                        user,
                        'user_id': user.id,
                        'token': jwt.generateTokenForUser(user),

                    })
                    // console.log(response);
                } else {
                    return response.status(403).json({
                        'error': "Mot de passe invalide."
                    });
                }
            })
        }

    },

    updateuser: async(request, response) => {
        try {
            const data = request.body;

            const findUser = await User.findOne(data.id);
            if(!findUser){
                response.status(400).json('User not found');
            }else {
                User.update({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                })
            }
        } catch (error) {
            console.error(error);
            response.status(500).json('Error occured');
        }
    },

    deleteUser: async(request, response) => {
        try {
            const id = request.params.id;
            await User.delete(id);
            response.status(200).json(`User ${id} has been delete`);
        } catch (error) {
            console.log(error);
            response.status(400).json('Error occured');
        }
    },




}

export default userController ;