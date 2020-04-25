
import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string) {
     console.log("LOG: "+Date() + " --> " +message)
  }
  error(message: string, trace: string) {
    /* your implementation */
    console.log("ERROR: "+Date() + " --> " +message + trace)
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}