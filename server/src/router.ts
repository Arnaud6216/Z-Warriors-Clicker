import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/accountActions";

router.get("/api/account", itemActions.browse);
router.get("/api/account/:id", itemActions.read);
router.post("/api/account", itemActions.add);

/* ************************************************************************* */

export default router;
