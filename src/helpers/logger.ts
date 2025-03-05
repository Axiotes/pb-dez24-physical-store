import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/../../logs/success.log`,
      level: "info",
    }),
    new winston.transports.File({
      filename: `${__dirname}/../../logs/error.log`,
      level: "error",
    }),
  ],
});

export default logger;
