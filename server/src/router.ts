import express from "express";

const router = express.Router();

/* ************************************************************************* */
import authActions from "./modules/auth/authActions";

router.post("/api/login", authActions.login);
router.post("/api/logout", authActions.logout);
router.get("/api/me", authActions.requireAuth, authActions.me);

/* ************************************************************************* */
import accountActions from "./modules/account/accountActions";

router.get("/api/account", authActions.requireAuth, accountActions.browse);
router.get("/api/account/:id", authActions.requireAuth, accountActions.read);
router.post("/api/account", authActions.hashPassword, accountActions.add);

/* ************************************************************************* */
import ennemyActions from "./modules/ennemy/ennemyActions";

router.get("/api/ennemy", ennemyActions.browse);
router.get("/api/ennemy/:id", ennemyActions.read);

/* ************************************************************************* */
import progressActions from "./modules/progress/progressActions";

router.get(
  "/api/progress/:id",
  authActions.requireAuth,
  progressActions.read,
);
router.put(
  "/api/progress/:id",
  authActions.requireAuth,
  progressActions.edit,
);

export default router;
