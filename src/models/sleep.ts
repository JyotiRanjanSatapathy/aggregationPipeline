import * as Mongoose from 'mongoose';

export interface ISleep extends Mongoose.Document {
    id: string | null | any;
    User: string;
    DAY: string;
    DATE: string;
    HOURS_OF_SLEEP: string;
    REM_SLEEP: string;
    DEEP_SLEEP: string;
    HEART_RATE_BELOW_RESTING: string;
    SLEEP_SCORE: number;
    DURATION_IN_BED: string;
    HOURS_IN_BED: string
}

export const sleepSchema = new Mongoose.Schema<ISleep>(
    {
        User: {
            type: String,
            required: false,
        },
        DAY: {
            type: String,
            required: false,
        },
        DATE: {
            type: String,
            required: false,
        },
        HOURS_OF_SLEEP: {
            type: String,
            required: false,
        },
        REM_SLEEP: {
            type: String,
            required: false,
        },
        DEEP_SLEEP: {
            type: String,
            required: false,
        },
        HEART_RATE_BELOW_RESTING: {
            type: String,
            required: false,
        },
        SLEEP_SCORE: {
            type: Number,
            required: false,
        },
        DURATION_IN_BED: {
            type: String,
            required: false,
        },
        HOURS_IN_BED: {
            type: String,
            required: false,
        }
    }
);

export const Sleep = Mongoose.model<ISleep>("sleep", sleepSchema);