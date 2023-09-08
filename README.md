# Aggregation Pipeline

## How to Start the Project in Local Environment

1. Put valid AWS Access ID and Secret Key in the `.env` file.

Commands to run:
1. `npm i`
2. `npm run start`


This will start the server locally.

Base URL: [http://localhost:3000](http://localhost:3000)

## EndPoint Details

- URL: `aggregation/`
- Method: `GET`

To get the response, use the following endpoint:
[http://localhost:3000/aggregation/](http://localhost:3000/aggregation/)

## Framework/Stack Used

1. NodeJs
2. TypeScript
3. Express
4. MongoDB
5. AWS SDK

## Code to Review

### Folder Structure

- `src/`
- `controllers/`
 - `aggregation.ts` (This contains all the business logic of the pipeline service)
