import express from 'express';
import connectToDB from './connect.js';
// import requestLogger from './middlewares/requestLogger.js';
import routes from './routes/index.js';
import getUserFromAuthToken from './middlewares/getUserFromAuthToken.js';
import path from 'path'; // Import path module to resolve the directory

let app;


connectToDB().then(function (connectMessage) {
    console.log(connectMessage);
    app = express();


    // Middleware to parse incoming JSON data
    app.use(express.json());

    // Middleware to extract user from auth token
    // app.use(getUserFromAuthToken);

    // Set up routes
    app.use(routes);

    const port = process.env.PORT || 4000;
    app.listen(port, function () {
        console.log("Server running on PORT", port);
    });
}).catch(function (err) {
    console.error(err);
});

export default app;
