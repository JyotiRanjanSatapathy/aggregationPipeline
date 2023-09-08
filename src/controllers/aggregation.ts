import { Request, Response } from 'express';
import { STATUS_CODES } from '@enums/statusCodes';
import { sendResponse } from '@models/response'
import { User } from '@models/user';
import * as moment from 'moment';
import { config } from '@config/config'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
    //Please provide valid AccessId and SecretKey and the code wil run successfully
    credentials: {
        accessKeyId: config.AWS.AWS_ACCESS_ID,
        secretAccessKey: config.AWS.AWS_SECRET_KEY,
    },
    region: config.AWS.AWS_REGION
})


exports.get = async (req: Request, res: Response) => {
    try {

        const date = "04/01/22" //subject to change from clinet /server side


        const aggregationData = await User.aggregate([
            {
                $lookup: {
                    from: 'moods',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'userMood'
                }
            }, {
                $lookup: {
                    from: 'activities',
                    localField: '_id',
                    foreignField: 'User',
                    as: 'Activity'
                }
            }, {
                $lookup: {
                    from: 'sleeps',
                    localField: '_id',
                    foreignField: 'USER',
                    as: 'sleep'
                }
            }, { $unwind: "$Activity" },
            { $unwind: "$sleep" },

            // Match documents based on the specific day we want to fetch the data
            { $match: { "Activity.Date": date, "sleep.DATE": date } },

            // Group by userId and aggregate mood, activity, and sleep data
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$_id" },
                    moodScore: { $max: "$userMood.value" },
                    activity: {
                        $push: {
                            activity: "$Activity.Activity",
                            steps: "$Activity.Steps",
                            distance: "$Activity.Distance",
                            startTime: "$Activity.StartTime",
                            endTime: "$Activity.EndTime"
                        }
                    },
                    sleep: {
                        $push: {
                            sleepScore: "$sleep.SLEEP SCORE",
                            hoursOfSleep: "$sleep.HOURS OF SLEEP",
                            hoursInBed: "$sleep.DURATION IN BED"
                        }
                    }
                }
            },

            // Group by userId again to combine all the activities and sleep entries
            {
                $group: {
                    _id: "$userId",
                    userId: { $first: "$userId" },
                    moodScore: { $first: "$moodScore" },
                    activity: { $first: "$activity" },
                    sleep: { $first: "$sleep" }
                }
            }

        ])

        for (let i = 0; i < aggregationData.length; i++) {
            let userActivity = aggregationData[i].activity
            userActivity.map((activity: any) => {
                const format = "h:mm:ss A";
                activity['duration'] = moment(activity.endTime, format).diff(moment(activity.startTime, format), "minutes")
                delete activity.endTime
                delete activity.startTime
            })
            let sleepActivity = aggregationData[i].sleep[0]
            const sleepScore = sleepActivity.sleepScore
            const hoursOfSleep = sleepActivity.hoursOfSleep
            const format = "hh:mmA";
            const startTime = moment(sleepActivity.hoursInBed.split(' - ')[0], format)
            const endTime = moment(sleepActivity.hoursInBed.split(' - ')[1], format)

            if (endTime.isBefore(startTime)) {
                endTime.add(1, 'day');
            }
            const diff = moment.duration(endTime.diff(startTime));
            const hours = diff.hours();
            const minutes = diff.minutes();
            const seconds = diff.seconds();
            delete aggregationData[i].sleep
            delete aggregationData[i]._id
            aggregationData[i].moodScore = aggregationData[i].moodScore[0]
            aggregationData[i]['sleep'] = {}
            aggregationData[i].sleep['sleepScore'] = sleepScore
            aggregationData[i].sleep['hours_Of_Sleep'] = hoursOfSleep
            aggregationData[i].sleep['hours_in_bed'] = `${hours}:${minutes}:${seconds}`
            aggregationData[i]['date'] = date
        }

        //upload to a buckenOnS3 for individualDates
        const uploadParams = {
            Bucket: "user-data-mumbai",
            Key: `${moment().format("YYYY-MM-DD")}.json`,
            Body: JSON.stringify(aggregationData)
        };

        let AWS_ERROR_MESSAGE = 'successfully Uploaded data to S3'
        try {
            const command = new PutObjectCommand(uploadParams);
            await s3.send(command);
        } catch (err) {
            AWS_ERROR_MESSAGE = err.message
        }

        return sendResponse(res, { msg: AWS_ERROR_MESSAGE, data: aggregationData }, STATUS_CODES.SUCCESS, true);

    } catch (err) {
        return sendResponse(res, { msg: err.message, data: {} }, STATUS_CODES.SERVER_ERROR, false);
    }
}