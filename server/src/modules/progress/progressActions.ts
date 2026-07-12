import type { RequestHandler } from "express";

import progressRepository from "./progressRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    if (req.user?.id !== userId) {
      res.sendStatus(403);
      return;
    }

    const progress = await progressRepository.read(userId);

    if (progress == null) {
      res.sendStatus(404);
    } else {
      res.json(progress);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id); // Récupération du userId via params
    const { ennemy_id } = req.body; // Récupération de l'ennemi depuis le body

    if (req.user?.id !== userId) {
      res.sendStatus(403);
      return;
    }

    if (!ennemy_id) {
      res.status(400).json({ error: "L'ennemi ID est requis." });
      return;
    }

    const updatedProgress = await progressRepository.edit(userId, ennemy_id);

    if (!updatedProgress) {
      res.status(404).json({ error: "Progression non trouvée." });
      return;
    }

    res.status(200).json(updatedProgress);
  } catch (error) {
    next(error);
  }
};
export default { read, edit };
