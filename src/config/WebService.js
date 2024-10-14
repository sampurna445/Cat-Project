export const kApiUrl = "https://api.thecatapi.com";

export const API = "/v1";

export const kApiUploadImage = `${API}/images/upload`;
export const kApiCatImages = `${API}/images?limit=30`;
export const kApiPostFav = `${API}/favourites`;
export const kApiDelFav = (favId) => {
  return `${API}/favourites/${favId}`;
};
export const kApiGetFav = `${API}/favourites`;

export const kApiGetVotes = `${API}/votes`;
export const kApiPostVote = `${API}/votes`;
export const kApiDelVote = (voteId) => {
  return `${API}/vote/${voteId}`;
};

export const ERROR_NETWORK_NOT_AVAILABLE = {
  title: "Oops!",
  message:
    "Slow or no internet connection. Please check your internet settings",
};
