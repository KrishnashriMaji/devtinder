# Namaste DevTinder 😊🚀🚀

This document outlines key concepts for creating and managing an Express server, including folder structure, versioning, routing, request handling, and dynamic routes.

### 🧨 **12. Database - SQL & NoSQL**

`Database` - (https://en.wikipedia.org/wiki/Database)

A database is an organized collection of data.

`DBMS`
Its a management system that interacts with end users & application (where we can do any operation (add/remove etc) in an efficient way).

- **_Relational DB_** -

  (MySQL, PostgreSQL) Structural Query Language

  Now MySQL is managed by Oracle.

  Here data store in table(row, column), we can create a new table with relation of current table id, no option to store data in form of array/object/ any higher order format.

- **_NoSQL_** (MongoDB) (Not only SQL)

  Here data store in collection in form of document, each item inside document is called field.

- No need for joins.
- No need for data normalization.

  https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql

`RDMS (MySQL) NoSQL(MongoDB)`

- Table, row, columns - Collection, document, fields
- Structured Data - Unstructured data
- Fixed Schema - flexible schema
- Sql(Structure query lang) - Mongo(MQL),Neo4J(Cypher)
- Tough horizontal scaling - Easy to scale horizontally + vertically
- Relationships - foreign key + joins - Nested [ Relationships]
- Read - heavy apps, transaction workloads - Real Time, Big data, distributed computing(\*\*\*)
- Ex. Banking apps - Ex. Real Time analytics, Social Media

### 🧨 **13. Creating a database & mongodb**

1. We can download mongo in our sytem, and use it
2. Mongodb will store our db on their cloud. we can create a new **Clusters** on official mongodb website & access it.

- Community version - free version for developer - download on our local sytem or deploy to our cloud, mongodb will not help you.
- Enterprise version - for company

They both can be self managed(when deploy your db on server you have to make sure your db is always up & running/backed up properly/ or manged by mongodb).

We can connect mongodb cluster to mongodb compass. Copy cluster string & connect with compass, then We can see data inside that database.

enctest021
L2jrIxW9PyDJAUdl

## \***\*\*\*\*\***\*\*\***\*\*\*\*\***\_\***\*\*\*\*\***\*\*\***\*\*\*\*\***🎈🎈🎈 DEV TINDER 🎈🎈🎈\***\*\*\*\*\***\*\*\***\*\*\*\*\***\_\***\*\*\*\*\***\*\*\***\*\*\*\*\***

### 🎈 **1. Microservice vs Monolith - How to build a project?**

`Planning`

- Requirements(gather requirements for application by PM, PM give a mock design + designer)
  ⬇️
- Design (Sciner eng, eng manager,tach lead - design documentation - tech stack, security practices HLD, LLd,Microservice/Monolith ..)
  ⬇️
- Development(SDE1/SDE2)
  ⬇️
- Testing(by Tester)
  ⬇️
- Deployment(DevOps team-manage server etc)
  ⬇️
- Maintenance (if new requirements come in then whole cycle again repeat from start)

This model is called <ins>**Waterfall Model**</ins>.

`Monolith vs Microservice :`

- One big application, it does everything(backend, DB, frontend, auth, email, analytics) on same repository.
- multiple service/application for multiple job(backend, DB, frontend, auth,...), multiple application communicating with each other

- Code repo single multiple
- Dev Speed slower faster
- Scalability maintain big project/repo is very tough easier
- Deployment tough easier
- Tech stack stick to single tech(react/ng) independently use tech
- Infra cost easier more cost - due multiple application
- Complexity big project/repo is very tough easier
- Fault Isolation if any fault occur difficult to find easier
- Testing e2e testing easy tough
- Ownership central multiple owner
- Maintenances tough easier
- Debugging slightly easier tough

### 🎈 **2. Features, HLD, LLD & Planning**

`Dev Tinder Planning :`

- **_Requirements (by manager)_**

  1. Create an account
  2. login
  3. update profile
  4. feed page
  5. send connection request
  6. see our matches
  7. see request we have sent/requested
  8. update profile

- **_Tech Planning (by architect/SSDE)_**

  ->

  Frontend microservice - React

  Backend microservice - NodeJS, mongo DB

  ->

  _Security_

  JWT token

  ->

  _LLD_

  DB design

  user collection - (first name, last name, location, age, preference, email, password etc)

  connectionRequest - from, to, status (approved, rejected, ignored, pending)

  ->

  _API design {REST API}_

  get, post,{patch, put},delete - http methods

  POST / signup
  POST / login
  GET /profile
  POST /profile
  PATCH /profile
  DELETE /profile
  POST /sendRequest -> ignored/interested
  POST /overviewRequest -> accept/request
  GET /connections
  GET /requests

### 🎈 **3. Creating an Express Server**

`Folder Structure`

- .bin: Contains <ins>executable files</ins>.
- package.json: This is your <ins>project's configuration file</ins>. It lists project metadata and dependencies.
- package-lock.json: This file <ins>locks the exact versions</ins> of your project's dependencies, ensuring consistent installations across different environments.

`Versioning - 4.19.2`

Software versioning typically follows a MAJOR.MINOR.PATCH format:

- PATCH (2 -> 3): Denotes bug fixes or minor improvements that are backward compatible.
- MINOR (19 -> 20): Indicates new features that are still backward compatible.
- MAJOR (4 -> 5): Represents critical or breaking changes that are not backward compatible.

`Dependency Prefixes`

- ^ (Caret): If a new version is released, your project will automatically update to new minor and patch versions (e.g., 4.19.2 could update to 4.20.0).
- ~ (Tilde): Allows updates to new patch versions only.

`Request Handling`

- The first parameter in an Express route is the route path.
- The second parameter is the request handler function, which takes req (request) and res (response) objects.

`nodemon`
nodemon is a utility that automatically reloads your server when changes are detected in your code.

Install it globally. The -g flag means it's installed globally on your system, making it available for any project.

```javascript
    npm install -g nodemon
```

### 🎈 4. Routing & Request Handler

`Route Sequence Matters`

The order of your routes in Express is crucial. Express processes routes from <ins>top to bottom</ins>, matching the first one that fits the incoming request.

```javascript
app.use("/test/2", (req, res) => {
  // To get a search result for /test/2, this route must be placed before /test
  res.send("Hello from the server test/2 !!!");
});

// This route will match /test, /test/abc, /test/abc/def, /test/test, etc., as it only matches the initial path.
app.use("/test", (req, res) => {
  res.send("Hello from the server !!!");
});

app.use("/", (req, res) => {
  // This route should be kept at the very end; otherwise, all requests will always result in 'Namaste Node !!!'
  res.send("Namaste Node !!!");
});
```

When you hit any API call on the server from a browser, it will be a <ins>GET call by default<ins>.

`HTTP Methods`

```javascript
app.use('/user', () => {}): This will match all HTTP method API calls (GET, POST, PUT, DELETE, etc.) for the /user path.
app.get('/user', () => {}): This will only handle GET calls for the /user path.
app.post('/user', () => {}): This will only handle POST calls for the /user path.
```

Similarly, app.put(), app.delete(), etc., handle their respective HTTP methods.

> _Important_ : If you have an app.use() route defined before app.get(), app.post(), or app.delete() routes for the same path, the app.use() route will always be hit first. Remember, order matters!

Regular Expressions in Express
Express allows you to use regular expressions in your route paths for more <ins>flexible matching</ins>.

```javascript
app.get("/ab?cd", ()=>{}): This route will match acd or abcd. (In Express 5, characters like ?, +, \*, [], and () are handled differently than in version 4.)

app.get("/ab\*cd", ()=>{}): This will match endpoints like abcd, abXcd, abSOMErandomTEXTcd, and so on. It also matches abbbbbbbc as long as ab and c are present, followed by d.

app.get("/a(bc)?d", ()=>{}): This route will match ad or abcd. The (bc)? makes the bc group optional.

```

You can also use [JavaScript regular expressions]() directly:

```javascript
app.get(/.\*fish$/, (req, res) => {
  res.send("Matches paths ending with 'fish'");
});
```

- `Query Parameters :`

  To access query parameters from a URL like 'http://localhost:7777/user?userId=101', you can use req.query:

```javascript
app.get("/user", (req, res) => {
  console.log(req.query.userId); // Output: 101
  res.send(`User ID: ${req.query.userId}`);
});
```

- `Dynamic Routes (Route Parameters) :`

  For dynamic user IDs in URLs like 'http://localhost:7777/user/102' or 'http://localhost:7777/user/103', you can use route parameters (prefixed with a colon :):

```javascript
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params.userId); // Access userId
  console.log(req.params.name); // Access name
  console.log(req.params.password); // Access password
  res.send(
    `User details: ID - ${req.params.userId}, Name - ${req.params.name}`
  );
});
```

### 🎈 5. Route Handlers & Middleware

`Route Handlers`

- You must send a response: If a route handler doesn't send a response (e.g., using res.send(), res.json(), res.end()), the API call will hang indefinitely, as the client will keep waiting for a reply.
- Multiple route handlers: You can chain multiple route handlers for a single route. Express executes these handlers sequentially.

`How next() Works`

The next() function is a powerful tool in Express middleware. When called within a route handler, it passes control to the next middleware function in the stack that matches the current request.

- `Scenario 1:` Sending a response in the first handler

```javascript
app.get(
  "/user",
  (req, res) => {
    console.log("Response Log!!");
    res.send("First Response");
  },
  (req, res) => {
    console.log("2nd Response Log!!");
    res.send("Second Response");
  }
);
```

```javascript
Output: First Response
Console Log: Response Log!!
```

- `Scenario 2:` No response in the first handler

```javascript
app.get(
  "/user",
  (req, res) => {
    console.log("Response Log!!");
  },
  (req, res) => {
    console.log("2nd Response Log!!");
    res.send("Second Response");
  }
);
```

```javascript
Output: (Hanging)
Console Log: Response Log!!
```

- `Scenario 3:` next() called after res.send()

```javascript
app.get(
  "/user",
  (req, res, next) => {
    console.log("Response Log!!");
    res.send("First Response");
    next();
  },
  (req, res) => {
    console.log("2nd Response Log!!");
    res.send("Second Response");
  }
);
```

```javascript
Output: First Response
Console Log: Response Log!!, 2nd Response Log!!
Error (Terminal): Cannot set headers after they are sent to the client

"Explanation:" There will be an error ( Cannot set headers after they are sent to the client - because after client received first response, TCP connect is closed)
```

- `Scenario 4:` next() called before res.send()

```javascript
app.get(
  "/user",
  (req, res, next) => {
    console.log("Response Log!!");
    next();
    res.send("First Response");
  },
  (req, res) => {
    console.log("2nd Response Log!!");
    res.send("Second Response");
  }
);
```

```javascript
Output: Second Response
Console Log: Response Log!!, 2nd Response Log!!
Error (Terminal): Cannot set headers after they are sent to the client

"Explanation": There will be an error ( Cannot set headers after they are sent to the client - because JS is a synchronous single threaded language, so when next() is called, then in v8 call stack 2nd route handler code will be executed line by line, so second response sends, and TCP connect is closed. then 2nd route handler res.send("First Response") cod will be executed but connection has been closed, so get error on terminal, but it wouldn't effect frontend)
```

- `Scenario 5:` Chaining multiple handlers with next() and a final res.send()

```javascript
app.get(
  "/user",
  (req, res, next) => {
    console.log("1st Response Log!!");
    next();
    res.send("First Response");
  },
  (req, res, next) => {
    console.log("2nd Response Log!!");
    next();
  },
  (req, res, next) => {
    console.log("3rd Response Log!!");
    res.send("Third Response");
    next();
  }
);
```

```javascript
Output: Third Response
Console Log:

1st Response Log!!
2nd Response Log!!
3rd Response Log!!
  node:_http_outgoing:848
      throw new ERR_HTTP_HEADERS_SENT('remove');
      ^

  Error [ERR_HTTP_HEADERS_SENT]: Cannot remove headers after they are sent to the client

```

- `Scenario 6:` No res.send() in the last handler

```javascript
app.get(
  "/user",
  (req, res, next) => {
    console.log("1st Response Log!!");
    next();
  },
  (req, res, next) => {
    console.log("2nd Response Log!!");
    next();
  },
  (req, res, next) => {
    console.log("3rd Response Log!!");
    next();
  }
);
```

```javascript
Output: Cannot GET /user  (because 3rd next() is expect a next route handler but it's not there, )
Console Log: 1st Response Log!!, 2nd Response Log!!, 3rd Response Log!!
```

- `Scenario 7:` Hanging due to no response in the last handler

```javascript
app.get(
  "/user",
  (req, res, next) => {
    console.log("1st Response Log!!");
    next();
  },
  (req, res, next) => {
    console.log("2nd Response Log!!");
    next();
  },
  (req, res, next) => {
    console.log("3rd Response Log!!");
  }
);
```

```javascript
Output: (Hanging)
Console Log: 1st Response Log!!, 2nd Response Log!!, 3rd Response Log!!
"Explanation:" Similar to Scenario 2, the last handler executes its logic but neither sends a response nor calls next(), causing the request to hang.

```

- `Alternative Ways to Define Handlers` - With array

```javascript
// All these cases will have the same output if the internal logic is consistent
app.get("/user", rH1, rH2, rH3, rH4);
app.get("/user", [rH1, rH2, rH3, rH4]);
app.get("/user", [rH1, rH2], rH3, rH4);
app.get("/user", rH1, [rH2, rH3], rH4);
```

- `Alternative Ways to Define Handlers`

```javascript
app.get("/user", (req, res, next) => {
  console.log("1st Response Log!!");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("2nd Response Log!!");
  res.send("2nd Response");
});
```

```javascript
Output: 2nd Response
Console Log: 1st Response Log!!, 2nd Response Log!!
```

#### Middleware

`What is Middleware and Why Do We Need It?`

In Express.js, middleware refers to functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle (next). Essentially, they are functions that sit in the middle of a request and its eventual response.

`Why do we need Middleware?`

Middleware is essential for performing tasks that are common to multiple routes or need to happen before a request reaches its final handler. This promotes code reusability and modularity, preventing you from writing the same logic repeatedly across different routes.

Think of middleware as a series of checkpoints or processing stations that a request goes through before reaching its destination. Each checkpoint can perform a specific task, such as:

Authentication and Authorization: Checking if a user is logged in or has the necessary permissions to access a resource. This is a common use case, as shown in your authAdmin example.

Let's look at your authAdmin middleware:

```javascript
const authAdmin = (req, res, next) => {
  if (req.body.token === "XYZ") {
    next(); // If authorized, pass control to the next handler
  } else {
    res.status(401).send("Admin is not authorised"); // If not authorized, send an error response
  }
};

const userAdmin = (req, res, next) => {
  if (req.body.token === "XYZ") {
    next();
  } else {
    res.status(401).send("Admin is not authorised");
  }
};

module.exports = {
  authAdmin,
  userAdmin,
};
```

```javascript
const { authAdmin, userAdmin } = require("./middleware/auth");

// Applying authAdmin middleware to all routes starting with "/admin"
// This means any request to /admin/getAllData or /admin/deleteData will first go through authAdmin
app.use("/admin", authAdmin);

// Example of applying middleware to a specific GET route
app.get(
  "/user",
  userAdmin, // another way to use auth middleware
  (req, res, next) => {
    // This is a middleware function within the route chain
    console.log("2nd Response Log!!");
    next(); // Pass control to the next handler
  },
  (req, res, next) => {
    // This is the actual request handler, which will be reached after all preceding middleware
    console.log("3rd Response Log!!");
  }
);

app.get("/admin/getAllData", (req, res) => {
  // This route handler will only be reached if authAdmin passes
  console.log("admin all data");
  res.send("Admin data fetched!");
});

app.get("/admin/deleteData", (req, res) => {
  // This route handler will also only be reached if authAdmin passes
  console.log("admin data deleted");
  res.send("Admin data deleted!");
});
```

`How Express.js Handles Requests Behind the Scenes?`

When an HTTP request arrives at an Express.js server, here's a simplified breakdown of what happens:

- Request Reception: Express receives the incoming HTTP request.
- Route Matching: Express starts iterating through its registered routes from top to bottom (in the order they were defined with app.use(), app.get(), app.post(), etc.).
- Middleware Chain Execution: Once a matching route is found, Express executes any middleware functions associated with that route, in the order they are defined. Each middleware function can perform operations on the req and res objects.
- next() Progression: If a middleware function calls next(), control is passed to the next middleware function in the chain or to the final route handler.
- Response Sent: Eventually, a middleware or the final route handler will send a response back to the client (e.g., using res.send(), res.json(), res.end()). This action terminates the request-response cycle, and no further middleware or handlers will be executed for that particular request.
- Cycle Completion: The connection between the client and the server is closed after the response is sent.
- Generally, for almost all requests, you will use middleware at some point to handle common tasks before the final business logic is executed.

`app.all()`

| Feature       | app.use()                                       | app.all()                                                 |
| :------------ | :---------------------------------------------- | :-------------------------------------------------------- |
| Primary Use   | Mounting middleware (global or path-prefix)     | Applying handlers for all HTTP methods on a specific path |
| Path Matching | **Prefix matching** (/users matches /users/123) | **Exact path matching** (/users only matches /users)      |
| HTTP Methods  | All methods                                     | All methods                                               |
| Middleware    | Type General-purpose middleware, can be global  | Route-specific handler that catches all methods           |
| Code          |

```javascript
// Global middleware - runs for all requests
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

// Middleware applied to any path starting with /api/v1
app.use("/api/v1", (req, res, next) => {
  console.log("API v1 request specific middleware");
  next();
});

app.get("/api/v1/users", (req, res) => {
  res.send("GET /api/v1/users");
});

app.post("/api/v1/products", (req, res) => {
  res.send("POST /api/v1/products");
});
```

|

```javascript
// This middleware runs for any HTTP method to the exact path '/data'
app.all("/data", (req, res, next) => {
  console.log(`Accessing /data with method: ${req.method}`);
  // Perform common validation or logging for all methods on /data
  next();
});

app.get("/data", (req, res) => {
  res.send("Fetched data.");
});

app.post("/data", (req, res) => {
  res.send("Created data.");
});

app.delete("/data", (req, res) => {
  res.send("Deleted data.");
});
```

`Error Handling in Express.js`

- **Local try...catch for Synchronous Code**

Use try...catch blocks for synchronous operations within your route handlers or middleware. This lets you immediately manage errors at their source.

```javascript
app.use("/admin", (req, res, next) => {
  try {
    if (!req.body.token || req.body.token !== "ADMIN_KEY") {
      throw new Error("Unauthorized.");
    }
    next(); // All good, move on
  } catch (error) {
    res.status(401).send(error.message); // Send specific error to client
  }
});
```

- **Centralized Error Handling Middleware**

For all other errors, especially those from asynchronous operations or those passed via next(error), set up a centralized error-handling middleware. This special middleware has four arguments ((err, req, res, next)) and should be placed at the very end of your Express app setup.

```javascript
// Example route that might throw an async error
app.get("/async-data", async (req, res, next) => {
  try {
    const data = await someAsyncOperation(); // Imagine this fails
    res.json(data);
  } catch (error) {
    next(error); // Pass error to the centralized handler
  }
});

// --- Place this LAST in your app.js or server.js ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message || "Something went wrong!"); // Send a generic message to client
});
```

**Key Principles:**

- Always Respond: Ensure every request eventually gets a response, even if it's an error. Otherwise, the client will hang.
- next(error): Use next(error) to forward errors to your centralized handler, skipping normal middleware/routes.

### 🎈 6. Database,Schema & Models | Mongoose

`Connecting to the Database`

**In config file**

- mongodb+srv://enctest021:L2jrIxW9PyDJAUdl@namastenode.3yevtr3.mongodb.net/ -> **_connect to cluster_**
- mongodb+srv://enctest021:L2jrIxW9PyDJAUdl@namastenode.3yevtr3.mongodb.net/devTinder -> **_connect to a particular DB_**

```javascript
const mongoose = require("mongoose");

// It's best practice to store sensitive information like DB URIs in environment variables.
const DB_URI =
  "mongodb+srv://enctest021:L2jrIxW9PyDJAUdl@namastenode.3yevtr3.mongodb.net/devTinder";

async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
```

`Best way :`

1. Connect to the DB at the entry point of your application (e.g., in app.js or server.js)
2. Then start the Express server

```javascript
connectDB()
  .then(() => {
    console.error("Database connection is establised.");

    app.listen(3000, () => {
      console.log("server is successfully listning on port 3000.");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
```

`Schemas :`

A Mongoose Schema defines the structure, data types, and validation rules for documents within a MongoDB collection.
Identity for a collection.

Example: For a user collection, fields might include firstName, lastName, email, location, etc.

Naming Convention: Follow **_camelCase for schema names_** (e.g., userSchema, productSchema).

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Default value if not provided
    },
    createdDate: { type: Date, default: Date.now }, // This way also we can create date
  },
  {
    // Schema options:
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
```

- Mongoose automatically adds `_id` (unique identifier) and `__v` (version key)
- You should **never** manually create or manage `_id`.
- To add date we can use `timestamps` or `manually create date`.

`Models : `

A Mongoose Model is a "fancy constructor compiled from Schema definitions."

An instance of a model is called a `document`. Models are responsible for creating and reading documents from the underlying MongoDB database.

Naming Convention: Model names should always start with a **_Capital Letter_** (e.g., User, Product, Order).

`JavaScript Object vs. JSON :`

- **JavaScript Object**:

  - A native data structure in JavaScript. It can contain various data types, including functions, Date objects, undefined, and even circular references. It's an in-memory representation.

    ```javascript
    const jsObject = {
      name: "Alice",
      age: 30,
      birthDate: new Date(),
      greet: function () {
        console.log("Hello");
      },
    };
    ```

- **JSON (JavaScript Object Notation)**:

  - JSON can only represent a limited set of data types: strings, numbers, booleans, null, arrays, and objects (**key-value pairs where `keys are strings`**). Functions, Date objects (they become strings), and undefined are not directly supported in JSON.
  - It's primarily used for data transmission between a server and web application, or as a data storage format.

    ```javascript
    {
      "name": "Bob",
      "age": 25,
      "isStudent": true,
      "hobbies": ["reading", "hiking"]
    }
    ```

`app.ues(express.json()) `

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.

- Get - [descending sorted data]

```javascript
  find().sort(\_id:'desc'),
  const users = await User.find().sort({
      _id: "desc",
    });
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.send("No user available.");
    }

  findOne().sort(\_id:'asc') - multiple same users but return on one, but which one return
