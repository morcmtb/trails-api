import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      trailId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      "SET trailStatus = :trailStatus, description = :description, updatedAt = :updatedAt, updatedBy = :updatedBy",
    ExpressionAttributeValues: {
      ":description": data.trailDescription ? data.trailDescription : null,
      ":trailStatus": data.trailStatus ? data.trailStatus : null,
      ":updatedAt": new Date().getTime(),
      ":updatedBy": event.requestContext.identity.cognitoIdentityId
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true, result: result });
  } catch (e) {
    return failure({ status: false, error: e.message });
  }
}
