import { Schema, model } from 'mongoose';
import { ILabel } from './label.interface';

const labelSchemaSchema = new Schema<ILabel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    labelId: {
      type: Number,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Label = model('Label', labelSchemaSchema);
