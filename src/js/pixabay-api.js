import axios from "axios";

const perPage = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get("https://pixabay.com/api/",{
      params: {
      key: "52810941-a867c2a4f7105994d43c555c3",
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
    return response.data;
    
  } catch (error) {
    console.log(error);
    return { hits: [], totalHits: 0 };
  }
}



