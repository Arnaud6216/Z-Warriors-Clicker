import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import accountActions from "./modules/account/accountActions";

router.get("/api/account", accountActions.browse);
router.get("/api/account/:id", accountActions.read);
router.post("/api/account", authActions.hashPassword, accountActions.add);

/* ************************************************************************* */
import ennemyActions from "./modules/ennemy/ennemyActions";

router.get("/api/ennemy", ennemyActions.browse);
router.get("/api/ennemy/:id", ennemyActions.read);

/* ************************************************************************* */
import progressActions from "./modules/progress/progressActions";

router.get("/api/progress", progressActions.browse);
router.get("/api/progress/:id", progressActions.read);
router.get("/api/progress/:id", progressActions.edit);
/* ************************************************************************* */
import authActions from "./modules/auth/authActions";

router.post("/api/login", authActions.login);

export default router;
