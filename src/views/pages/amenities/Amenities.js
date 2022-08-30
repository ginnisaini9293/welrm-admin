import { React, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './amenities.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import api from 'src/utils/api'
import { DocsCallout, DocsExample } from 'src/components'
import { array } from 'prop-types'

const Amenities = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [ToggleState, setToggleState] = useState(1)

  const [services, setServices] = useState([])
  let [rowCount, setRowCount] = useState(1)

  const getServices = async () => {
    try {
      let { data } = await api.get('hotel/amenities', {})

      // console.log('amenity', data.data.amenities)
      setServices(data.data.amenities)
      // setNumRows(data.data.hotels.numRows)
    } catch (error) {
      console.error('...Error in fetching services', error)
    }
  }

  useEffect(() => {
    getServices()
  }, [getServices])

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const getActiveClass = (index, className) => (ToggleState === index ? className : '')

  const tabContent = (name) => {
    return (
      <CRow>
        <CCol xs={12}>{/* <DocsCallout name="Form Select" href="forms/select" /> */}</CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Guest Popular</strong>
            </CCardHeader>
            <CCardBody>
              {/* Start */}
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {services
                    .filter((s) => s.type === name)
                    .map((guestservice, index) => (
                      <CTableRow key={guestservice.id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{guestservice.name}</CTableDataCell>

                        <CTableDataCell>
                          <CButton>Edit</CButton>
                          <CButton className="delete_service">Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>

              {/* End */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
  return (
    <div className="container">
      <ul className="tab-list">
        <li onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : 'inactive'}>
          Guest Popular
        </li>
        <li onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : 'inactive'}>
          Media Entertainment
        </li>
        <li onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active' : 'inactive'}>
          Room Features
        </li>
        <li onClick={() => setActiveTab(3)} className={activeTab === 3 ? 'active' : 'inactive'}>
          Bathrooms
        </li>
        <li onClick={() => setActiveTab(4)} className={activeTab === 4 ? 'active' : 'inactive'}>
          Others
        </li>
      </ul>
      <div>
        <div hidden={activeTab !== 0}>{tabContent('guest_popular')}</div>
        <div hidden={activeTab !== 1}>{tabContent('media_entertainment')}</div>
        <div hidden={activeTab !== 2}>{tabContent('room_features')}</div>
        <div hidden={activeTab !== 3}>{tabContent('bathrooms')}</div>
        <div hidden={activeTab !== 4}>{tabContent('others')}</div>
      </div>
    </div>
  )
}

export default Amenities
