import { React, useState } from 'react'

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
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [name, setName] = useState('')

  return (
    <CRow>
      <CCol xs={12}>{/* <DocsCallout name="Form Select" href="forms/select" /> */}</CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Subscription</strong>
          </CCardHeader>
          <CCardBody>
            {/* Start- */}

            <CRow className="mb-3">
              <CCol xs={3}>
                <div className="cust-dash-box">
                  <div className="">
                    <span className="box-title">Total Hotels</span>
                  </div>
                  <div className=""></div>
                </div>
              </CCol>
              <CCol xs={3}>
                <div className="cust-dash-box">
                  <div className=""></div>
                </div>
              </CCol>
              <CCol xs={3}>
                <div className="cust-dash-box">
                  <div className=""></div>
                </div>
              </CCol>
              <CCol xs={3}>
                <div className="cust-dash-box">
                  <div className=""></div>
                </div>
              </CCol>
            </CRow>

            {/* End */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
