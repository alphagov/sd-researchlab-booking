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
        labEmail: labs[i].resourceEmail,
        start: busy.start,
        end: busy.end
      };
    });
    busyArray = [...busyArray, ...bArray];
  }

  return busyArray;
};
