const types = {
  PHOTO_QUANTITY: 'PHOTO_QUANTITY',
};

export const setPhotoQuantity = (numberOfPhotos) => {
  return { type: types.PHOTO_QUANTITY, photoQuantity: numberOfPhotos };
};
