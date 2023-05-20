import { mongoose } from '../db';

export interface IItem {
    timestamp: Date;
    title: string;
    desc: string;
    category: string;
    condition: string;
    price: number;
    size: string;
    img: string;
    user: mongoose.Schema.Types.ObjectId;
}