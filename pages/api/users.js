export default function handler(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + password);
  res.end();

  // Then save email to your database, etc...
}
