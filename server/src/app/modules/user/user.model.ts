import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { Role } from './user.constant';
import { hashPassword } from '../auth/auth.utils';

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Role,
      default: 'ADMIN',
    },
  },
  {
    timestamps: true,
  },
);

// hash password using pre hook
userSchema.pre('save', async function () {
  this.password = await hashPassword(this.password);
});

// disallow password and password change at
userSchema.post('save', async function (doc, next) {
  doc.set('password', undefined);

  next();
});
const User = model<TUser>('user', userSchema);

export default User;
