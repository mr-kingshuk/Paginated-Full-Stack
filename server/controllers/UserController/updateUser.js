import userModel from "../../models/User.js";
import mongoose from "mongoose";

const updateUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "MongoDB ID is invalid"});
    }

    const user = await userModel.findOneAndUpdate({_id : id}, {
        ...req.body
    });
    if(!user){
        return res.status(400).json({error: `No such user exist with id of ${id}`});
    }
    return res.status(200).json(user);
};

export default updateUser