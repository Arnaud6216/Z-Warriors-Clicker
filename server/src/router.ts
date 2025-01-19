import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import accountActions from "./modules/account/accountActions";

router.get("/api/account", accountActions.browse);
router.get("/api/account/:id", accountActions.read);
router.post("/api/account", accountActions.add);

/* ************************************************************************* */
import ennemyActions from "./modules/ennemy/ennemyActions";

router.get("/api/ennemy", ennemyActions.browse);
router.get("/api/ennemy/:id", ennemyActions.read);

/* ************************************************************************* */
import progressActions from "./modules/progress/progressActions";

router.get("/api/progress", progressActions.browse);
router.get("/api/progress/:id", progressActions.read);

export default router;
