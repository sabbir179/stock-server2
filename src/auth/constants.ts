export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: '7d',
};
