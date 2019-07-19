import React from 'react';

const BookingFormEquipment = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">
                What equipment will you need for your research session?
              </h2>
            </legend>
            <span id="waste-hint" className="govuk-hint">
              Select all that apply.
            </span>
            <div className="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id="waste-1"
                  name="waste"
                  type="checkbox"
                  value="carcasses"
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="waste-1"
                >
                  Waste from animal carcasses
                </label>
              </div>
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id="waste-2"
                  name="waste"
                  type="checkbox"
                  value="mines"
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="waste-2"
                >
                  Waste from mines or quarries
                </label>
              </div>
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id="waste-3"
                  name="waste"
                  type="checkbox"
                  value="farm"
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="waste-3"
                >
                  Farm or agricultural waste
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default BookingFormEquipment;
