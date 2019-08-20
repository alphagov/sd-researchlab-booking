export const bookingInfoLayout = (bookings) => {
  // get the number of bookings
  const numBookings = bookings.length;
  //  also need to sort the layout here 2 columns in each row
  // console.log('[numBookings]', numBookings);

  const numRows = Math.ceil(numBookings / 2);

  // console.log('[numRows]', numRows);

  let rowArray = new Array(numRows);

  for (let i = 0; i < numRows; i++) {
    rowArray[i] = [];
  }

  let h = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < 2; j++) {
      rowArray[i][j] = bookings[h++];
    }
  }

  return rowArray;
};
