import React from 'react'
import Header from '../components/Header/Header';
import SignupSigninComponent from '../components/SignInSignUp/index'
const Signup = () => {
  return (
    <div>
        <Header />
        <div className="wrapper">
            <SignupSigninComponent />
        </div>
    </div>
  )
}

export default Signup ;