import React, { Fragment } from 'react'
import {Route, Switch} from 'react-router-dom'
import PostDisplay from '../static/Layout_Posts/PostDisplay'
import Login from '../auth/Login'
import Register from '../auth/Register'
import PrivateRoute from '../routing/PrivateRoute'
import Dashboard from '../static/admin/Dashboard' 
import CreateProfile from '../static/admin/CreateProfile'
import EditProfile from '../static/admin/EditProfile'
import NotFound from '../static/NotFound' 
import UpdatePasswordRec from '../forgotpassword/UpdatePasswordRec'
import PrivacyPolicy from '../static/PrivacyPolicy' 
import TermsAndCondition from '../static/TermsAndCondition'
import About from '../static/About'
import Contact from '../static/Contact'
import Advertising from '../static/Advertising'
import Home from '../static/Layout_home/Home'


const Routes = () => {
    
    return (
        <Fragment>
        <Switch>
         <Route exact path="/تسجيل-الدخول" component={Login}/>
         <Route exact path="/حساب-جديد" component={Register}/>
         <PrivateRoute exact path="/dashboard" component={Dashboard} />
         <PrivateRoute exact path="/create-profile" component={CreateProfile} />  
         <PrivateRoute exact path="/edit-profile" component={EditProfile} />
         <Route exact path="/post/:id/نصاب-:category-:nameSpam" component={PostDisplay} />
         <Route exact path="/سياسة-الخصوصية" component={PrivacyPolicy} /> 
         <Route exact path="/شروط-الإستخدام" component={TermsAndCondition} />
         <Route exact path="/من-نحن" component={About} />
         <Route exact path="/administration/verifyNewPoste"/>
         <Route exact path="/administration/msg"/>
         <Route exact path="/administration/advertising" />
         <Route exact path="/تواصل-معنا" component={Contact}/>
         <Route exact path="/طلب-إعلان" component={Advertising}/>
         <Route exact path="/administration/conflicts"/>
         <Route exact path="/لائحة-النصابين" component={Home}/>
         <Route
              path="/password/:userId/:token"
              component={({match}) => <UpdatePasswordRec userId={match.params.userId} token={match.params.token} />}/>
         <Route component={NotFound} />
         </Switch>
        </Fragment>
    )
}

export default Routes
