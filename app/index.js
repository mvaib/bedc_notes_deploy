const express = require("express");
const { dbConnection } = require("./dbConfig");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.text());

// CORS configuration

app.use(
    cors({
        origin: "http://localhost:5173", // Allowed origin
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
        credentials: true // if you need cookies or authentication
    })
);

// Set up routes
app.use("/users", userRouter);
app.use("/notes", noteRouter);

// Database connection and server start
app.listen(PORT, () => {
    dbConnection();
    console.log(`server is running on port: http://localhost:${PORT}`);
});
