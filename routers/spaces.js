const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (e) {
    next(e);
  }
});

router.get("/:spaceId", async (req, res, next) => {
  try {
    const spaceId = req.params.spaceId;
    const spaces = await Space.findByPk(spaceId, { include: [Story] });
    res.send(spaces);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
