const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.json());
app.use(cors());
async function connectToDb() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Mongo db is connected");
  } catch (error) {
    console.error("Mongo db connection failed", error.message);
  }
}
connectToDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//Routes

const { role1 } = require("./routes/role1Route");
const { stuff2 } = require("./routes/stuff2Route");
const { stuffrole3 } = require("./routes/stuffrole3Route");
const { stage4 } = require("./routes/stage4Route");
const { branch5 } = require("./routes/branch5Route");
const { group6 } = require("./routes/group6Route");


app.use("/role1", role1);
app.use("/stuff2", stuff2);
app.use("/stuffrole3", stuffrole3);
app.use("/stage4", stage4);
app.use("/branch5", branch5);
app.use("/group6", group6);
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Api",
      version: "1.0.0",
      description: "API Documentation using Swagger",
    },
    servers: [
      {
        url: " http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
