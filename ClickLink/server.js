const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

const app = express();
app.use(express.json());
mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

// קובעים מדיניות CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // מאפשר גישה מכל מקור
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // מתיר פעולות מסוימות
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // מתיר הוספת כותרות מסוימות
  next();
});

mongoose.connect('mongodb://localhost:27017/clicklinkDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api', userRoutes);
app.use('/api', linkRoutes);
app.use('/', linkRoutes); // הוסף שורה זו אם עדיין לא קיימת

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
