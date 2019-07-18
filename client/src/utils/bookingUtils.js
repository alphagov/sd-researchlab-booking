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
  const bookedLabsArray = bookedLabs.map((lab) => lab.resourceEmail);
  const numLabs = resLabsArray.length;
  const numBookedLabs = bookedLabsArray.length;

  if (numBookedLabs < numLabs) {
    // get an array of distinct labs
    const availLabs = await resLabsArray.filter(
      (lab) => !bookedLabsArray.includes(lab)
    );
    // console.log(availLabs);
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

  // first check booked dates to see if there is an availabale slot
  let availBookedSlot = [];

  if (bookedAM) {
    availBookedSlot = await bookedLabs.filter(
      (lab) => dateFns.getHours(lab.end) > 13
    );
  } else {
    availBookedSlot = await bookedLabs.filter(
      (lab) => dateFns.getHours(lab.end) < 13
    );
  }
  // console.log(availBookedSlot);

  // if there are slots available take the first one
  if (availBookedSlot.length > 0) {
    return { available: true, resourceEmail: availBookedSlot[0].resourceEmail };
  }
  // if there arew no avail booked slots are there any free labs?
  if (availBookedSlot.length === 0 && numBookedLabs < numLabs) {
    const availLabs = await resLabsArray.filter(
      (lab) => !bookedLabsArray.includes(lab)
    );
    return { available: true, resourceEmail: availLabs[0] };
  }

  return { available: false, resourceEmail: '' };
};
