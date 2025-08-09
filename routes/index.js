const router = require("express").Router();
const userRouter = require("./users");
const itemsRouter = require("./clothingItems");
const serverStatuses = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");

const { validateUser, validateAuth } = require("../middlewares/validation");

router.post("/signin", validateAuth, login);
router.post("/signup", validateUser, createUser);

router.use("/users", userRouter);
router.use("/items", itemsRouter);

router.use("*", (_, res) => {
  throw new NotFoundError("Requested resource not found");
});

module.exports = router;
