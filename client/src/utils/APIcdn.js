import axios from "axios";

/* Routes to external CDN --- need to confirm when we access page from appgit */ 
export default {
    searchTerms: function(query) {
      return axios.get(
        "https://store.steampowered.com/api/appdetails?appids=" +
          query
      );
    }
  };
