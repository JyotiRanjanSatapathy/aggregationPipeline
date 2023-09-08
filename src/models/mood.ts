import * as Mongoose from 'mongoose';

export interface IMood extends Mongoose.Document {
    id: string | null | any;
    field: string;
    user: string;
    value: Number;
    createdAt: Date;
    updatedAt: Date;
}

export const moodSchema = new Mongoose.Schema<IMood>(
    {
        field: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: false,
        },
        value: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true,
    },
);

export const Mood = Mongoose.model<IMood>("mood", moodSchema);