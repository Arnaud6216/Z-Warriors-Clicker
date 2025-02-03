import databaseClient from "../../../database/client";
import type { Progress } from "../../types/express/index";
import type { Result, Rows } from "../../../database/client";

class ProgressRepository {

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from progress join ennemy on progress.ennemy_id = ennemy.id join account on progress.account_id = account.id where progress.id = ?",
      [id],
    );

    return rows[0] as Progress;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from progress");
    return rows as Progress[];
  }

 async edit(accountId: number, ennemyId: number) {
  const [rows] = await databaseClient.query<Rows>(
    "UPDATE progress SET ennemy_id = ? WHERE account_id = ?",
    [ennemyId, accountId]
  );

  return rows;
}
}

export default new ProgressRepository();
