import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "email-validator";
import nodemailer from 'nodemailer';


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
    sendMail: async (req, res) => {
        // let {text} = req.body;
    
        const transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
    
        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: "virgilejoinville@gmail.com",
            subject: "test email",
            html: `<h2> Voici l'email </h2>`
        })
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

        const {email, password} = request.body;
        console.log(email, password);

        if (email == null || password == null) {
            return response.status(400).json({
                'Error': "Il manque l'email ou le password."
            });
        }
        console.log("recherche de l'email : ")
        const user = await User.findByEmail(email);
        console.log("APRES : ")
        console.log(user);
        if (!user) return response.status(401); //Unauthorized 
        // evaluate password 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400);
        }
        jwt.sign(
            user ,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                response.status(400).json({err})
              }
              response.json({ token });
            }
          );

    },

    authorization: async(request, response) => {

        jwt.verify(request.token, process.env.ACCESS_TOKEN_SECRET, (error, results) => {
            if(error){
                return response.status(500);
            }
            const userData = results;
            console.log(userData);
            const { password, ...authData } = userData;
      
            response.json({ authData });
        });
        
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