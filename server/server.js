require("dotenv").config();
const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const evaluationRoutes = require("./routes/evalution")
const instructorRoutes = require('./routes/instructors');
const courseRoutes = require('./routes/courses');
const { default: mongoose } = require("mongoose");
// express app
const app = express();
// middleware
app.use(express.json());
const corsOptions = {
  origion: ["https://instructors-react-frontend.vercel.app/"],
  Credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors(corsOptions));
// routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/evalution", evaluationRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/instructor", instructorRoutes);

// Connect to a database
app.use("/", mongoose
  .connect("mongodb+srv://bahabelom:godknows@cluster0.f4gpdsb.mongodb.net/")
            
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  }));

// listen for requests
