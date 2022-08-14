const express = require("express");
const winston = require("winston");
const ecsFormat = require("@elastic/ecs-winston-format");
const product = require("./Elastic");
const app = express();
const logger = winston.createLogger({
  level: "debug",
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.File({
      filename: "logs/log.json",
      level: "debug",
    }),
  ],
});

app.get("/", async (req, res) => {
  const result = await product.search(req.query.search);
  res.json({ result });
  logger.info("handled request", {
    search: req.query.search,
    result: result.hits.hits,
    req,
  });
});

app.listen(2080, () => {
  console.log("server up and running on port: 2080");
});
