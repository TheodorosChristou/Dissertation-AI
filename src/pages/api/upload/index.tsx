import PhotoModel from "../../../../models/PhotoModel";
import dbConnect from "../../../../lib/dbConnect";

const handler = async(req,res) =>{
    const {method} = req;

    await dbConnect();


    switch(method){
        case "POST":
            try{
                const photomodel = await PhotoModel.create(req.body);
                res.status(201).json({success: true, data: photomodel})
            }catch(error) {


                res.status(400).json({success: false, data: error})
            }
            break;

            default:
                res.status(400).json({ success: false});
    }
};
export default handler