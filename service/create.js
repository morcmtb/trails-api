import { v4 as uuidv4 } from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      trailId: uuidv4(),
      trailName: data.trailName,
      description: data.description,
      trailStatus: data.trailStatus,
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      latitude: data.latitude,
      longitude: data.longitude,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
    },
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e.message });
  }
}
