import express from "express";
import { createUser, findAllUsers, findById, updateUser } from "./User";
const router = express.Router();

router.get("/users", (req, res, next) => {
  findAllUsers((users) => {
    res.json({
      response: users,
    });
  });
});

router.get("/user/:id", (req, res, next) => {
  const {
    params: { id },
  } = req;
  findById(id, (singleUser) => {
    console.log("single", singleUser);
    if (!singleUser || singleUser.length === 0) {
      res.send({
        error: true,
        message: "User not found",
      });
    } else {
      res.json({
        response: [singleUser],
      });
    }
  });
});

router.post("/user", (req, res, next) => {
  const { username } = req.body;
  createUser(username, (data, error = false) => {
    if (error) {
      res.json({
        error: true,
        message: data,
      });
    } else {
      res.json({
        response: {
          saved: true,
          post: data,
        },
      });
    }
  });
});

router.put("/user/:id", (req, res, next) => {
  const { id } = req.params.id;
  const { username } = req.body;
  updateUser(id, username, (data, error = false) => {
    if (error) {
      res.json({
        error: true,
        message: data,
      });
    } else {
      res.json({
        response: {
          saved: true,
          post: data,
        },
      });
    }
  });
});

module.exports = router;
