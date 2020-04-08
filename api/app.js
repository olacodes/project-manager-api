const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./server/routes/userRoutes')
const userAuthRouter = require('./server/routes/auth/userAuthRoute')
const cors = require('cors')

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

app.use('/api/v1/users', userRouter)

app.use('/api/v1/auth', userAuthRouter)

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    status: "success",
    message: 'Welcome to the beginning of Project-manager API.'
}));


const port = process.env.PORT || 8000;
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

module.exports = app