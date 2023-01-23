import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const fsPromises = fs.promises;

const logEvents = async (message, logFileName) => {
  //  \t are tabs - \n are new lines
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (
      !fs.existsSync(
        path.join(dirname(fileURLToPath(import.meta.url)), '..', 'logs')
      )
    ) {
      await fsPromises.mkdir(
        path.join(dirname(fileURLToPath(import.meta.url)), '..', 'logs')
      );
    }

    await fsPromises.appendFile(
      path.join(
        dirname(fileURLToPath(import.meta.url)),
        '..',
        'logs',
        logFileName
      ),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

const loggerMiddleware = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.referer}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};
export { logEvents, loggerMiddleware };
