import dateFns from 'date-fns';

export const checkClashDates = async (labs, details) => {
  // need to select a date based on the included diagram
  const { bookedDate } = details;
  //   get an array of busy days
  const busyDays = await buildFreeBusy(labs);

  let clashDates = await busyDays.filter((bDay) =>
    dateFns.isSameDay(bDay.start, bookedDate)
  );

  return clashDates;
};

export const buildFreeBusy = (labs) => {
  const numLabs = labs.length;
  let busyArray = [];

  for (let i = 0; i < numLabs; i++) {
    const bArray = labs[i].freeBusy.map((busy) => {
      return {
        resourceEmail: labs[i].resourceEmail,
        start: busy.start,
        end: busy.end
      };
    });
    busyArray = [...busyArray, ...bArray];
  }
  console.log('busyArray', busyArray);
  return busyArray;
};

// this will only return a true or false with a lab email
// reason being we will need to check again
// on the summary page just in case another booking is made
export const checkBookingSlots = async (booking) => {
  // console.log(booking);
  const { bookedAM, bookedPM } = booking;

  // if it is an all day booking
  if (bookedAM && bookedPM) {
    const fullDay = await checkAllDayBookings(booking);
    return fullDay;
  } else {
    const partDay = await checkPartDayBookings(booking);
    // console.log('part day', partDay);
    return partDay;
  }
};

const checkAllDayBookings = async (booking) => {
  // all day bookings
  const { researchLabs, bookedLabs } = booking;
  const resLabsArray = researchLabs.map((lab) => lab.resourceEmail);
  // this needs to be a distinct list/array as we are not interested in am/pm
  // just how many labs have a booking because regardless of whether it is a
  // full/partial day it cannot accomodate a full day booking
  const bookedLabsArray = [
    ...new Set(bookedLabs.map((lab) => lab.resourceEmail))
  ];
  const numLabs = resLabsArray.length;
  const numBookedLabs = bookedLabsArray.length;

  if (numBookedLabs < numLabs) {
    // get an array of distinct labs to book
    const availLabs = await resLabsArray.filter(
      (lab) => !bookedLabsArray.includes(lab)
    );
    // just return the first available in the array
    return { available: true, resourceEmail: availLabs[0] };
  }

  return { available: false, resourceEmail: '' };
};

const checkPartDayBookings = async (booking) => {
  // part day bookings
  const { bookedAM, bookedLabs, researchLabs } = booking;

  const resLabsArray = researchLabs.map((lab) => lab.resourceEmail);
  const bookedLabsArray = bookedLabs.map((lab) => lab.resourceEmail);
  const numLabs = resLabsArray.length;
  const numBookedLabs = bookedLabsArray.length;

  // the logic for this: AM
  // if the booked labs array length is 0 book first lab in
  // reslabs array

  // if the booked labs array length is greater than 1
  // filter  all bookings that have 8 start (this includes all day bookings)
  // remove from reslabs arrray (and booked labs array?)
  // next need to fit in with any pm bookings to be efficient.
  // so look through the booked labs array and return any labs with start day = 12
  // book on the first in array
  // if none simply book on the first lab in reslabs array
  // this should be the same for PM with some slight differences

  // If there are no booked labs
  if (numBookedLabs === 0) {
    return {
      available: true,
      resourceEmail: resLabsArray[0]
    };
  }

  // if there is more than one booked lab

  let slotStarts = [];

  if (bookedAM) {
    // filter  the 8am starts from the booked labs array
    slotStarts = bookedLabs.filter(
      (bookedLab) => dateFns.getHours(bookedLab.start) === 8
    );
  } else {
    slotStarts = bookedLabs.filter(
      (bookedLab) => dateFns.getHours(bookedLab.end) === 17
    );
  }

  // console.log('8 starts', eightStarts);

  // if 8 starts length = number of reslabs return false
  if (slotStarts.length === numLabs) {
    return {
      available: false,
      resourceEmail: ''
    };
  }

  // remove these 8 starts from the booked labs array
  // push the other booked labs (will be pm bookings into and array)
  let availBookedSlot = [];

  for (let i = 0; i < slotStarts.length; i++) {
    availBookedSlot.push(
      bookedLabs.filter(
        (bookedLab) => bookedLab.resourceEmail !== slotStarts[i].resourceEmail
      )
    );
  }

  // console.log('availBookedSlots', availBookedSlot.flat().length);

  // if there is a list of booked labs available
  // select the first one in the booked list
  if (availBookedSlot.flat().length > 0) {
    // console.log(availBookedSlot.flat()[0]);
    return {
      available: true,
      resourceEmail: availBookedSlot.flat()[0].resourceEmail
    };
  }

  // if no booked slots available
  // remove 8 starts from the res labs array and book first one

  let availResLabs = [];

  for (let i = 0; i < slotStarts.length; i++) {
    availResLabs.push(
      resLabsArray.filter((resLab) => resLab !== slotStarts[i].resourceEmail)
    );
  }

  console.log('res', availResLabs.flat()[0]);

  return {
    available: true,
    resourceEmail: availResLabs.flat()[0]
  };
};
