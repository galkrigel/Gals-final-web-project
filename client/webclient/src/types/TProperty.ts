import { TComment } from "./TComment"

export type TProperty = {
    _id: string,
    ownerID: number,
    purpose: string,
    price: number,
    product: string,
    productLabel: string,
    rentFrequency: string,
    title: string,
    rooms: number,
    baths: number,
    area: number,
    phoneNumber: {
        mobile: string,
        phone: string,
        whatsapp: string
    },
    contactName: string,
    name: string,
    coverPhoto: {
        url: string
    },
    comments?: TComment[]
}

