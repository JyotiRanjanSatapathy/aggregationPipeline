import * as Mongoose from 'mongoose';

export interface IUser extends Mongoose.Document {
    id: string | null | any;
    name: string;
    timezone: string;
    version: Number;
    app: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}

export const userSchema = new Mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        timezone: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        app: {
            type: String,
            required: false
        },
        version: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true,
    },
);

export const User = Mongoose.model<IUser>("User", userSchema);