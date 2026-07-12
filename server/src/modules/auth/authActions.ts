import type { RequestHandler } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Import access to data
import accountRepository from "../account/accountRepository";

const APP_SECRET = process.env.APP_SECRET as string;
const TOKEN_COOKIE = "token";
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const login: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific account from the database based on the provided email
    const user = await accountRepository.readByEmailWithPassword(req.body.email);
    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified =await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    if (verified) {
      const {hashed_password, ...userWithoutHashedPassword} = user;

      const token = jwt.sign(userWithoutHashedPassword, APP_SECRET, {
        expiresIn: "7d",
      });

      res.cookie(TOKEN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: TOKEN_MAX_AGE_MS,
      });

      res.json(userWithoutHashedPassword);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie(TOKEN_COOKIE);
  res.sendStatus(204);
};

const me: RequestHandler = (req, res) => {
  res.json(req.user);
};

// Verifies the JWT cookie and attaches the decoded account to req.user.
// Sends 401 when the cookie is missing or invalid.
const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies?.[TOKEN_COOKIE];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    req.user = jwt.verify(token, APP_SECRET) as {
      id: number;
      username: string;
      email: string;
    };
    next();
  } catch {
    res.sendStatus(401);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const {password} = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
}

export default { login, logout, me, requireAuth, hashPassword };
