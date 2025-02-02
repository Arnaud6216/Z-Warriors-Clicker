import databaseClient from "../../../database/client";
import type { Ennemy } from "../../types/express/index";
import type { Result, Rows } from "../../../database/client";

class EnnemyRepository {
  async create(ennemy: Omit<Ennemy, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into ennemy (name, img_src, life) values (?, ?, ?)",
      [ennemy.name, ennemy.img_src, ennemy.life],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from ennemy where id = ?",
      [id],
    );

    return rows[0] as Ennemy;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from ennemy");
    return rows as Ennemy[];
  }
}

export default new EnnemyRepository();
