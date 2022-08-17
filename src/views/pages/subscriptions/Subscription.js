import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

const Subscription = () => {
  const [subscriptions, setSubscription] = useState([])
  let [rowCount, setRowCount] = useState(1)

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

  useEffect(() => {
    getSubscription()
  }, [getSubscription])

  return (
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

export default Subscription
