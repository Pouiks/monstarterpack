import Category from '../models/category';

const categoryController = {

    findCategories : async(request, response) => {
        try{
            const categories = await Category.findAll();
            response.status(200).json({categories});
        } catch(err){
            console.error(err);
        }
    },

    findOneCategory: async(request, response) => {
        try {
            const name = request.body.name;
            const category = await Category.findOne(name);
            if(category){
                response.status(200).json({category});
            } else {
                response.status(404).message("La catégorie n'existe pas")
            }
            
        } catch (error) {
            console.error(error);

        }
    },

    create: async (request, response) => {
        try {
            const name = request.body.name;

            const categoryExist = await Category.findOne(name);
            if(!categoryExist){
                const category = new Category();
                category.create({
                    name: name
                })
                response.status(200).json({category});
            } else {
                response.status(400).json({error: `category ${name} already exist`});

            }
        } catch (error) {
            console.error(error);
        }
    },

    delete: async (request, response) => {
        try {
            const name = request.body.name;
            
        } catch (error) {
            console.error(error);
        }
    }
    
}

export default  categoryController ;