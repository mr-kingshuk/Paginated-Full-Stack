import userModel from "../../models/User.js";
import mongoose from "mongoose";

const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "MongoDB ID is invalid"});
    }

    const user = await userModel.findOneAndDelete({_id : id});
    if(!user){
        return res.status(400).json({error: `No such user exist with id of ${id}`});
    }
    return res.status(204).json(user);
};

export default deleteUser;