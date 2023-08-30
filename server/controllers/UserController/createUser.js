import userModel from "../../models/User.js";

const createUser = async (req, res) => {
    const { name, email, gender } = req.body;

    //need to do error handling

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