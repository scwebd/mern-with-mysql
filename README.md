# MERN Structure Demo (MySQL using Sequelize ORM)


## About this example:

The front-end React app will auto-reload as it is updated via Webpack dev server (please note that you will not be using the exact same setup for React; I've left a generic CRA instance in the client). The back-end Express app will auto-reload independently via nodemon.

It is my hope that you will be able to replace the contents of this client folder with your React app; just make sure to maintain/add the proxy line to the client package.json as referenced below. This example is a work in progress... if something doesn't work, email me at [sarah.cullen@techtonic.com](mailto:sarah.cullen@techtonic.com).


## To run this app locally:

Start by installing your dependencies. While in this directory, run the following command:

```
npm install
```

This will install node_modules within the root, server, and client folders.

After all three installations complete, run the following command in your terminal:

```
npm start
```

Your app should kick off at <http://localhost:3000>, with the API server running at <http://localhost:3001>. The Express API server should intercept any API requests from the client, via the proxy behavior specified in the client folder's package.json.


## Items of note:

* The package.json at the root level has a number of scripts that may be of interest.

* Make sure your .gitignore (at the root level) includes the line `node_modules` with no preceding slash; this will cause git to ignore node_modules at all levels, including the client and server.

* Remember to change the config.json "development" object to align with your MySQL database server's username, password, database name, and port. Also remember that, even though Sequelize can create and interact with your tables, Sequelize will not be able to sync with a database unless it has been created.

* There are two blocks of code of particular interest in "/server/app.js". Each of 15-17 and 23-25 are necessary for the server to delegate to the React front-end properly both in development and in production. Make sure to add in your route/controller requires BEFORE the block at 23-25, so that the API server handles any requests that match API routing patterns, and that the React app receives any requests left over.

* The client package.json contains the line `"proxy": "http://localhost:3001/"`, which is crucial for the communication between React and the back-end API server.