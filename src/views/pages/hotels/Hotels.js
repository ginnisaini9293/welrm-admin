import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table'
// import 'react-table/react-table.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CCardFooter,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import api from 'src/utils/api'

const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [numRows, setNumRows] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [visible, setVisible] = useState(false)
  const getHotels = async () => {
    try {
      let { data } = await api.get('hotel', {
        params: {
          search,
          limit: 5,
          page: currentPage,
        },
      })

      console.log('..data', data.data.hotels.rows)

      setHotels(data.data.hotels.rows)
      setNumRows(data.data.hotels.numRows)
      setTotalPages(Math.ceil(data.data.hotels.totalCount / 5))
    } catch (error) {
      console.error('...Error in fetching hotels', error)
    }
  }

  useEffect(() => {
    getHotels()
  }, [search, currentPage])

  // const hotels = [
  //   {
  //     id: 1,
  //     hotel: 'Taj Hotel',
  //     owner: 'Raghav',
  //     contact: 8009510469,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 1,
  //   },
  //   {
  //     id: 2,
  //     hotel: 'Shiva Hotel',
  //     owner: 'Raghu Bhai',
  //     contact: 8574859623,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 1,
  //   },
  //   {
  //     id: 3,
  //     hotel: 'Jiva Restro',
  //     owner: 'Raghu Dada',
  //     contact: 5252565654,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 0,
  //   },
  //   {
  //     id: 4,
  //     hotel: 'Pink Hotel',
  //     owner: 'Raghav Seth',
  //     contact: 9955487522,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 1,
  //   },
  //   {
  //     id: 5,
  //     hotel: 'Brine Stay',
  //     owner: 'Santosh Mahajan',
  //     contact: 5649510469,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 1,
  //   },
  //   {
  //     id: 6,
  //     hotel: 'Tvf Nest',
  //     owner: 'Harmeet Singh',
  //     contact: 8006540469,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 0,
  //   },
  //   {
  //     id: 7,
  //     hotel: 'Gta Vega Hotel',
  //     owner: 'Hasina Bano',
  //     contact: 965510469,
  //     email: 'Raghav@gmail.com',
  //     is_approved: 1,
  //   },
  // ]

  const StaticBackdrop = () => {
    var btn_text = 'Approve'
    var is_approved = 0
    var alert_text = 'Are you aure, you want to approve this hotel?'
    if (is_approved == 1) {
      btn_text = 'Unapprove'
      alert_text = 'Are you aure, you want to unapprove this hotel?'
    } else {
      btn_text = 'Approve'
      alert_text = 'Are you aure, you want to approve this hotel?'
    }
    return (
      <>
        <CButton onClick={() => setVisible(!visible)}>{btn_text}</CButton>
        <CModal
          backdrop="static"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>Change Approval Status</CModalTitle>
          </CModalHeader>
          <CModalBody>{alert_text}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Table" href="components/table" />
      </CCol> */}

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={9}> </CCol>
              <CCol xs={3}>
                <div className="mb-1">
                  <CFormInput
                    type="text"
                    onClick={getHotels}
                    id="searchHotel"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                    }}
                  />
                </div>
              </CCol>
            </CRow>

            {/* <strong>React Table</strong> <small>Hoverable rows</small> */}
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Hotel</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {hotels.map((hotel) => (
                  <CTableRow key={hotel.id}>
                    <CTableHeaderCell scope="row">{hotel.id}</CTableHeaderCell>
                    <CTableDataCell>{hotel.hotelName}</CTableDataCell>
                    <CTableDataCell>{hotel.user.fullName}</CTableDataCell>
                    <CTableDataCell>{hotel.user.mobile}</CTableDataCell>
                    <CTableDataCell>{hotel.user.email}</CTableDataCell>
                    <CTableDataCell>{StaticBackdrop()}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
          <CCardFooter>
            <CCol xs={12}>
              <CPagination
                className="justify-content-end"
                aria-label="Page navigation example"
              >
                <CPaginationItem
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ cursor: 'pointer' }}
                >
                  Previous
                </CPaginationItem>
                {totalPages > 0 &&
                  Array(totalPages)
                    .fill(1)
                    .map((v, i) => (
                      <CPaginationItem
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        disabled={currentPage === i + 1}
                        style={{ cursor: 'pointer' }}
                      >
                        {i + 1}
                      </CPaginationItem>
                    ))}
                <CPaginationItem
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ cursor: 'pointer' }}
                >
                  Next
                </CPaginationItem>
              </CPagination>
            </CCol>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Hotels
