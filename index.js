import express from "express";

const port = 9000;
const app = express();

app.get("/", (req, res) => {
    res.send("hello there👍")
})

app.listen(port, () => {
    console.log(`сервер запущен на порту ${port}`);
});