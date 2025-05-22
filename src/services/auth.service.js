const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { generateTokens } = require("../utils/jwt");

exports.registerUser = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw { code: "EMAIL_ALREADY_REGISTERED", message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};



exports.loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw {
      code: "EMAIL_NOT_FOUND",
      message: "Email is incorrect",
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw {
      code: "INVALID_PASSWORD",
      message: "Password is incorrect",
    };
  }

  const { accessToken, refreshToken } = generateTokens(user);
  
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  return { user, accessToken, refreshToken };
};

