import userModel from "../../models/User.js";

const getPaginatedUsers =  async (req, res) => {
    // the limit of data to be sent is set in the constant below
    const LIMIT_PER_PAGE = 5;
    const page = parseInt(req.query.page);
    const perPage = req.query.per_page > LIMIT_PER_PAGE ? LIMIT_PER_PAGE : parseInt(req.query.per_page);

    
    
    const totalUsers = await userModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers/perPage);
    const skippedUsers = (page -1)*perPage;
    const itemsOnPage = page === totalPages ? (totalUsers-skippedUsers) : perPage ;

    if(page > totalPages){
        return res.status(400).json(
            {
                "error": "Invalid Page Number",
                "metadata": {
                    "total_items": totalUsers,     
                    "items_per_page": itemsOnPage,   
                    "current_page": page,      
                    "total_pages": totalPages,
                }
            }) 
    }

    const users = await userModel.find({}).sort({ createdAt: -1 }).skip(skippedUsers).limit(perPage);
    const output = {
        "data": users,
        "metadata": {
            "total_items": totalUsers,     
            "items_per_page":  itemsOnPage,   
            "current_page": page,      
            "total_pages": totalPages,
        }
    }

    return res.status(200).json(output);

};

export default getPaginatedUsers;