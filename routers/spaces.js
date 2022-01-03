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

router.delete("/stories/:id", async (req, res, next) => {
  try {
    console.log("We are in the route!");
    const storyId = req.params.id;

    const story = await Story.findByPk(storyId);

    if (!story) {
      return res.status(404).send("story doesn't exist");
    }

    await story.destroy();
    console.log("We deleted the story!");
    res.send(`Story ${storyId} deleted`);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
