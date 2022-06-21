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
            const id = request.params.id;
            const category = await Category.findOne(id);
            if(category){
                response.status(200).json({category});
            } else {
                response.status(404).json("La catégorie n'existe pas")
            }
            
        } catch (error) {
            console.error(error);

        }
    },

    create: async (request, response) => {
        try {
            const data = request.body.name;
            console.log(data);

            const categoryExist = await Category.findByName(data);
            if(categoryExist){

                response.status(400).json({error: `category ${data} already exist`});
            }
            
            Category.createCategory(data);
            response.status(200).json("categoryExist");
        } catch (error) {
            console.error(error);
        }
    },

    delete: async (request, response) => {
        try {
            const id = request.params.id;
            const categoryExist = await Category.findOne(id);
            if(!categoryExist){
                response.json(500).json('Cette catégorie n\'existe pas');
            }else {
                await Category.deleteCategory(id);
                response.status(200).json(`Category ${id} has been delete`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
}

export default  categoryController ;