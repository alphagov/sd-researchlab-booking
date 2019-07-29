import React from 'react';

const LabInfo = () => {
  return (
    <section>
      <h2 id="lab-facilities" className="govuk-heading-l align-left">
        Lab facilities
      </h2>
      <p className="govuk-body">
        You can{' '}
        <a
          href="https://gds.blog.gov.uk/2017/11/14/a-user-research-lab-for-all-of-government/"
          rel="external"
          className="govuk-link"
        >
          read about how we researched the lab and watch a video
        </a>
        .
      </p>
      <h3 className="govuk-heading-m align-left" id="research-rooms">
        Research rooms
      </h3>
      <p className="govuk-body">
        We have 2 large research rooms with separate interview and testing
        areas. Each research room has a dedicated observation room.
      </p>
      <p className="govuk-body">Both research rooms provide:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          Windows PC, Mac, Android and Apple mobile devices for usability
          testing
        </li>
        <li>
          4 pan-tilt-zoom ceiling mounted cameras for HD resolution video
          recording and streaming
        </li>
        <li>
          1 gooseneck camera to record participants and their use of assistive
          technologies
        </li>
        <li>
          wireless mics to capture high-quality sound, and allow communication
          between the research room and observation room
        </li>
        <li>a large foldable table for card sorting and similar activities</li>
        <li>
          the option of a Tobii eye tracker on the Windows PC in one research
          room
        </li>
      </ul>
      <h3 className="govuk-heading-m align-left" id="observation-rooms">
        Observation rooms
      </h3>
      <p className="govuk-body">
        Our observation rooms can hold 8 people comfortably, and a maximum of
        12.
      </p>
      <p className="govuk-body">
        The people in the observation rooms can start and stop recordings,
        choose what to record and move the ceiling cameras.
      </p>
      <h3 className="govuk-heading-m align-left" id="accessibility">
        Accessibility
      </h3>
      <p className="govuk body">
        Our labs have level access from street to lift and from lift to lab. And
        there is an accessible toilet close to the lab.
      </p>
      <p className="govuk body">
        Both research rooms have adjustable height desks, and one has an
        induction loop.
      </p>
      <p className="govuk body">
        Aldgate and Aldgate East tube stations are not wheelchair accessible.
        You may need to make alternative travel arrangements for some
        participants.
      </p>
      <h3 className="govuk-heading-m align-left" id="refreshments">
        Refreshments
      </h3>
      <p className="govuk-body">
        There is a water jug and 2 tumblers in each research room. The team
        using the lab will need to fill the jug in the morning, and wash, dry
        and return the tumblers at the end of the day.
      </p>
      <p className="govuk-body">
        There is also a coffee shop on the ground floor of the White Chapel
        Building.
      </p>
      <h2 className="govuk-heading-l align-left" id="opening-hours">
        Opening hours
      </h2>
      <p className="govuk-body">
        The lab is open from 9:00am to 5:30pm, Monday to Friday.
      </p>
      <p className="govuk-body">
        To allow time for setup and clear up, research sessions should not start
        before 9:30am or finish after 5:00pm.
      </p>
      <h3 className="govuk-heading-m align-left" id="visiting-the-lab">
        Visiting the lab
      </h3>
      <p className="govuk-body">
        Email{' '}
        <a
          href="mailto:userresearchlab@digital.cabinet-office.gov.uk"
          className="govuk-link"
        >
          userresearchlab@digital.cabinet-office.gov.uk
        </a>{' '}
        to arrange a visit or tour of the lab.
      </p>
    </section>
  );
};

export default LabInfo;
