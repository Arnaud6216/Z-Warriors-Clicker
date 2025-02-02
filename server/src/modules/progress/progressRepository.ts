import databaseClient from "../../../database/client";
import type { Progress } from "../../types/express/index";
import type { Result, Rows } from "../../../database/client";

class ProgressRepository {
  async create(progress: Omit<Progress, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into progress (account_id, ennemy_id) values (?, ?)",
      [progress.account_id, progress.ennemy_id],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from progress where id = ?",
      [id],
    );

    return rows[0] as Progress;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from progress");
    return rows as Progress[];
  }
}

export default new ProgressRepository();
