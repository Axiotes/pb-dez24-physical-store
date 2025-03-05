import { InfoLogs } from "../interfaces/info-logs.interface";
import logger from "./logger";

const successLog = (infoLog: InfoLogs) => {
  logger.info(infoLog);
};

export default successLog;
