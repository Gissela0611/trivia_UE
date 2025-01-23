const { Router } = require("express");
const { checkAuth } = require("../middlewares/auth");
const { checkRoleAuth } = require("../middlewares/roleAuth");
const {
  getIncidenc,
  getIncidencById,
  createIncidenc,
  
  editIncidenc,
  deleteIncidenc
} = require("../controllers/incidents.controllers");

const router = Router();

//---------rutas InciSoluc---------
// crear InciSoluc
router.post("/crear", checkAuth, checkRoleAuth([1]), createIncidenc);
//listado InciSoluc
router.get("/", checkAuth, checkRoleAuth([1]), getIncidenc);
//listar InciSoluc por Id
router.get("/:id", checkAuth, checkRoleAuth([1]),  getIncidencById);
//actualizar InciSoluc
router.put("/actualizar/:id", checkAuth, checkRoleAuth([1]), editIncidenc);
//eliminar InciSoluc
router.delete("/eliminar/:id", checkAuth, checkRoleAuth([1]),  deleteIncidenc);

module.exports = router;
