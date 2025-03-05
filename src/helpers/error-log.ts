import { InfoLogs } from "../interfaces/info-logs.interface";
import logger from "./logger";

const errorLog = (infoLog: InfoLogs) => {
  logger.error(infoLog);
};

export default errorLog;