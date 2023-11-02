import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    throw new Error(error);
  }
};

export const comparePassword = (password: string, passwordFromDb: string) => {
  const compared = bcrypt.compareSync(password, passwordFromDb);
  return compared;
};
