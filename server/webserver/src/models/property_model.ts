import mongoose from "mongoose";

export interface IProperty {
    ownerID: string;
    purpose?: string;
    price: string;
    title: string;
    country?: string;
    city?: string;
    address?: string;
    rooms?: string;
    baths?: string;
    area?: string;
    coverPhoto?: { url: string },
    phoneNumber?: { mobile: string, phone: string, whatsapp: string }

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
        type: String,
        required: true,
    },
    rooms: {
        type: String,
    },
    baths: {
        type: String,
    },
    area: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IProperty>("Properties", propertySchema);