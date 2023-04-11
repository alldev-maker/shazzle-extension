// import SMSForm from "./components/SMSForm";

import logo from "./logo.svg";
import "./App.css";
// import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>SMS & Email forms with Twilio functions and React</p>
      </header>
      <div className="no_print"></div>

      <main className="patient_header">
        <div className="no_print wrap right mleft10px">
          <div className="right mbottom06">
            <button>button1</button>
          </div>

          <div className="clear"></div>

          <div className="right mleft10px">
            <button>button2</button>
          </div>
        </div>
        <div className="wrap">Second Div</div>

        {/* <SMSForm /> */}
        <br />
        {/* <ContactForm /> */}
      </main>
    </div>
  );
}

export default App;
