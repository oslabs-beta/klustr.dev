const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const spacesRouter = require('./routers/spacesRouter');
const teamsRouter = require('./routers/teamsRouter')
const vClusterRouter = require('./routers/vClusterRouter');
const userController = require('./controllers/userController');
const clusterController = require('./controllers/clusterController')
const clusterRouter = require('./routers/clusterRouter')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/cookies',
  userController.verifyAdmin,
  (req, res) => {
    const { isAdmin, teamId } = res.locals;
    console.log('cookies', isAdmin)
    return res.status(200).json({ isAdmin, isLoggedIn: true, teamId });
  })

app.get('/admin',
  userController.verifyAdmin,
  (req, res) => {
    const { isAdmin } = res.locals;
    console.log(isAdmin)
    if (isAdmin === undefined) return res.redirect('/')
    if (isAdmin === true) return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
    if (isAdmin === false) return res.redirect('/vcluster')
  })

  app.use('/user', userRouter)
  app.use('/spaces', spacesRouter)
  app.use('/vclusters', vClusterRouter)
  app.use('/teams', teamsRouter)
  app.use('/clusters', clusterRouter)
  
  app.get('*', (req, res) => {
    console.log('req.cookies', req.cookies)
    const { AuthToken } = req.cookies;
    if (AuthToken === undefined) return res.redirect('/')
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  });

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    message: 'An error occurred',
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(500).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});