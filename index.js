const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { query } = require("express");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("social media server is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.a23wjbh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const postCollection = client.db("social-media").collection("post");

    app.get("/post", async (req, res) => {
      const query = {};
      const options = await postCollection.find(query).toArray();
      res.send(options);
    });
  } finally {
  }
}
run().catch(console.log());

app.listen(port, () => console.log(`social media is running on port ${port}`));
