const express = require("express");

const routes = express.Router();

const UserController = require("./controllers/UserController");
const TypeController = require("./controllers/TypeController");
const TypeMovementController = require("./controllers/TypeMovementController");
const DepartmentController = require("./controllers/DepartmentController");
const HardwareController = require("./controllers/HardwareController");
const MovementController = require("./controllers/MovementController");
const LoginController = require("./controllers/LoginController");
const RoleController = require("./controllers/RoleController");

routes.get("/users", UserController.listAllUsers);
routes.get("/users/:user_id", UserController.listUser);
routes.post("/users", UserController.create);
routes.put("/users/:user_id", UserController.update);
routes.put("/users/:user_id/password", UserController.updatePassword);
routes.delete("/users/:user_id", UserController.delete);

routes.get("/types", TypeController.listAllTypes);
routes.get("/types/:type_id", TypeController.listType);
routes.get("/types/category_name/:name", TypeController.listTypeByName);
routes.get("/types/verify_name/:name", TypeController.nameExists);
routes.post("/types", TypeController.create);
routes.put("/types/:type_id", TypeController.update);
routes.delete("/types/:type_id", TypeController.delete);

routes.get("/type_movements", TypeMovementController.listAllTypeMovement);
routes.get("/type_movements/:type_movement_id", TypeMovementController.listTypeMovement);
routes.get("/type_movements/type_movements_description/:description", TypeMovementController.listTypeMovementByDescription);
routes.get("/type_movements/verify_description/:description", TypeMovementController.nameExists);
routes.post("/type_movements", TypeMovementController.create);
routes.put("/type_movements/:type_movement_id", TypeMovementController.update);
routes.delete("/type_movements/:type_movement_id", TypeMovementController.delete);

routes.get("/roles", RoleController.listAllRoles);
routes.get("/roles/:role_id", RoleController.listRole);
routes.get("/roles/role_name/:name", RoleController.listRoleByName);
routes.get("/roles/verify_name/:name", RoleController.nameExists);
routes.post("/roles", RoleController.create);
routes.put("/roles/:role_id", RoleController.update);
routes.delete("/roles/:role_id", RoleController.delete);

routes.get("/departments", DepartmentController.listAllDepartments);
routes.get("/departments/id/:department_id", DepartmentController.listDepartment);
routes.get("/departments/name/:department_name", DepartmentController.listDepartmentByName);
routes.get("/departments/verify_name/:name", DepartmentController.nameExists);
routes.post("/departments", DepartmentController.create);
routes.put("/departments/update/:department_id", DepartmentController.update);
routes.delete("/departments/delete/:department_id", DepartmentController.delete);

routes.get("/hardwares/:limit/:offset/filters", HardwareController.listAllDetailedHardwares);
routes.get("/hardwares", HardwareController.listAllHardwares);
routes.get("/hardwares/description/:description", HardwareController.listAllHardwaresByDescription);
routes.get("/hardwares/category/:name_category/:limit/:offset", HardwareController.listAllHardwaresByCategory);
routes.get("/hardwares/code/:code", HardwareController.listHardwareByCode);
routes.get("/hardwares/department/:department_id", HardwareController.listHardwareByDepartment);
routes.get("/hardwares/department/:department_name/:limit/:offset", HardwareController.listHardwareByDepartmentName);
routes.get("/hardwares/:hardware_id", HardwareController.listHardwareById);
routes.post("/:type_id/hardwares", HardwareController.create);
routes.put("/hardwares/:hardware_id", HardwareController.update);
routes.delete("/hardwares/:hardware_id", HardwareController.delete);

routes.get("/movements/:movement_id", MovementController.listMovementById);
routes.get("/movements/detailed/:limit/:offset", MovementController.listAllMovements);
routes.get("/movements/data/:date_movement", MovementController.listAllMovementsByData);
routes.get("/movements/code/:code", MovementController.listAllMovementsByHeritage);
routes.get("/movements/:limit/:offset/filters", MovementController.listAllMovementsByAdvancedSearch);
routes.post("/movements", MovementController.create);
routes.put("/movements/:movement_id", MovementController.update);
routes.delete("/movements/:movement_id", MovementController.delete);

routes.post("/login/verify/", LoginController.loginAuth);

module.exports = routes;