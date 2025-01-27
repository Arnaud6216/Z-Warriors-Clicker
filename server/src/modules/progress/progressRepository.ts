import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Progress = {
  account_id: number;
  ennemy_id: number;
};

class ProgressRepository {

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from progress join ennemy on progress.ennemy_id = ennemy.id join account on progress.account_id = account.id where progress.id = ?"
      ,
      [id],
    );

    return rows[0] as Progress;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from progress");
    return rows as Progress[];
  }

  async edit(accountId: number, ennemyId: number) {
    const [rows] = await databaseClient.query<Result>(
      "UPDATE progress SET ennemy_id = ennemy_id + 1",
      [ennemyId, accountId],
    );

    return rows;
  }
}



export default new ProgressRepository();
