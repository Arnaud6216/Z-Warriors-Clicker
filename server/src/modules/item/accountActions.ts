import type { RequestHandler } from "express";

// Import access to data
import accountRepository from "./accountRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all account
    const account = await accountRepository.readAll();

    // Respond with the account in JSON format
    res.json(account);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific account based on the provided ID
    const accountId = Number(req.params.id);
    const account = await accountRepository.read(accountId);

    // If the account is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the account in JSON format
    if (account == null) {
      res.sendStatus(404);
    } else {
      res.json(account);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the account data from the request body
    const newAccount = {
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    // Create the account
    const accountId = await accountRepository.create(newAccount);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted account
    res.status(201).json({ accountId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
