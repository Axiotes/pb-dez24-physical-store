import { InfoLogs } from "../interfaces/info-logs.interface";
import logger from "./logger";

const successLog = (infoLog: InfoLogs) => {
  logger.info({
    ...infoLog,
    executionTime: `${new Date().getTime() - infoLog.executionTime.getTime()}ms`,
  });
};

export default successLog;
