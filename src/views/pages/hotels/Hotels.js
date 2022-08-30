import React, { useCallback, useEffect, useState } from 'react'
import {
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
  CSpinner,
} from '@coreui/react'
import api from 'src/utils/api'

const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // const [numRows, setNumRows] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  // const [alertText, setalertText] = useState('')
  const [approveModalId, setApproveModalId] = useState(null)
  const [disapproveModalId, setDisapproveModalId] = useState(null)
  const [processingId, setProcessingId] = useState(null)

  const getHotels = useCallback(async (search, currentPage) => {
    try {
      let { data } = await api.get('admin/hotel', {
        params: {
          search,
          limit: 10,
          page: currentPage,
        },
      })

      console.log('..data', data.data.hotels.rows)

      setHotels(data.data.hotels.rows)
      // setNumRows(data.data.hotels.numRows)
      setTotalPages(Math.ceil(data.data.hotels.totalCount / 5))
    } catch (error) {
      console.error('...Error in fetching hotels', error)
    }
  }, [])

  useEffect(() => {
    getHotels(search, currentPage)
  }, [search, currentPage, getHotels])

  const changeStatus = useCallback(
    async (hotel_id, status_val) => {
      setProcessingId(hotel_id)
      console.log('check..: ', hotel_id, status_val)
      let results = await api.post('admin/hotel/approve', {
        hotelId: hotel_id,
        is_approved: status_val,
      })
      setTimeout(() => {
        setProcessingId(null)
      }, 2000)
      console.log('..results', results)
      setApproveModalId(null)
      setDisapproveModalId(null)
      getHotels()
    },
    [getHotels],
  )

  const ApproveModal = useCallback(() => {
    return (
      <CModal
        backdrop={false}
        visible={approveModalId || disapproveModalId}
        onClose={() => {
          setApproveModalId(null)
          setDisapproveModalId(null)
        }}
      >
        <CModalHeader>
          <CModalTitle>Change Approval Status</CModalTitle>
        </CModalHeader>
        <CModalBody>{`Do you want to ${
          approveModalId ? `Unapprove` : `Approve`
        } this hotel?`}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setApproveModalId(null)
              setDisapproveModalId(null)
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              changeStatus(approveModalId ?? disapproveModalId, approveModalId ? 0 : 1)
            }
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }, [approveModalId, disapproveModalId, changeStatus])

  return (
    <>
      <ApproveModal />
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
                      set
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
                      <CTableDataCell>
                        <CButton
                          onClick={() => {
                            if (hotel.is_approved !== 'Approved') {
                              setDisapproveModalId(hotel.id)
                              setApproveModalId(null)
                            } else {
                              setApproveModalId(hotel.id)
                              setDisapproveModalId(null)
                            }
                          }}
                          style={{ minWidth: 120 }}
                        >
                          {processingId === hotel.id ? (
                            <CSpinner size="sm" />
                          ) : (
                            <>{hotel.is_approved === 'Approved' ? 'Unapprove' : 'Approve'}</>
                          )}
                        </CButton>
                      </CTableDataCell>
                      {/* <CTableDataCell>{StaticBackdrop(hotel.id, hotel.is_approved)}</CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <CCol xs={12}>
                <CPagination className="justify-content-end" aria-label="Page navigation example">
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
    </>
  )
}

export default Hotels
