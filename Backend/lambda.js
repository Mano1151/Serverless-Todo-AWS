import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "TodoTable";

export const handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event));

  const method = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : null;

  try {
    if (method === "POST") {
      const item = {
        userId: body.userId,
        todoId: Date.now().toString(),
        task: body.task,
        completed: false
      };

      await ddb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      }));

      return response(200, { message: "Todo created", item });
    }

    if (method === "GET") {
      const data = await ddb.send(new ScanCommand({
        TableName: TABLE_NAME
      }));

      return response(200, data.Items);
    }

    if (method === "PUT") {
      await ddb.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          userId: body.userId,
          todoId: body.todoId
        },
        UpdateExpression: "set completed = :c",
        ExpressionAttributeValues: {
          ":c": body.completed
        }
      }));

      return response(200, { message: "Todo updated" });
    }

    if (method === "DELETE") {
      await ddb.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          userId: body.userId,
          todoId: body.todoId
        }
      }));

      return response(200, { message: "Todo deleted" });
    }

    return response(400, { message: "Unsupported method" });

  } catch (error) {
    console.error(error);
    return response(500, { error: error.message });
  }
};

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(body)
});
