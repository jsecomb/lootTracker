import axios from 'axios';

// Export an object containing methods for gamesController
export default {
    searchTerms: function(query) {
      return axios.get(
        "https://store.steampowered.com/api/appdetails?appids=" +
          query
      );
    }
  };