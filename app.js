const express = require('express');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/connection')
const userRouter = require('./routes/user');

const app = express();

dotenv.config({path:'.env'});
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());

app.use('/api/contacts',contactRouter);
app.use('/api/users',userRouter);

app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})