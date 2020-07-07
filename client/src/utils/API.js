import axios from "axios";

/* Routes to MySql2 Database
/**
 * Private function to get all of an entity
 * @param {String} entity API Path/Entity 
 */
function _getAll(entity, query=""){
    return axios.get(`/api/${entity}/?${query}`);
}

/**
 * Private function to get a single entity by id
 * @param {String} entity API Path/Entity 
 * @param {Integer} id Id to find by
 */
function _getOne(entity, id){
    return axios.get(`/api/${entity}/${id}`);
}

/**
 * Private function to delete a single entity by id
 * @param {String} entity API Path/Entity 
 * @param {Integer} id Id to delete
 */
function _delete(entity, id){
    return axios.delete(`/api/${entity}/${id}`);
}

/**
 * Private function to create a single entity
 * @param {String} entity entity API Path/Entity 
 * @param {Object} data data to create an entity by
 */
function _create(entity, data){
    return axios.post(`/api/${entity}/`, data);
}

/**
 * Private function to update a single entity
 * @param {String} entity entity API Path/Entity 
 * @param {Integer} id Id of the entity
 * @param {Object} data data to update an entity by
 */
function _update(id, entity, data){
    return axios.post(`/api/${entity}/${id}`, data);
}

//** authorization routes for login and signup and routes for models */
export default {
    Auth: {
        login: function(data){
            return axios.post("/auth/login", data)
        },
        signup: function(data){
            return axios.post("/auth/signup", data)
        },
        logout: function(){
            return axios.get("/auth/logout");
        },
        user_data: function(){
            return axios.get("/auth/user_data");
        }
    },
    User: {
        getAll: function (query = "") {
            return _getAll("users", query);
        },
        getById: function (id) {
            return _getOne("users", id);
        },
        delete: function (id) {
            return _delete("users", id);
        },
        create: function(data){
            return _create("users", data);
        },
        update: function(id, data){
            return _update("users", id, data);
        }
    },
    Wishlist:{
        getAll: function (query = "") {
            return _getAll("wishlists", query);
        },
        getAllByUserId: function (query) {
            return axios.get(`/api/wishlists/findWishlist/${query}`);
        },
        getById: function (id) {
            return _getOne("wishlists", id);
        },
        delete: function (id) {
            return _delete("wishlists", id);
        },
        create: function(data){
            return _create("wishlists", data);
        },
        update: function(id, data){
            return _update("wishlists", id, data);
        }
    },
    WishlistItem: {
        getAll: function (query = "") {
            return _getAll("wishlistitems", query);
        },
        getAllByWishlistId: function (query) {
            return axios.get(`/api/wishlistitems/findWishlistItem/${query}`);
        },
        getById: function (id) {
            return _getOne("wishlistitems", id);
        },
        delete: function (id) {
            return _delete("wishlistitems", id);
        },
        create: function(data){
            return _create("wishlistitems", data);
        },
        update: function(id, data){
            return _update("wishlistitems", id, data);
        }
    },
    Game: {
        getAll: function (query = "") {
            return _getAll("games", query);
        },
        getAllByName: function (query) {
            return axios.get(`/api/games/findGame/${query}`);
        },
        getById: function (id) {
            return _getOne("games", id);
        },
        delete: function (id) {
            return _delete("games", id);
        },
        create: function(data){
            return _create("games", data);
        },
        update: function(id, data){
            return _update("games", id, data);
        }
    }
}