```

- Delete

```javascript
User.findByIdAndDelete(req.params?.userId);
```

`PUT VS PATCH :`

| PUT (Full Replacement)                                                                                                             | PATCH (Partial Update)                                                                                                                                         |
| :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Used to replace an entire resource with new data.                                                                                  | Used to apply partial modifications to a resource.                                                                                                             |
| The request body should contain the complete, updated representation of the resource.                                              | The request body should contain only the changes (the fields to be updated).                                                                                   |
| If a field is omitted from the PUT request, it implies that the field should be removed or set to its default value on the server. | Fields not included in the PATCH request are left untouched on the server.                                                                                     |
| Often idempotent (multiple identical PUT requests will have the same effect as a single one).                                      | Not necessarily idempotent, as applying the same patch multiple times might lead to different results if the patch describes an operation rather than a state. |

### 🎈 7. Data Sanitization & Schema Validations

- In schema level, Custom validate/validate() only work for new document. To make it work for update also , we need to explicitly add 'runValidators: true',
- Restrict random field update
- Always add field validation, even its okay if not add it on UI.
- Information leaking - showing email present is not

`Validator` - npm i validator

- `API level validation`

  ```javascript
  onst validator = require("validator");

  const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, age } = req.body;

    if (!firstName || !lastName) {
      throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
      throw new Error("Email is not correct formated.");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not correct formatted.");
    }
  };

  module.exports = { validateSignUpData };
  ```

- `Schema level validation`

  ```javascript
  const mongoose = require("mongoose");
  const validator = require("validator");

  const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true, maxLength: 20 },
      lastName: { type: String, maxLength: 20 },
      emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validator(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is not correct formated.");
          }
        },
      },
      password: { type: String, required: true },
      age: { type: Number, min: 18 },
      gender: {
        type: String,
        validate(value) {
          if (!["Male", "Female", "Other"].includes(value)) {
            throw new Error("Gender data is not valid");
          }
        },
      },
      skill: {
        type: [String],
        validate(value) {
          if (value.length > 2) {
            throw new Error("You can add only 2 skills.");
          }
        },
      },
      about: { type: String, default: "This is a default about of a user" },
      createdDate: { type: Date, default: Date.now },
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.model("users", userSchema);

  module.exports = User;
  ```

`Encrypt/Decrypt password` - npm i bcrypt

- Login :

```javascript
app.get("/loginUser", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error("Invalid Credential!!");
    }
    console.log(password, user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password); // Decript the data

    if (!isPasswordValid) {
      throw new Error("Invalid Credential!!");
    }

    res.send("Login Successfully !!");
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});
```

- Insert :

```javascript
app.post("/signupUser", async (req, res) => {
  try {
    // validate data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Encript the data
    // bcrypt.hash(password, 10).then(function (hash) {
    //   console.log(hash);
    // });

    const hashPassword = await bcrypt.hash(password, 10); // Encript the data

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashPassword,
      age: age,
      gender: gender,
    });
    await user.save();
    res.send("User created successfully.");
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});
```

- Update - `any new field in updates will be ignored by mongoose`

```javascript
app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const { firstName, lastName, location, age, gender, skill } = req.body;

  const filter = { _id: userId };
  const data = req.body;

  try {
    const updateAllowed = [
      "firstName",
      "lastName",
      "password",
      "age",
      "skill",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      updateAllowed.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    const updatedData = await User.findOneAndUpdate(
      filter,
      {
        firstName: firstName,
        lastName: lastName,
        location: location,
        age: age,
        gender: gender,
        skill: skill,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    res.send("User created successfully." + updatedData);
  } catch (error) {
    res.status(400).send("Something wrong !!!!" + error.message);
  }
});
```
