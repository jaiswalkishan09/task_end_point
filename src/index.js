const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const tasksRoutes = require("./routes/tasks");

dotenv.config({ path: path.join(__dirname, "../.env") });

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/tasks", tasksRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port" ${PORT}.`);
});
