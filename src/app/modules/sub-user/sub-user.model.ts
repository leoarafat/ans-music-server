import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { ISubUser, SubUserModel } from './sub-user.interface';

const SubUserSchema = new Schema<ISubUser, SubUserModel>(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: 'sub-user',
    },
    image: {
      type: String,
      // required: true,
    },
    nidFront: {
      type: String,
      // required: true,
    },
    nidBack: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    postCode: {
      type: String,
      // required: true,
    },
    channelName: {
      type: String,
      // required: true,
    },
    channelUrl: {
      type: String,
      // required: true,
    },
    subscribeCount: {
      type: Number,
      // required: true,
    },
    videosCount: {
      type: Number,
      // required: true,
    },
    copyrightNotice: {
      type: String,
      // required: true,
    },
    dashboardScreenShot: {
      type: String,
      // required: true,
    },
    balance: {
      type: Number,
      // required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

SubUserSchema.statics.isSubUserExist = async function (
  email: string,
): Promise<Pick<ISubUser, '_id' | 'password' | 'phoneNumber' | 'role'> | null> {
  return await SubUser.findOne(
    { email },
    {
      _id: 1,
      email: 1,
      password: 1,
      role: 1,
      phoneNumber: 1,
    },
  );
};

// Check password match
SubUserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Hash the password
SubUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Statics
const SubUser = model<ISubUser, SubUserModel>('SubUser', SubUserSchema);

export default SubUser;
