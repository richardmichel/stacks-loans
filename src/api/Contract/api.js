import express from "express";
import { saveTransaction } from "./Contract";
const router = express.Router();

router.post("/contract", (req, res, next) => {
  const data = req.body;
  saveTransaction(data, (data, error = false) => {
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
