import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { noteService } from './note.service';
import sendResponse from '../../../shared/sendResponse';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await noteService.insertIntoDB(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
const notes = catchAsync(async (req: Request, res: Response) => {
  const result = await noteService.notes();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
const singleNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await noteService.singleNote(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
const updateNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await noteService.updateNote(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await noteService.deleteNote(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});

export const noteController = {
  insertIntoDB,
  notes,
  singleNote,
  updateNote,
  deleteNote,
};
