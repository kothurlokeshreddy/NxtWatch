import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

import ThemeAndVideoContext from '../../Context/ThemeAndVideoContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const formDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(formDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      errorMsg,
      username,
      showPassword,
      password,
      showSubmitError,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {activeTheme} = value

          const bgColor = activeTheme === 'Light' ? '#f1f1f1' : '#313131'
          const textColor = activeTheme === 'Light' ? '#000000' : '#ffffff'
          const formColor = activeTheme === 'Light' ? '#ffffff' : '#0f0f0f'
          const formInputColor =
            activeTheme === 'Light' ? '#f1f1f1' : 'transparent'
          const formInputBorderColor = activeTheme === 'Light' ? '' : '#cbdef3'

          return (
            <div
              className="login-page-container"
              style={{backgroundColor: bgColor, color: textColor}}
            >
              <div
                className="login-form-container"
                style={{backgroundColor: formColor}}
              >
                <img
                  src={
                    activeTheme === 'Light'
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                  className="website-logo"
                />
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  <div className="input-container">
                    <label htmlFor="name" style={{color: textColor}}>
                      USERNAME
                    </label>
                    <input
                      value={username}
                      onChange={this.onChangeUsername}
                      placeholder="Enter Username"
                      type="text"
                      id="name"
                      style={{
                        backgroundColor: formInputColor,
                        color: textColor,
                        borderColor: formInputBorderColor,
                      }}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="password" style={{color: textColor}}>
                      PASSWORD
                    </label>
                    {showPassword ? (
                      <input
                        value={password}
                        onChange={this.onChangePassword}
                        placeholder="Enter Password"
                        type="text"
                        id="password"
                        style={{
                          backgroundColor: formInputColor,
                          color: textColor,
                          borderColor: formInputBorderColor,
                        }}
                      />
                    ) : (
                      <input
                        value={password}
                        onChange={this.onChangePassword}
                        placeholder="Enter Password"
                        type="password"
                        id="password"
                        style={{
                          backgroundColor: formInputColor,
                          color: textColor,
                          borderColor: formInputBorderColor,
                        }}
                      />
                    )}
                  </div>
                  <div className="show-input-container">
                    <label htmlFor="checkbox">Show Password</label>
                    <input
                      type="checkbox"
                      id="checkbox"
                      onChange={this.onChangeCheckbox}
                    />
                  </div>
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                </form>
                {showSubmitError && <p className="error-msg">{errorMsg}</p>}
              </div>
            </div>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login
