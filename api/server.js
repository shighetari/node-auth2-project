const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const userRouter = require('../users/userRouter')
const authRouter = require('../auth/authRouter')
const restricted = require('../auth/restricted-middleware')
const checkDepartment = require('../auth/check-department-middleware')

server.use(express.json());
server.use(helmet());
server.use(cors());


server.use('/api/users',  restricted, checkDepartment('admin'), userRouter )
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

module.exports = server;