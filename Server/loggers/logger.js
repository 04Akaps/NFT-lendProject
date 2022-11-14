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
      filename: "MetaData.log",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/logs",
      level: "MetaData",
    }),
    new winstonDaily({
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: "MetaData-error.log",
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

module.exports = { metaDataLog };
