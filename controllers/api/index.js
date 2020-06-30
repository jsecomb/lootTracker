const router = require("express").Router();
// Import our controllers
const wishlistRoutes = require("./wishlistController");
const userRoutes = require("./usersController");
const wishlistItemRoutes = require("./wishlistItemController");
const gameRoutes = require("./gameController");

// Hook up to the router
router.use("/wishlists", wishlistRoutes);
router.use("/users", userRoutes);
router.use("/wishlistItems", wishlistItemRoutes);
router.use("/games", gameRoutes);

// Export the router
module.exports = router;
