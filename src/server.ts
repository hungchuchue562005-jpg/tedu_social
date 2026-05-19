import express from 'express'; 

const port = process.env.PORT || 3002;

const app = express();

app.get('/', (req :express.Request, res :express.Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});