import * as AWS from "aws-sdk";
import * as uuid from "uuid/v4";

const client = new AWS.DynamoDB.DocumentClient();

/** put a to-do item in the db */
export function saveItemInDB(item: string, complete: boolean) {
  const params = {
    TableName: "to-do-list",
    Item: {
      id: uuid(),
      item,
      complete
    }
  };

  return client
    .put(params)
    .promise()
    .then(res => res)
    .catch(err => err);
}
