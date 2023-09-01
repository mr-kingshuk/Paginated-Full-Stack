import userModel from "../../models/User.js";

const createUser = async (req, res) => {
    const { name, email, gender } = req.body;

    //need to do error handling
    //array to handle errors
    let emptyFields = [];

    //filling the emptyFields array withe the value it is empty of.
    if(!name)
        emptyFields.push('name');
    if(!email)
        emptyFields.push('email');
    if(!gender)
        emptyFields.push('gender');

    if(emptyFields.length)
        return res.status(400).json({ error : 'Please fill in all the fields', emptyFields })    

    //add document to database
    try {
        const user = await userModel.create({ name, email, gender });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(400).json({ error: err.message })
    }
};

export default createUser;