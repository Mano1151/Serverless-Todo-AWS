import express from "express";
import bodyParser from "body-parser";
import {
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const TABLE_NAME = "TodoTable";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddb = DynamoDBDocumentClient.from(client);

/**
 * GET /todo
 */
app.get("/todo", async (req, res) => {
  try {
    const data = await ddb.send(
      new ScanCommand({ TableName: TABLE_NAME })
    );
    res.json(data.Items || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /todo
 */
app.post("/todo", async (req, res) => {
  const { userId, task } = req.body;

  const item = {
    userId,
    todoId: Date.now().toString(),
    task,
    completed: false
  };

  try {
    await ddb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );
    res.json({ message: "Todo created", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /todo
 */
app.put("/todo", async (req, res) => {
  const { userId, todoId, task, completed } = req.body;

  try {
    await ddb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { userId, todoId },
        UpdateExpression: "set task = :t, completed = :c",
        ExpressionAttributeValues: {
          ":t": task,
          ":c": completed
        }
      })
    );
    res.json({ message: "Todo updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /todo
 */
app.delete("/todo", async (req, res) => {
  const { userId, todoId } = req.body;

  try {
    await ddb.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { userId, todoId }
      })
    );
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
