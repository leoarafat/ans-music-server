import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { LabelService } from './label.service';
import sendResponse from '../../../shared/sendResponse';

const updateLabel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await LabelService.updateLabel(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Label update successful!',
    data: result,
  });
});
const addLabel = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await LabelService.addLabel(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Artist added successful!',
    data: result,
  });
});
const getLabel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await LabelService.getLabel(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Artist retrieved successful!',
    data: result,
  });
});
export const LabelController = {
  getLabel,
  addLabel,
  updateLabel,
};
