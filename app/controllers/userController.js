import User from '../models/user';

const userController = {

    findUsers : async(request, response) => {
        try{
            console.log("je passe dans create");
            const users = await User.findAll();
            response.status(200).json({users});
        } catch(err){
            console.error(err);
        }
    },
}

export default userController ;