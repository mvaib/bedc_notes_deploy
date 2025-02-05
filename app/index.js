const express = require("express");
const { dbConnection } = require("./dbConfig");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
const cors = require("cors")
const app = express()

const PORT = 8080;

app.use(express.json());
app.use(express.text());
app.use(cors());
app.use("/users",userRouter);
app.use("/notes", noteRouter);

app.listen(PORT, ()=>{
    dbConnection()
    console.log(`server is running on port : http://localhost:${PORT}`)
})