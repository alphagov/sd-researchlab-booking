import React, { useContext } from 'react';
import { navigate } from '@reach/router';

import { useForm } from '../../hooks/useForm';
import { BookingContext } from '../../contexts/BookingContext';

const initialState = {
  iphone8: { value: false },
  ipad2: { value: false },
  androidPhone: { value: false },
  appleMac: { value: false },
  windowsPC: { value: false },
  clickShare: { value: false },
  talkBackMic: { value: false }
};

const BookingFormEquipment = () => {
  const [values, validateInputs, handleChange] = useForm(initialState);
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

  const handleSubmit = (event) => {
    event.preventDefault();
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
