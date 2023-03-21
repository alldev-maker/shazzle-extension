const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

export default async (req, res) => {
  const { email, subject, body } = req.body;

  const data = {
    to: email,
    from: "no-reply@shazzle.net",
    subject: subject,
    html: ` 
    <p>${body}</p>
    `,
  };

  try {
    await sgMail.send(data);
    res.send(JSON.stringify({ success: true }));
  } catch {
    res.send(JSON.stringify({ success: false, data }));
  }
};
