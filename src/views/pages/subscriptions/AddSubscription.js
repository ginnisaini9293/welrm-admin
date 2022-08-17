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
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
} from '@coreui/react'
import api from 'src/utils/api'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { DocsCallout, DocsExample } from 'src/components'

const AddSubscription = () => {
  const [name, setName] = useState('')
  const [actualPrice, setActualPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [validity, setValidity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      let { data } = api.post('subscription', {
        name: name,
        actualPrice: actualPrice,
        sellingPrice: sellingPrice,
        discount: discount,
        validity: validity,
      })
    } catch (error) {
      console.error('...Error in fetching hotels', error)
    }
  }

  useEffect(() => {}, [])

  return (
    <CRow>
      <CCol xs={12}>{/* <DocsCallout name="Form Select" href="forms/select" /> */}</CCol>
      <CCol xs={10}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Subscription</strong>
          </CCardHeader>
          <CCardBody>
            {/* Start- */}

            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol xs={3}>
                  <CFormLabel htmlFor="staticEmail2">Plan: </CFormLabel>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    id="staticEmail2"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol xs={3}>
                  <CFormLabel htmlFor="staticEmail2">Actual Price: </CFormLabel>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    id="staticEmail2"
                    value={actualPrice}
                    onChange={(e) => {
                      setActualPrice(e.target.value)
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs={3}>
                  <CFormLabel htmlFor="staticEmail2">Discount(%)</CFormLabel>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    id="staticEmail2"
                    value={discount}
                    onChange={(e) => {
                      setDiscount(e.target.value)
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol xs={3}>
                  <CFormLabel htmlFor="staticEmail2">Selling Price: </CFormLabel>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    id="staticEmail2"
                    value={sellingPrice}
                    onChange={(e) => {
                      setSellingPrice(e.target.value)
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-4">
                <CCol xs={3}>
                  <CFormLabel htmlFor="staticEmail2">Validity(in month): </CFormLabel>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    id="staticEmail2"
                    value={validity}
                    onChange={(e) => {
                      setValidity(e.target.value)
                    }}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol xs={3}></CCol>
                <CCol xs={2}>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Add
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CForm>

            {/* End */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddSubscription
