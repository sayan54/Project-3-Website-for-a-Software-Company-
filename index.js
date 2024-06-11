const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

const port = 4990;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/index.html'));
})
console.log(__dirname +'/public/index.html');

mongoose.connect('mongodb://localhost:27017', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
})

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    Name: String,
    email: String,
    phone: String,
    Subject: String,
    Message: String,
});

const Data = mongoose.model('Data', dataSchema);

app.post('/submit', (req, res) => {
    const {Name, email, phone, Subject, Message} = req.body;
    const newData = new Data({
        Name,
        email,
        phone,
        Subject,
        Message,
    });
    newData.save();
    res.redirect('/');
})

app.listen (port, () => {
    console.log(`server running on port ${port}`);
})