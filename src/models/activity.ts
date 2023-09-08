import * as Mongoose from 'mongoose';

export interface IActivity extends Mongoose.Document {
    id: string | null | any;
    User: string;
    Date: string;
    StartTime: string;
    EndTime: string;
    Duration: string;
    Activity: string;
    LogType: string;
    Steps: Number;
    Distance: Number;
    ElevationGain: Number
    Calories: Number
}

export const activitySchema = new Mongoose.Schema<IActivity>(
    {
        User: {
            type: String,
            required: false,
        },
        Date: {
            type: String,
            required: false,
        },
        StartTime: {
            type: String,
            required: false,
        },
        EndTime: {
            type: String,
            required: false,
        },
        Duration: {
            type: String,
            required: false,
        },
        Activity: {
            type: String,
            required: false,
        },
        LogType: {
            type: String,
            required: false,
        },
        Steps: {
            type: Number,
            required: false,
        },
        Distance: {
            type: Number,
            required: false,
        },
        ElevationGain: {
            type: Number,
            required: false,
        },
        Calories: {
            type: Number,
            required: false,
        }
    }
);

export const Activity = Mongoose.model<IActivity>("activity", activitySchema);