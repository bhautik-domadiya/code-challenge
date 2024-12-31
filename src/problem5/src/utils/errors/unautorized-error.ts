import { ExpressError } from "./express.error";

export class NotFoundError extends ExpressError {
  constructor(error: any, message: string, category: string, code: string) {
    // set Error Category
    super(category);
    // update the Error
    this.updateError(code, message, error);
  }
}
