import express from "express";
import { usersRouter } from "./users/users.js";

const port = 9000;
const app = express();

app.get("/", (req, res) => {
    res.send("hello there👍")
})

app.use("/users", usersRouter);

app.all("*", (req, res) => {
    res.status(404);
    res.send("страница не найдена")
})

app.listen(port, () => {
    console.log(`сервер запущен на порту ${port}`);
});