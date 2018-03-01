const photoQuantity = (state = null, action) => {
  const { type, photoQuantity } = action;
  switch (type) {
    case 'PHOTO_QUANTITY':
      return photoQuantity;
    default:
      return state;
  }
};

export default photoQuantity;
