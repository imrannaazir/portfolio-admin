import config from '../config';
import { TUser } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

const adminData: TUser = {
  email: config.super_admin.email as string,
  password: config.super_admin.password as string,
  role: 'ADMIN',
};

export const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ role: 'ADMIN' });

    if (!isAdminExist) {
      await User.create(adminData);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
