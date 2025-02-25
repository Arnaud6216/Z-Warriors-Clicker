import type { RequestHandler } from "express";

import ennemyRepository from "./ennemyRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const ennemy = await ennemyRepository.readAll();

    res.json(ennemy);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const ennemyId = Number(req.params.id);
    const ennemy = await ennemyRepository.read(ennemyId);

    if (ennemy == null) {
      res.sendStatus(404);
    } else {
      res.json(ennemy);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
