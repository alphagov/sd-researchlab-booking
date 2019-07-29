import React, { useContext, useState } from 'react';
import { navigate } from '@reach/router';

import { BookingContext } from '../../contexts/BookingContext';

const initialState = {
  iphone8: { value: false, name: 'Apple iPhone 8' },
  ipad2: { value: false, name: 'Apple iPad 2' },
  androidPhone: { value: false, name: 'Android Phone' },
  appleMac: { value: false, name: 'Apple Mac' },
  windowsPC: { value: false, name: 'Microsoft Windows PC' },
  clickShare: { value: false, name: 'Click Share' },
  talkBackMic: { value: false, name: 'Talk Back Microphone' }
};

const BookingFormEquipment = () => {
  const [values, setValues] = useState(initialState);
  const [bookingValues, setBookingValues] = useContext(BookingContext);

  const {
    iphone8,
    androidPhone,
    ipad2,
    appleMac,
    windowsPC,
    clickShare,
    talkBackMic
  } = values;

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setValues({
      ...values,
      [name]: {
        value: checked,
        name: values[name].name
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //  no verification is needed and no error checking is required
    let equipArray = [];
    for (let key in values) {
      if (values[key].value) {
        equipArray.push(values[key].name);
      }
    }
    // console.log(equipArray);
    setBookingValues({
      ...bookingValues,
      bookedEquipment: equipArray
    });

    navigate('/book-a-research-lab/booking-summary');
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h2 className="govuk-fieldset__heading">
                  What equipment will you need for your research session?
                </h2>
              </legend>
              <span id="equipment-hint" className="govuk-hint">
                Select all that apply.
              </span>
              <div className="govuk-checkboxes">
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="iphone8"
                    name="iphone8"
                    type="checkbox"
                    value={iphone8.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="iphone8"
                  >
                    Apple iPhone 8
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="androidPhone"
                    name="androidPhone"
                    type="checkbox"
                    value={androidPhone.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="androidPhone"
                  >
                    Android Phone
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="ipad2"
                    name="ipad2"
                    type="checkbox"
                    value={ipad2.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="ipad2"
                  >
                    Apple iPad 2
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="appleMac"
                    name="appleMac"
                    type="checkbox"
                    value={appleMac.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="appleMac"
                  >
                    Apple Mac
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="windowsPC"
                    name="windowsPC"
                    type="checkbox"
                    value={windowsPC.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="windowsPC"
                  >
                    Microsoft Windows PC
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="clickShare"
                    name="clickShare"
                    type="checkbox"
                    value={clickShare.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="clickShare"
                  >
                    Click Share (screen mirroring)
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="talkBackMic"
                    name="talkBackMic"
                    type="checkbox"
                    value={talkBackMic.value}
                    onChange={handleChange}
                  />
                  <label
                    className="govuk-label govuk-checkboxes__label"
                    htmlFor="talkBackMic"
                  >
                    Talk Back Microphone (to communicate between rooms)
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <button type="submit" className="govuk-button">
            Save and continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormEquipment;
