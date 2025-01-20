import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Account = {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
};

class AccountRepository {
  async create(account: Omit<Account, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into account (username, email, hashed_password) values (?, ?, ?)",
      [account.username, account.email, account.hashed_password],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from account where id = ?",
      [id],
    );

    return rows[0] as Account;
  }

  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific account by its email
    const [rows] = await databaseClient.query<Rows>(
      "select * from account where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the account
    return rows[0] as Account;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from account");

    return rows as Account[];
  }
}

export default new AccountRepository();
