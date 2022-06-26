import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

/***
 * If user is not login, do not allow to access
 */
export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user)

  if (!user) {
    return <Navigate to="/" />
  } else {
    return children
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
}

export default PrivateRoute
