import ApiError from '../../../errors/ApiError';
import { generateLabelId } from '../../../utils/uniqueId';
import { ILabel } from './label.interface';
import { Label } from './label.model';

const addLabel = async (payload: ILabel) => {
  payload.labelId = generateLabelId();
  return await Label.create(payload);
};
const updateLabel = async (id: string, payload: any) => {
  const checkIsExist = await Label.findById(id);
  if (!checkIsExist) {
    throw new ApiError(404, 'Label not found');
  }
  const { ...LabelData } = payload;
  return await Label.findOneAndUpdate({ _id: id }, LabelData, {
    new: true,
    runValidators: true,
  });
};
const getLabel = async (id: string) => {
  return await Label.find({ user: id });
};
export const LabelService = {
  addLabel,
  updateLabel,
  getLabel,
};
