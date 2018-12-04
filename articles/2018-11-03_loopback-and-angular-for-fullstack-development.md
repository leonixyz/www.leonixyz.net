# Loopback and Angular for fullstack development

Some months ago, I discovered a powerful tool that allows to speed up web development and prototyping: [Loopback](https://loopback.io). It's a Node.js framework able to connect to a broad range of different data backends: from traditional RDBMS, to NoSQL databases, in-memory storage, up to cloud object storage like AWS S3. Once connected to the data source, it gives you out-of-the-box a set of RESTful endpoints providing basic CRUD operations. It supports token-based authentication with the possibility of being integrated in more complex authentication protocols, like OAuth2, even within enterprise cloud environments.

Its power is due its simplicity of use. In the best case, you are able to start a new project from scratch, without any pre-existing data source, in matter of minutes using *loopback-cli*. On the other hand, if you already have certain data tables and would like to expose them via webservices, Loopback offers an "autodiscovery" feature that basically looks into the database and maps everything to RESTful endpoints. According to its documentation (I did not tried it out), it's even able to detect and translate relations based on foreign keys. IMHO, this is optimal for migrating legacy applications. Generally speaking, Loopback is highly flexible and extendible: if you need custom logic, for example if you need new endpoints or custom authorization, you just add new code on top of it. Its doc is complete and clear, having lots of examples and code fragments, have a look at it!

Because Loopback is built on top of [Express](https://expressjs.com/), it allows you to serve static files via HTTP. With a minimal config, you define a directory inside of the main project to contain your files. For example, I created a new Angular project in a subdirectory, customized its config, then finally merged the two *package.json* files into a single one, for a fullstack project. What i ended in, is **one** project having all code and all dependencies in a single place, easy to start (one command), easy to deploy, easy to maintain, easy to fit in a container, without the need of CORS policies because everything is served by a single Express webserver.

I created a [template project](https://github.com/leonixyz/angloop) to be used as boilerplate for new web applications, including also Bootstrap and defining some basic components (registration, login, logout forms). Happy hacking! All feedbacks are welcome.