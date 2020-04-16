import React, { useEffect, useRef } from 'react'

const Email = (props) => {

  const param = {username:'portal.test',password:'123456789'};//call api to get acount for email system
  const { username, password } = param;
  const inputEl = useRef(null)
  useEffect(() => {
    inputEl.current.click();
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div style={{display:"none"}}>

      <form action="http://mail.vinalines.com.vn/WorldClient.dll?View=Main" autoComplete="off" target="_top"
            method="post"
            onSubmit="document.getElementById('Logon').disabled=true;" noValidate="">
        <div id="logoContainer">
          <div id="biglogo" align="center"><img src="All/Images/Banner.png" alt="WorldClient"/></div>
        </div>
        <div id="formWrapper">
                <span className="pull-right small-font">

                </span>
          <div className="innerTable">
            <div className="loginText">
              &nbsp;
            </div>
            <div className="roundyMcRounderson">
              <i className="icon-user icon-invert icon-large"></i>
              <input type="text" name="User" id="User" value={username} placeholder="email address"/>
            </div>
            <div className="roundyMcRounderson">
              <i className="icon-lock icon-invert icon-large"></i>
              <input type="password" id="Password" name="Password" value={password} placeholder="password"
                     autoComplete="off"/>
            </div>
            <div className="forgot-password">
              &nbsp;
            </div>
            <div className="login-input">
              <button ref={inputEl} className="loginButton" type="submit" name="Logon" id="Logon">Sign In <i
                className="icon-arrow-right icon-large"></i></button>
            </div>
            <div>&nbsp;</div>
            <div className="login-input">
              <select className="" name="Lang" id="Lang">
                <option className="select-placeholder" value="" disabled="disabled" id="languageTranslationString"
                        selected="selected">Language
                </option>
                <option value="en">English</option>
                <option value="fc">Canadien français</option>
                <option value="zh">中文</option>
                <option value="da">Dansk</option>
                <option value="de">Deutsch</option>
                <option value="cs">Česky</option>
                <option value="uk">English-UK</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="it">Italiano</option>
                <option value="ja">日本語</option>
                <option value="ko">한글</option>
                <option value="hu">Magyar</option>
                <option value="nl">Nederlands</option>
                <option value="no">Norsk (bokmål)</option>
                <option value="pl">Polski</option>
                <option value="pt">Português</option>
                <option value="ru">Русский</option>
                <option value="fi">Suomi</option>
                <option value="sv">Svenska</option>
                <option value="tw">Taiwan</option>
                <option value="sr">Srpski</option>
                <option value="gr">Ελληνικά</option>
                <option value="tr">Türkçe</option>
                <option value="ro">Romana</option>
                <option value="ar">العربية</option>
                <option value="vi">Tiếng Việt</option>
                <option value="th">ไทย</option>
                <option value="ca">Català</option>
              </select>
              <select className="" name="Theme" id="Theme">
                <option className="select-placeholder" value="" disabled="disabled" id="themeTranslationString"
                        selected="selected">Theme
                </option>
                <option value="Lite">Lite</option>
                <option value="LookOut">LookOut</option>
                <option value="Mobile">Mobile</option>
                <option value="WorldClient">WorldClient</option>
              </select>
            </div>
            <div>&nbsp;</div>
            <div className="powered-by-mdaemon">
              <img src="All/Images/Powered-MDaemon_transparent.png"/>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Email