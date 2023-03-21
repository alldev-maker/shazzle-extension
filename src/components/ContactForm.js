import React, { useState } from "react";

const ContactForm = () => {
  const [message, setMessage] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const [submitting, setSubmit] = useState(false);

  const onChange = (event) => {
    const name = event.target.getAttribute("name");
    setMessage({
      ...message,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);

    fetch("http://localhost:4000/api/send-email", {
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
          setSubmit(false);
          setMessage({ email: "", subject: "", body: "" });
        } else {
          setSubmit(false);
          console.log("error: ", data);
        }
      });
  };

  return (
    <>
      <form
        style={{
          display: `flex`,
          flexDirection: `column`,
          maxWidth: `500px`,
        }}
        onSubmit={onSubmit}
      >
        <label htmlFor="email">To email address:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={message.email}
          onChange={onChange}
        ></input>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={message.subject}
          onChange={onChange}
        />
        <label htmlFor="body">Message:</label>
        <textarea
          style={{
            height: `150px`,
          }}
          name="body"
          id="body"
          value={message.body}
          onChange={onChange}
        />
        <button
          style={{
            marginTop: `7px`,
          }}
          type="submit"
          disabled={submitting}
        >
          Send message
        </button>
      </form>
    </>
  );
};

export default ContactForm;
