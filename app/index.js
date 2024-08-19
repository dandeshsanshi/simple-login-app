const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="POST">
      <label>Username:</label><br/>
      <input type="text" name="username" required/><br/>
      <label>Password:</label><br/>
      <input type="password" name="password" required/><br/><br/>
      <input type="submit" value="Login"/>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.send('Login successful');
  } else {
    res.send('Login failed');
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
