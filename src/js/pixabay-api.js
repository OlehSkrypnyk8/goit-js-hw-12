import axios from "axios";

export function getImagesByQuery(query) {
  return axios.get("https://pixabay.com/api/", {
    params: {
      key: "52810941-a867c2a4f7105994d43c555c3",
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    }
  })
    .then(response => response.data.hits)
    .catch(error => {
      console.log(error);
      return [];
    });
}


