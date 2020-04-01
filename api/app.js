const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./server/routes/userRoutes')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

app.use('/api/v1/users', userRouter)

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of Projext-Tracker API.'
}));


const port = process.env.PORT || 8000;
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
// export default app;