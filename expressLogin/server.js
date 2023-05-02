import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import usersRoute from './app/routes/usersRoute';
import adminRoute from './app/routes/adminRoute';
import tipsRoute from './app/routes/tipsRoute';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', tipsRoute);

app.get("/", (req, res) => {
  res.json("hello")
})
app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});


export default app;