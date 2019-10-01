const mongoose = require('mongoose');
if (mongoose.connect('mongodb://localhost:27017/office', {useNewUrlParser: true,useUnifiedTopology: true}))
{
    console.log('Connection Successfully Done');
}
 module.exports = mongoose;