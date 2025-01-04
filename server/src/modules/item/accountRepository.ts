import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Account = {
  id: number;
  username: string;
  email: string;
  password: string;
};

class AccountRepository {
  // The C of CRUD - Create operation

  async create(account: Omit<Account, "id">) {
    // Execute the SQL INSERT query to add a new account to the "account" table
    const [result] = await databaseClient.query<Result>(
      "insert into account (username, email, password) values (?, ?, ?)",
      [account.username, account.email, account.password],
    );

    // Return the ID of the newly inserted account
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific account by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from account where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the account
    return rows[0] as Account;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all accounts from the "account" table
    const [rows] = await databaseClient.query<Rows>("select * from account");

    // Return the array of accounts
    return rows as Account[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing account

  // async update(account: Account) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an account by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new AccountRepository();
