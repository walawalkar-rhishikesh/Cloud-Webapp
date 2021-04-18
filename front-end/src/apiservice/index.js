import { apiClient } from "./axios";

export const signin = data => {
    return apiClient({
        method: "POST",
        url: `/users/login`,
        data,
    });
};

export const signup = (data) => {
    return apiClient({
      method: "POST",
      url: `/users/signup`,
      data,
    });
};

export const forgotPassword = (data) => {
  return apiClient({
    method: "POST",
    url: `/users/forgotPassword`,
    data,
  });
};

export const update = (data) => {
    return apiClient({
      method: "POST",
      url: `/users/update`,
      data,
    });
};

export const updatePassword = (data) => {
    return apiClient({
      method: "POST",
      url: `/users/updatepassword`,
      data,
    });
};

export const getBuyerBooks = (data) => {
  return apiClient({
    method: "POST",
    url: `/books/findNotFor`,
    data,
  });
};

export const getSellersBooks = (data) => {
  return apiClient({
    method: "POST",
    url: `/books/findFor`,
    data,
  });
};

export const addNewBook = (data) => {
  return apiClient({
    method: "POST",
    url: `/books/create`,
    data,
  });
};

export const deleteBook = (data) => {
  return apiClient({
    method: "POST",
    url: `/books/delete`,
    data,
  });
};

export const deleteBookFromS3 = (data) => {
  return apiClient({
    method: "POST",
    url: `/bookimages/removeImagesOnBookDelete`,
    data,
  });
};

export const deleteBookDetailsFromDB = (data) => {
  return apiClient({
    method: "POST",
    url: `/bookimages/removeImageDataOnBookDelete`,
    data,
  });
};

export const updateBook = (data) => {
  return apiClient({
    method: "POST",
    url: `/books/update`,
    data,
  });
};

export const addBookToCart = (data) => {
  return apiClient({
    method: "POST",
    url: `/carts/add`,
    data,
  });
};

export const getUserCart = (data) => {
  return apiClient({
    method: "POST",
    url: `/carts/find`,
    data,
  });
};

export const deleteCartItem = (data) => {
  return apiClient({
    method: "POST",
    url: `/carts/delete`,
    data,
  });
};

export const uploadFilesToS3 = (data) => {
  return apiClient({
    method: "POST",
    url: `/bookimages/uploadS3Image`,
    data,
  });
};

export const addImageDetailsToDB = (data) => {
  return apiClient({
    method: "POST",
    url: `/bookimages/createBulk`,
    data,
  });
};

export const removeImageFromS3 = (data) => {
  return apiClient({
    method: "POST",
    url: `/bookimages/removeFromS3`,
    data,
  });
};

export const removeImageFromDatabase = (data) => {
  return apiClient({
    method: "POST",
    url: `/bookimages/deleteBookImage`,
    data,
  });
};