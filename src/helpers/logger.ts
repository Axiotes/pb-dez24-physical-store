import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/../../logs/success.log`,
      level: "info",
      format: winston.format.combine(
        winston.format((info) =>
          info.level === "error" || info.level === "warn" ? false : info
        )()
      ),
    }),
    new winston.transports.File({
      filename: `${__dirname}/../../logs/error.log`,
      level: "error",
    }),
  ],
});

export default logger;
