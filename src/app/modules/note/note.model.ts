import { Schema, model } from 'mongoose';
import { INote } from './note.interface';

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Note = model('Note', noteSchema);
