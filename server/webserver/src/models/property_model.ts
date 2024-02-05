import mongoose from "mongoose";

export interface IProperty {
    _id?: string,
    ownerID: string;
    purpose?: string;
    price: number;
    title: string;
    country?: string;
    city?: string;
    address?: string;
    rooms?: number;
    baths?: number;
    area?: number;
    coverPhoto?: { url: string }
    phoneNumber?: { mobile: string, phone: string, whatsapp: string };
    comments?: number;
    imgUrl?: string;
}

const propertySchema = new mongoose.Schema<IProperty>({
    ownerID: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    coverPhoto: {
        type: { url: String }
    },
    phoneNumber: {
        type: { mobile: String, phone: String, whatsapp: String }
    },
    price: {
        type: Number,
        required: true,
    },
    rooms: {
        type: Number,
    },
    baths: {
        type: Number,
    },
    area: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    comments: {
        type: Number,
        required: false,
    },
    imgUrl: {
        type: String,
        required: false,
    },
});

export default mongoose.model<IProperty>("Properties", propertySchema);