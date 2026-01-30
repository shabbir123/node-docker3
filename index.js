const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require('cors');
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_URL,
} = require("./config/config");

const app = express();

// ---------------------------
// REDIS CLIENT SETUP
// ---------------------------
const redisClient = createClient({
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
});

redisClient.connect().catch(console.error);

//  Create Redis Store instance
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
});

// ---------------------------
// MONGODB CONNECTION
// ---------------------------
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 5 seconds...");
      console.error(err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// ---------------------------
// SESSION CONFIG
// ---------------------------
app.use(session({
  store: redisStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // cookie only created when session modified
  cookie: {
    secure: false,       // false for HTTP localhost
    httpOnly: true,      // cannot be accessed by JS
    maxAge: 30000, // 10 minutes
    sameSite: "lax",     // allow cookie in Postman
  },
}));
//192.168.115.4
// ---------------------------
// EXPRESS MIDDLEWARE
// ---------------------------
app.enable('trust proxy')
app.use(cors())
app.use(express.json());

// ---------------------------SSS
// ROUTES
// ---------------------------
app.get("/api/v1", (req, res) => {
  res.send("<h1>Hello from Node + Redis + MongoDB update123</h1>");
  console.log("Load balancing");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// ---------------------------
// SERVER START
// ---------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
