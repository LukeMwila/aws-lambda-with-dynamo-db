import * as AWS from "aws-sdk";
import * as uuid from "uuid/v4";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

/** put a to-do item in the db table */
export function saveItemInDB(item: string, complete: boolean) {
  const params = {
    TableName: "to-do-list",
    Item: {
      id: uuid(),
      item,
      complete
    }
  };

  return dynamoDB
    .put(params)
    .promise()
    .then(res => res)
    .catch(err => err);
}

/** get a to-do item from the db table */
export function getItemFromDB(id: string) {
  const params = {
    TableName: "to-do-list",
    Key: {
      id
    }
  };

  return dynamoDB
    .get(params)
    .promise()
    .then(res => res.Item)
    .catch(err => err);
}
