const express = require('express');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/connection')
const userRouter = require('./routes/user');

const app = express();

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    }
    catch (err) {
        console.log(err);
    }
}

start();