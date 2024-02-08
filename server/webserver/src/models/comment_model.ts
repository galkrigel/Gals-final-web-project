import mongoose from "mongoose";

export interface IComment {
    _id?: string;
    userId: string;
    propertyId: string;
    text: string;
}

const commentSchema = new mongoose.Schema<IComment>({
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    propertyId: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IComment>("Comment", commentSchema);