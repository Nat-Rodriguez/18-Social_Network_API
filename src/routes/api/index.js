const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const dateFormat = require("../../../utils/dateFormat")


router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;