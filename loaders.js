import User from './models/user';

export const getUserById = (id) => User.findByIdAsync(id);
