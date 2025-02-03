import type { RequestHandler } from "express";

import progressRepository from "./progressRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const progress = await progressRepository.readAll();

    res.json(progress);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
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
      const { userId, ennemyId } = req.body;
      const updatedProgress = await progressRepository.edit(userId, ennemyId);
      res.status(200).json(updatedProgress);
    } catch (error) {
      next(error);
    }
  } 

export default { browse, read, edit };
