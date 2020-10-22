import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const AdminRoute = ({ component: Component, auth: { isAuthenticated, loading, user } ,...rest }) => (
    <Route {...rest} render={props => !isAuthenticated || !user.admin ? (<Redirect to=
        '/'/>) : (<Component {...props}/>)} />
)

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps) (AdminRoute)
