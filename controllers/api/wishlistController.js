const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

/**
 * Post - Read All
 */
router.get("/", isAuthenticated, function (req, res) {
  db.Wishlist.findAll({
    include: {all: true, nested: true}
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get("/findWishlist/:UserId", function (req, res) {
  db.Wishlist.findAll({where: {UserId: req.params.UserId}, 
    include: { all: true, nested: true }})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Post - Read One
 */
router.get("/:id", isAuthenticated, function (req, res) {
  db.Wishlist.findById(req.params.id, {
    include: {all: true, nested: true}
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/** 
 * Post - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", isAuthenticated,  function (req, res) {
  if(req.user === null || req.user.id === null){
    res.status(401).json("NOT AUTHORIZED");
  }
  db.Wishlist.create({
    ...req.body,
    UserId: req.user.id

  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Post - Update
 */
router.put("/:id", isAuthenticated, function (req, res) {
  db.Wishlist.update(req.body, { where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Post - Delete
 */
router.delete("/:id", isAuthenticated, function (req, res) {
  db.Wishlist.destroy({ where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
