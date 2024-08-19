const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Login</h1>
                <form action="/login" method="post">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username" name="username"><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password"><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
