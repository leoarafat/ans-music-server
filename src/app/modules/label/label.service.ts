import QueryBuilder from '../../../builder/QueryBuilder';
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
const getLabel = async (id: string, query: Record<string, unknown>) => {
  const labelQuery = new QueryBuilder(Label.find({ user: id }), query)
    .search(['labelName'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await labelQuery.modelQuery;
  const meta = await labelQuery.countTotal();
  return {
    meta,
    data: result,
  };
};
export const LabelService = {
  addLabel,
  updateLabel,
  getLabel,
};
