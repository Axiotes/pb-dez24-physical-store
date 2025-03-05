import { InfoLogs } from "../interfaces/info-logs.interface";
import logger from "./logger";

const errorLog = (infoLog: InfoLogs) => {
  logger.error({
    ...infoLog,
    executionTime: `${
      new Date().getTime() - infoLog.executionTime.getTime()
    }ms`,
    error: {
      message: infoLog.error?.message,
      stack: infoLog.error?.stack,
    },
  });
};

export default errorLog;
