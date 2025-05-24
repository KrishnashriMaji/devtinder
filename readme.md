# Namaste DevTinder 😊🚀🚀

This document outlines key concepts for creating and managing an Express server, including folder structure, versioning, routing, request handling, and dynamic routes.

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

|
