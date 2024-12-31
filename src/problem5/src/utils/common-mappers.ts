import { SuccessDisplayModel } from "@utils/base-display-model";

export class SuccessMappers {
  public static toDisplay(success: boolean, message?: string) {
    const successResponseModel = new SuccessDisplayModel();
    successResponseModel.success = success;
    successResponseModel.message = message;
    return successResponseModel;
  }
}
