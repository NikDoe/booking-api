import express from "express";

const usersRouter = express.Router();

usersRouter.post("/login", (req, res) => {
    res.send("вы вошли в систему");
})

usersRouter.post("/register", (req, res) => {
    res.send("вы зарегестрировались");
})

export { usersRouter };