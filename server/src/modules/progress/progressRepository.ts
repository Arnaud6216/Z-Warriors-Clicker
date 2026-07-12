import databaseClient from "../../../database/client";
import type { Progress } from "../../types/express/index";
import type { Result, Rows } from "../../../database/client";

class ProgressRepository {
  async read(accountId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `select progress.account_id, progress.ennemy_id, account.username, ennemy.name
       from progress
       join ennemy on progress.ennemy_id = ennemy.id
       join account on progress.account_id = account.id
       where progress.account_id = ?`,
      [accountId],
    );

    return rows[0] as Progress;
  }

  async edit(accountId: number, ennemyId: number) {
    await databaseClient.query(
      "UPDATE progress SET ennemy_id = ? WHERE account_id = ?",
      [ennemyId, accountId],
    );

    // On récupère la progression mise à jour
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM progress WHERE account_id = ?",
      [accountId],
    );

    return rows[0]; // On retourne la progression mise à jour
  }
}

export default new ProgressRepository();
