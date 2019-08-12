export const bookingInfoLayout = (bookings) => {
  // get the number of bookings
  const numBookings = bookings.length;
  //  also need to sort the layout here 2 columns in each row
  const numRows = Math.ceil(numBookings / 2);

  let rowArray = new Array(numRows);

  for (let i = 0; i < numRows; i++) {
    rowArray[i] = [];
  }

  let h = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRows; j++) {
      rowArray[i][j] = bookings[h++];
    }
  }

  return rowArray;
};
