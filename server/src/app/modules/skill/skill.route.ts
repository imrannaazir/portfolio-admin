import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createBulkSkillsValidationSchema,
  createSingleSkillValidationSchema,
} from "./skill.validation";
import SkillController from "./skill.controller";

const router = Router();

// create bulk skills : POST
router.post(
  "/bulk-create",
  validateRequest(createBulkSkillsValidationSchema),
  SkillController.createBulkSkill
);

// create single skill : POST
router.post(
  "/create",
  validateRequest(createSingleSkillValidationSchema),
  SkillController.createSingleSkill
);

// get all skills : GET
router.get("/get-all", SkillController.getAllSkills);

const SkillRoutes = router;
export default SkillRoutes;
