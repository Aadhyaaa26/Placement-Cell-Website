const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Job = require("./models/Job");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/placement")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Placement Portal API Running");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const User = require("./models/User");

// Register
app.post("/api/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Registered ✅");
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.send("Login Success");
  else res.send("Invalid Credentials");
});
app.post("/api/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.send("Job Added ✅");
});
app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});