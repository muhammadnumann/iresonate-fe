import React from 'react'
import Head from 'next/head'
// Component
import { WSCol, WSInput, WSPassword, WSRow, WSSelect, WSTitle } from 'src/component/common'
import Autocomplete from "react-google-autocomplete";
// Constants
import { formLabelName, stepFormDetails, } from 'src/utils/enums'
// Style
import './personalDetails.less'
import { titleCorporate } from 'src/utils/staticData'


const DonorForm = ({ value, setFieldValue, city, setCity, state, setState, country, setCountry, postalCode, setPostalCode, address, setAddress
}) => {

  const GOOGLE_MAPS_API_KEY = 'AIzaSyAMx6kmnFsqri_hu_V-2uUbw3gQwMqlwYc';

  const AddressHandle = (data) => {
    setAddress(data.formatted_address);
    data.address_components.forEach((val) => {
      if (val.types.includes('postal_code')) {
        setPostalCode(val.long_name);
      }
      else if (val.types.includes("administrative_area_level_2")) {
        setCity(val.long_name);
      }
      else if (val.types.includes("administrative_area_level_1")) {
        setState(val.long_name);
      }
      else if (val.types.includes("country")) {
        setCountry(val.long_name);
      }

    })

  }
  return (
    <>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMx6kmnFsqri_hu_V-2uUbw3gQwMqlwYc&libraries=places"></script>

      </Head>
      <div className='web-host-corporate-main-details'>
        <WSTitle level={2} className='details-title'>
          {stepFormDetails.step1DonorDetailsDetails}
        </WSTitle>
        <p className='content'>
          {stepFormDetails.webHostContent}
        </p>
        <div className='web-host-corporate-main-form mb-4'>
          <WSRow>
            <WSCol xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <label className="form-label">{formLabelName.firstTitle}</label>
              <div className='title-select-main'>
                <WSSelect
                  data={titleCorporate}
                  name="firstTitle"
                  className="mb-5"
                  value={value}
                  onSelectItem={(value: string) => {
                    setFieldValue(value)
                  }}
                />

              </div>
            </WSCol>

            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <WSRow>
                <WSCol span={24} className="p-0"><label className="form-label">{formLabelName.name}</label></WSCol>
                <WSCol className="p-0" xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <WSInput name="firstNameCorporate" placeholder={formLabelName.firstName} className="form-control" />
                </WSCol>
                <WSCol className="pe-0 ps-0 ps-md-3" xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <WSInput name="lastNameCorporate" placeholder={formLabelName.lastName} className="form-control" />
                </WSCol>
              </WSRow>
            </WSCol>

            <WSCol xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <label className='form-label'>{formLabelName.primaryTelephoneNumber}</label>
              <WSInput
                  name='telephoneNumberCorporate'
                  placeholder={formLabelName.enterTelephoneNumber}
                  className='form-control'
              />
            </WSCol>
          </WSRow>

          <WSRow>

            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.streetAddress}</label>

              <Autocomplete
                placeholder={formLabelName.streetAddress}
                className='form-control'
                apiKey={GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => AddressHandle(place)}
                options={{
                  types: ["geocode", "establishment"],
                }}
                defaultValue=""
              />
            </WSCol>
          </WSRow>

          <WSRow>

            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <WSRow>
                <WSCol className="ps-0" xs={24} sm={24} md={12}>
                  <label className="form-label">{formLabelName.city}</label>
                  <WSInput name="cityCorporate" placeholder={formLabelName.city} value={city} className="form-control" onChange={(e) => {
                    setCity(e.target.value);
                  }} />
                </WSCol>
                <WSCol className="p-0" xs={24} sm={24} md={12} >
                  <label className="form-label">{formLabelName.state}</label>
                  <WSInput name="stateCorporate" placeholder={formLabelName.state} value={state} className="form-control" onChange={(e) => {
                    setState(e.target.value);
                  }} />
                </WSCol>
              </WSRow>
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <WSRow>
                <WSCol className="ps-0" xs={24} sm={24} md={12} >
                  <label className="form-label">{formLabelName.postalCode}</label>
                  <WSInput name="postalCodeCorporate" type='text' placeholder={formLabelName.postalCode} value={postalCode} className="form-control" onChange={(e) => {
                    setPostalCode(e.target.value);
                  }} />
                </WSCol>
                <WSCol className="p-0" xs={24} sm={24} md={12} >
                  <label className="form-label">{formLabelName.country}</label>
                  <WSInput name="countryCorporate" type='text' placeholder={formLabelName.country} value={country} className="form-control" onChange={(e) => {
                    setCountry(e.target.value);
                  }} />
                </WSCol>
              </WSRow>
            </WSCol>
          </WSRow>

          <WSRow>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.eMailAddress}</label>
              <WSInput
                name='emailCorporate'
                placeholder={formLabelName.enterEmailAddress}
                className='form-control'
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <label className='form-label'>{formLabelName.password}</label>
              <WSPassword
                name='passwordCorporate'
                placeholder={formLabelName.enterPassword}
                className='form-control d-flex'
              />
            </WSCol>
          </WSRow>
        </div>
      </div>
    </>
  )
}


export default DonorForm
