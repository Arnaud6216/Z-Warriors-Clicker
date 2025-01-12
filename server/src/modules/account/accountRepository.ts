import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Account = {
  id: number;
  username: string;
  email: string;
  password: string;
};

class AccountRepository {
  async create(account: Omit<Account, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into account (username, email, password) values (?, ?, ?)",
      [account.username, account.email, account.password],
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

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from account");

    return rows as Account[];
  }
}

export default new AccountRepository();
