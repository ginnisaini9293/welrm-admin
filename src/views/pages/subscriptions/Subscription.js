import { React, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

const Subscription = () => {
  const [subscriptions, setSubscription] = useState([])
  let [rowCount, setRowCount] = useState(1)
  const [deletingId, setDeletingId] = useState(null)
  const [processingId, setProcessingId] = useState(null)
  // let [id, setId] = useState(null)

  const getSubscription = async () => {
    try {
      let { data } = await api.get('subscription', {
        // params: {
        //   type: 'guest_popular',
        // },
      })

      setSubscription(data.data.hotels.rows)
      // setNumRows(data.data.hotels.numRows)
    } catch (error) {
      console.error('...Error in fetching services', error)
    }
  }

  const deleteSubscription = useCallback(
    async (deletingId) => {
      setProcessingId(deletingId)
      console.log('check..: ', deletingId)
      let results = await api.delete('subscription/' + deletingId, {})
      setTimeout(() => {
        setProcessingId(null)
      }, 2000)
      console.log('..results', results)
      setDeletingId(null)
      getSubscription()
    },
    [getSubscription],
  )

  useEffect(() => {
    getSubscription()
  }, [getSubscription])

  const DeleteModal = useCallback(() => {
    return (
      <CModal backdrop={false} visible={!!deletingId} onClose={() => setDeletingId(null)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>{`Do you want to delete subscription?`}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeletingId(null)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              deleteSubscription(deletingId)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }, [deletingId])

  return (
    <>
      <DeleteModal />
      <CRow>
        <CCol xs={12}>{/* <DocsCallout name="Form Select" href="forms/select" /> */}</CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="subscription-header">
                <strong>Subscription</strong>
                <Link to="/addsubscriptions" className="add_btn_subscription">
                  <CButton color="primary" className="mt-3" active tabIndex={-1}>
                    Add
                  </CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              {/* Start */}
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Plan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actual Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Discount(%)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Selling Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Validity(month)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {subscriptions.map((subscription) => (
                    <CTableRow key={subscription.id}>
                      <CTableHeaderCell scope="row">{rowCount++}</CTableHeaderCell>
                      <CTableDataCell>{subscription.name}</CTableDataCell>
                      <CTableDataCell>{subscription.actualPrice}</CTableDataCell>
                      <CTableDataCell>{subscription.discount}</CTableDataCell>
                      <CTableDataCell>{subscription.sellingPrice}</CTableDataCell>
                      <CTableDataCell>{subscription.validity}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/addsubscriptions/${subscription.id}`} className="sub-edit-link">
                          <CButton color="primary" active tabIndex={-1}>
                            Edit
                          </CButton>
                        </Link>
                        <CButton
                          color="danger"
                          className="delete_service"
                          onClick={() => setDeletingId(subscription.id)}
                        >
                          {processingId === subscription.id ? <CSpinner size="sm" /> : <>Delete</>}
                        </CButton>
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
    </>
  )
}

export default Subscription
