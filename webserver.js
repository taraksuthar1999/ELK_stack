const http = require("http");
const winston = require("winston");
const ecsFormat = require("@elastic/ecs-winston-format");

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

const server = http.createServer((req, res) => {
  res.setHeader("hello", "there");
  res.end("ok");
  logger.info("handled request", { req, res });
});

server.listen(2080, () => {
  logger.info("listening at port 2080");
});
