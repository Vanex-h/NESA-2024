require('dotenv').config();
const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Set up associations
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(Comment);
Comment.belongsTo(User);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});