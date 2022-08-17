import { React, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import api from 'src/utils/api'
import { DocsCallout, DocsExample } from 'src/components'

const GuestPopular = () => {
  const [services, setServices] = useState([])
  let [rowCount, setRowCount] = useState(1)

  const getServices = async () => {
    try {
      let { data } = await api.get('hotel/amenities/guest_popular', {
        // params: {
        //   type: 'guest_popular',
        // },
      })

      console.log('amenity', data.data.amenities)
      setServices(data.data.amenities)
      // setNumRows(data.data.hotels.numRows)
    } catch (error) {
      console.error('...Error in fetching hotels', error)
    }
  }

  useEffect(() => {
    getServices()
  }, [getServices])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Popular with Guest</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {services.map((guestservice) => (
                  <CTableRow key={guestservice.id}>
                    <CTableHeaderCell scope="row">{rowCount++}</CTableHeaderCell>
                    <CTableDataCell>{guestservice.name}</CTableDataCell>

                    <CTableDataCell>
                      <CButton>Edit</CButton>
                      <CButton className="delete_service">Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GuestPopular
