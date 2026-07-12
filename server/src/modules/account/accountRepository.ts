import databaseClient from "../../../database/client";
import type { Account } from "../../types/express/index";
import type { Result, Rows } from "../../../database/client";

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
      "select id, username, email from account where id = ?",
      [id],
    );

    return rows[0] as Omit<Account, "hashed_password">;
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
    const [rows] = await databaseClient.query<Rows>(
      "select id, username, email from account",
    );

    return rows as Omit<Account, "hashed_password">[];
  }
}

export default new AccountRepository();
