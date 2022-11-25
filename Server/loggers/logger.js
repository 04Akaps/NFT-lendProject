const { createLogger, format, transports } = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const logDir = "loggers";

const logFormat = format.printf((info) => {
  return `${info.timestamp}, ${info.level}: ${info.message}`;
});

const metaDataLog = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),

  transports: [
    new winstonDaily({
      filename: "getMetaData.log",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "mysql/get",
      level: "get",
    }),
    new winstonDaily({
      filename: "postMetaData.log",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "mysql/post",
      level: "info",
    }),
    new winstonDaily({
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "mysql/error",
      filename: "MetaData-error.log",
      level: "error",
    }),
  ],
});

const redisLog = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),

  transports: [
    new winstonDaily({
      filename: "redis-connect.log",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/redis/logs",
      level: "info",
    }),
    new winstonDaily({
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/redis/error",
      filename: "redis-error.log",
      level: "error",
    }),
  ],
});

metaDataLog.add(
  new transports.Console({
    format: format.combine(
      format.colorize(), // 색깔 넣어서 출력
      format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    ),
  })
);

redisLog.add(
  new transports.Console({
    format: format.combine(
      format.colorize(), // 색깔 넣어서 출력
      format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    ),
  })
);

module.exports = { metaDataLog };
