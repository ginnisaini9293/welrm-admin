import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

/***
 * If user is login, do not allow to access
 */
export const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user)

  if (user) {
    return <Navigate to="/dashboard" />
  } else {
    return children
  }
}

PublicRoute.propTypes = {
  children: PropTypes.any,
}

export default PublicRoute
