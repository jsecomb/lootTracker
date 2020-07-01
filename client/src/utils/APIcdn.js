import axios from 'axios';

// Export an object containing methods for gamesController
export default {
    getGames: function(query) {
      return axios.get(
        "https://store.steampowered.com/api/appdetails?appids=" +
          query
      );
    }
  };