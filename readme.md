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
