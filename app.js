const path = require('path');
const app = require('./config/express')
const swaggerUi = require('swagger-ui-express');
const swagger = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler')
const requestLogger = require('./middlewares/requestLogger')

const planRoutes = require('./routes/plan.route')
const featureRoutes = require('./routes/feature.route')

// enable webpack hot module replacement in development mode
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../webpack/webpack.config.dev';

// if (process.env.NODE_ENV === 'development') {
//     const compiler = webpack(webpackConfig);
//     app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
//     app.use(webpackHotMiddleware(compiler));
// }

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swagger, { explorer: true }));

// Request logger
app.use(requestLogger);

// Router
app.use('/api/plan', planRoutes);
app.use('/api/feature', featureRoutes);

// Landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

module.exports = app;