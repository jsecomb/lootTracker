const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

/**
 * Post - Read All
 */
router.get("/", isAuthenticated, function (req, res) {
  db.Game.findAll()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get("/findGame/:gameId", function (req, res) {
  db.Game.findAll({where: {linkOrId: req.params.gameId}})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});
  
/**
 * Get - Read One
 */
router.get("/:id", isAuthenticated, function (req, res) {
  db.Game.findByPk(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/** 
 * Post - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/",  function (req, res) {
  db.Game.create({
    ...req.body
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Post - Update
 */
router.put("/:id", isAuthenticated, function (req, res) {
  db.Game.update(req.body, { where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Post - Delete
 */
router.delete("/:id", isAuthenticated, function (req, res) {
  db.Game.destroy({ where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;