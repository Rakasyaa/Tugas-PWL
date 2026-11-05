import { Router } from "express";
import * as menuController from "../controllers/menu.controller.js";
import { cekApiKey } from "../middlewares/cekApiKey.js";
import { validate } from "../middlewares/validate.js";
import { menuSchema } from "../validators/menu.validator.js";

const router = Router();

router.get("/", menuController.getAllMenu);
router.get("/:id", menuController.getMenuById);
router.post("/", cekApiKey, validate(menuSchema), menuController.createMenu);
router.put("/:id", cekApiKey, validate(menuSchema), menuController.updateMenu);
router.delete("/:id", cekApiKey, menuController.deleteMenu);

export default router;
