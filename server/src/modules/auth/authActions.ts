import type { RequestHandler } from "express";

// Import access to data
import accountRepository from "../account/accountRepository";

const login: RequestHandler = async (req, res, next) => {
  
  try {
    // Fetch a specific account from the database based on the provided email
    const user = await accountRepository.readByEmail(req.body.email);

    if (user == null || user.password !== req.body.password) {
      res.sendStatus(422);
    } else {
      // Respond with the account in JSON format
      res.json(user);
      

    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { login };
