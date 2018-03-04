import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export async function main(event, context, callback) {
    const params = {
        TableName: "roam-trails-api"
    }
    try {
        const result = await dynamoDbLib.call("scan", params)
        result.Items.sort((a, b) => {
            return a.trailName > b.trailName ? 1 : -1
        })
        callback(null, success(result.Items))
    } catch (e) {
        callback(null, failure({ status: false, error: e.message }))
    }
}
