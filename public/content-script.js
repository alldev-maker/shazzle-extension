/*global chrome*/

var body = document.getElementsByClassName("no_print wrap right mleft10px")[0];
var btnBox = document.createElement("div");
var clearDiv = document.createElement("div");
clearDiv.classList.add("clear");
btnBox.classList.add("btn-box");

var smsButton = document.createElement("button");
var emailButton = document.createElement("button");

// Fetch Patient by ID
let patientInfo;
window.onload = async (event) => {
  patientInfo = await fetch(
    "https://shazzle-api.herokuapp.com/api/patients/289"
  )
    .then((response) => response.json())
    .then((res) => res.data.patient);

  // console.log("patientInfo -> ", patientInfo);
  // console.log("patientInfo?.phone", patientInfo?.phone);
  // console.log("patientInfo?.email", patientInfo?.email);

  smsButton.innerHTML =
    '<img src="https://res.cloudinary.com/dvsjouofy/image/upload/v1680274962/send-sms-icon_vmjlmr.png" alt="send sms" />';
  smsButton.classList.add("btn-send", "right");
  if (patientInfo?.phone === "") {
    smsButton.disabled = true;
    smsButton.classList.add("disabled");
  }

  emailButton.innerHTML =
    '<img src="https://res.cloudinary.com/dvsjouofy/image/upload/v1680274961/send-mail-icon_dwicrp.png" alt="send mail" />';
  emailButton.classList.add("btn-send", "right");
  if (patientInfo?.email === "") {
    emailButton.disabled = true;
    emailButton.classList.add("disabled");
  }

  btnBox.appendChild(smsButton);
  btnBox.appendChild(emailButton);
};

/* Send Message */
smsButton.addEventListener("click", function () {
  // Create a form dynamically
  var form = document.createElement("form");
  form.classList.add("sms-form");

  // Create an input element for Phone Number
  var phone = document.createElement("input");
  phone.setAttribute("type", "tel");
  phone.setAttribute("name", "to");
  phone.setAttribute("id", "phone");
  phone.setAttribute("placeholder", "Phone Number");
  phone.setAttribute("value", patientInfo?.phone);

  // Create an textarea element for Message
  var message = document.createElement("textarea");
  message.setAttribute("id", "message");
  message.setAttribute("name", "message");
  message.setAttribute("placeholder", "Send Message");

  // Create a submit button
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "submit");
  submit.setAttribute("value", "Submit");

  // Close button
  var closeButton = document.createElement("button");
  closeButton.innerHTML = "✕";
  closeButton.setAttribute("id", "close");

  // Create line break
  var linebreak = document.createElement("br");

  form.appendChild(phone);
  form.appendChild(message);
  form.appendChild(linebreak);
  form.appendChild(submit);
  form.appendChild(closeButton);

  document.getElementsByTagName("body")[0].appendChild(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const message = {
      to: document.getElementById("phone").value,
      body: document.getElementById("message").value,
    };

    fetch("https://shazzle-api.herokuapp.com/api/send-sms", {
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
          form.remove();
        } else {
          console.log("data failed: ", data);
          form.remove();
        }
      });
  });

  document.getElementById("close").onclick = function () {
    form.remove();
    return false;
  };
});

/* Send Email */

emailButton.addEventListener("click", function () {
  // Create a form dynamically
  var form = document.createElement("form");
  form.classList.add("sms-form");

  // Create an input element for Email Address
  var email = document.createElement("input");
  email.setAttribute("type", "email");
  email.setAttribute("name", "email");
  email.setAttribute("id", "mail");
  email.setAttribute("placeholder", "Email Address");
  email.setAttribute("value", patientInfo?.email);

  // Create an input element for Subject
  var subject = document.createElement("input");
  subject.setAttribute("type", "text");
  subject.setAttribute("name", "subject");
  subject.setAttribute("id", "subjectC");
  subject.setAttribute("placeholder", "Subject");

  // Create an textarea element for Message
  var message = document.createElement("textarea");
  message.setAttribute("id", "message");
  message.setAttribute("name", "message");
  message.setAttribute("placeholder", "Send Message");

  // Create a submit button
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "submit");
  submit.setAttribute("value", "Send Message");

  // Close button
  var closeButton = document.createElement("button");
  closeButton.innerHTML = "✕";
  closeButton.setAttribute("id", "close");

  // Create line break
  var linebreak = document.createElement("br");

  form.appendChild(email);
  form.appendChild(subject);
  form.appendChild(message);
  form.appendChild(linebreak);
  form.appendChild(submit);
  form.appendChild(closeButton);

  document.getElementsByTagName("body")[0].appendChild(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const message = {
      email: document.getElementById("mail").value,
      subject: document.getElementById("subjectC").value,
      body: document.getElementById("message").value,
    };

    fetch("https://shazzle-api.herokuapp.com/api/send-email", {
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
          form.remove();
        } else {
          console.log("data failed: ", data);
          form.remove();
        }
      });
  });

  document.getElementById("close").onclick = function () {
    form.remove();
    return false;
  };
});

body.appendChild(clearDiv);
body.appendChild(btnBox);
