import {model, Model, models, Schema} from "mongoose";

export interface PhotoInterface{
    _id?: string;
    Label: string;
    Photos: [];

}

const PhotoSchema = new Schema<PhotoInterface, Model<PhotoInterface>>({
    Label: {type: String},
    Photos: {type: []},


})

export default (models.PhotoModel as Model<PhotoInterface>) || model<PhotoInterface>("Photo", PhotoSchema);