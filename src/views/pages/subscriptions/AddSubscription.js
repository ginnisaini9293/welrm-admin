import { React, useCallback, useEffect, useState } from 'react'
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
import { useNavigate, useParams, Navigate } from 'react-router-dom'

const AddSubscription = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [actualPrice, setActualPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [validity, setValidity] = useState('')

  let { id } = useParams()

  // code to get data that needs to be edited
  const getOneSubs = useCallback(async () => {
    if (id) {
      try {
        let { data } = await api.get('subscription/' + id, {})

        setName(data.data.name)
        setActualPrice(data.data.actualPrice)
        setDiscount(data.data.discount)
        setSellingPrice(data.data.sellingPrice)
        setValidity(data.data.validity)
      } catch (error) {
        console.error('...Error in fetching hotels', error)
      }
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      if (id) {
        const updateData = async () => {
          let { data } = await api.put('subscription/' + id, {
            name: name,
            actualPrice: actualPrice,
            sellingPrice: sellingPrice,
            discount: discount,
            validity: validity,
          })
          console.log('update response', data)

          if (data.success) {
            console.log('inside update seccess')
            navigate('/subscriptions', { replace: true })
          }
        }
        updateData()
      } else {
        let { data } = api.post('subscription', {
          name: name,
          actualPrice: actualPrice,
          sellingPrice: sellingPrice,
          discount: discount,
          validity: validity,
        })
      }
    } catch (error) {
      console.error('...Error in fetching hotels', error)
    }
  }

  useEffect(() => {
    getOneSubs()
  }, [getOneSubs])

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
                      {id ? 'Update' : 'Add'}
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
