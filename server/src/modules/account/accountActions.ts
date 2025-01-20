import type { RequestHandler } from "express";
import accountRepository from "./accountRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const account = await accountRepository.readAll();

    res.json(account);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);
    const account = await accountRepository.read(accountId);

    if (account == null) {
      res.sendStatus(404);
    } else {
      res.json(account);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newAccount = {
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const accountId = await accountRepository.create(newAccount);

    res.status(201).json({ accountId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
