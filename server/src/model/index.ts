import mongoose, { Schema } from 'mongoose';
import { IData, ITime } from '../interface';

const ExpiredData: Schema<IData> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        video: { type: String, required: true },
        poster: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const TimeModelData: Schema<ITime> = new Schema(
    {
        key: { type: String, required: true },
        date: { type: Number, required: true },
    }
);

export const ExpiredModel = mongoose.model<IData>('ExpiredData', ExpiredData);
export const TimeModel = mongoose.model<ITime>('TimeModelData', TimeModelData);