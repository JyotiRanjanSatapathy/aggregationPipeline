export const config = {
    PORT: parseInt(process.env.PORT),
    MONGO: {
        MONGO_STAGING_URI: process.env.MONGO_DB_URI
    },
    AWS: {
        AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
        AWS_SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.S3_REGION,
    }
}