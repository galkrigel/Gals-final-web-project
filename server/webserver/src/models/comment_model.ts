import mongoose from "mongoose";

export interface IComment {
    _id?: string;
    email: string;
    ownerId?: string;
    text: string;
}

const commentSchema = new mongoose.Schema<IComment>({
    email: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
    },
    ownerId: {
        type: String,
    },
});

export default mongoose.model<IComment>("Comment", commentSchema);