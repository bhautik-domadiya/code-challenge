import { Response } from "express";
import { ExpressError } from "../../utils/errors/express.error";
import { NotFoundError } from "../../utils/errors/not-found-error";
import { ErrorCategories } from "../../utils/errors/erorr-catagories";

export abstract class BaseController {
  public getResult(response: any, res: Response) {
    if (response instanceof ExpressError) {
      if (response instanceof NotFoundError) {
        return res.status(404).send(response);
      }

      if (response.category === ErrorCategories.Unauthorized) {
        return res.status(401).send(response);
      }

      return res.status(400).send(response);
    }

    return res.status(200).json(response);
  }
}
