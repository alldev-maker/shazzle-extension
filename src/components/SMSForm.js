import { useState } from "react";
import "./SMSForm.css";

const SMSForm = () => {
  const [message, setMessage] = useState({ to: "+1 512 539 0387", body: "" });
  const [submitting, setSubmit] = useState(false);
  const [error, setError] = useState(false);

  const onHandleChange = (event) => {
    const name = event.target.getAttribute("name");
    setMessage({ ...message, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setSubmit(true);

    fetch("http://localhost:4000/api/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("data success: ", data);
          setError(false);
          setSubmit(false);
          setMessage({ to: "", body: "" });
        } else {
          setError(true);
          setSubmit(false);
        }
      });
  };

  return (
    <form className={error ? "error sms-form" : "sms-form"} onSubmit={onSubmit}>
      <div>
        <label htmlFor="to">To:</label>
        <input
          type="tel"
          name="to"
          id="to"
          value={message.to}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          id="body"
          value={message.body}
          onChange={onHandleChange}
        />
      </div>
      <button type="submit" disabled={submitting}>
        Send message
      </button>
    </form>
  );
};

export default SMSForm;
