# Namaste DevTinder 😊🚀🚀

This document outlines key concepts for creating and managing an Express server, including folder structure, versioning, routing, request handling, and dynamic routes.

### 🎈 **1. Introduction to NodeJS**

`What is Node.js?`

- Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- NodeJS is build by OpenJS community where have a lot of senior developers who decide what will be the future of NodeJS.
- When JS came up, it only run on web browser to make dynamic web site, it is the main core, but when NodeJS introduces then we can run JavaScript everywhere, its not only limited to web browser.
- Node.js features an event-driven architecture and supports asynchronous
  I/O (non-blocking I/O).
- Wherever there is JavaScript, there always be a JavaScript engine, without it can't write JS code.

`History : `

- 2009 -

  - NodeJS was built by Ryan Daul. He started with spider monkey JS engine (Firefox) but in 2 days he tried using v8 engine (google) and never looked back.

  - Joyent Company worked on something similar to NodeJS (web.js) - (creating webserver - non blocking i/o), they hire Ryan - and fund this project.
  - The earlier name of Node.js was Web.js, but Ryan Dahl later renamed it to Node.js because it was intended to be used for more than just web servers.
  - Apache Http Server was a blocking server, so Ryan wanted to create a nonblocking server, which is why Node.js is a non-blocking I/O.
  - The advantage of a non-blocking server is that it can handle multiple requests with a smaller number of threads.

- 2010 - NPM was introduced. and NPM is a package manager for node. NodeJS is not very successful if there is no NPM.
- 2011 - Initially NodeJS is build only for mac OS and Linux but in 2011 it is supported on window also. Joyent + Microsoft
- 2012 - In 2012, Isaac Z. Schlueter began maintaining Node.js; he is also the creator of NPM
- 2014 - A developer named Fedor fork on Node.js and named io.js and controversy happened inside the company and 3-4 developer started maintaining io.js branch.
- 2015 - both io.js & node.js were merged and called it Node JS foundation.
- 2019 - JS foundation & node JS foundation both this merged and OpenJS foundation has build which maintains NodeJS at present.

---

### 🎈 **2. JS on server**

`What is a server?`

Server is a remote computer which receive requests. Cloud means also same server.

When you search google.com, you make a request to the server/remote computer.

`What is IP address?`

An IP address, or Internet Protocol address, is a unique number that identifies every device connected to the internet.

`What is v8?`

V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in <ins> **_Chrome and in Node.js, among others_**</ins> . It implements <ins> **_ECMAScript and WebAssembly_**</ins> , and runs on Windows, macOS, and Linux systems that use x64, IA-32, or ARM processors. <ins> **V8 can be embedded into any C++ application**</ins> .

So, javaScript is nothing but a C++ program.

`The process works as follows:`

JS(high level language) -> V8(C++) translate to -> machine and assembly code

(low level code - refers to programming languages or code that is closer to machine language and hardware. )

- **Machine Language**: The most basic form of low-level code, consisting of binary (0s and 1s) instructions that the computer's CPU can directly execute.
- **Assembly Language**: A step above machine language, assembly language uses symbolic representations (mnemonics) for operations and memory addresses, making it somewhat easier for humans to read and write. Each assembly instruction corresponds to a specific machine language instruction.

`NODEJS is a C++ application with v8 JS Engine embedded into it`

- ECMA Script is a standard that JavaScript & other language follow. ECMAScript standards are followed by JavaScript engines like V8, SpiderMonkey, Chakra, and others to ensure consistent behavior across different environments.

- <ins>So , v8 engines has to follow this ECMA standards. and node.js has v8 engines, but node.js also has some superpowers, such as api calls on servers, which make it more powerful than v8 engines alone, which cannot do database connections, api calls etc. because of ECMA standards. and this is known as the JS runtime.</ins>

  Server -> Node JS -> V8 engine(ECMA script) & super power (API on server/modules)

---

### 🎈 **3. JS on server**

`Writing code :`

Node REPL [Read, Evaluate, Print, Loop]

- write command on
- You can now write and execute any code on REPL (Read-Evaluate-Print Loop).
- its similar to a browser console.

`Global Objects in NodeJS : ` (https://developer.mozilla.org/en-US/docs/Glossary/Global_object)

- The **_window_** object is a global object provided <ins>**by the browser</ins>**, not by the V8 engine.

  Same <ins>**this/frame/self</ins>** will give same value.

- In Node.js, the global object is known as **_global_** , which is equivalent to the window object in the browser.

  A **_global_** object is not a part of the V8 engine; instead, it’s a feature provided by Node.js.

  This global object offers various functionalities, such as setTimeout() , setInterval() , and more.

**Important Note:**

> console.log(this); // Outputs: **{}**

When you use console.log(this); at the global level in Node.js, it will log an <ins>**empty object**</ins>, indicating that this does not refer to the global object in this context.

`Global this`

**_globalThis_** is always a global object, regardless of where it is accessed. It was introduced in ECMAScript 2020 to provide a standardized way to refer to the global object in any environment (browsers, Node.js, etc.).

- **_In browsers, global_** is equivalent to window .
- **_In Node.js, globalThis_** is equivalent to global .

It provides a consistent way to access the global object without worrying about the environment.

---

### 🎈 **4. Module Export & Requirements**

A new file created means create a new module.

`How do you make two modules work together?`

Using a require function

`If I write a function in another module, can I use that function in a different module? Will it work or not?`

It will not work. because Modules protect their variables and functions from leaking by default.

`So, how do we achieve that?`

We need to export private variables and functions using module.exports to access and utilize those variables and functions. You also need to import them.

```javascript
// In sum.js,
module.exports = {x, calculateSum};

const obj = require('./sum.js) / require('./sum);  // you can add .js or only file name
```

`Module pattern :`

| Common js module(CJM)                                                | es module(mjs/ESM)                                                                       |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| module.exports & require                                             | import & export                                                                          |
| by default used in nodeJS                                            | by default used in modern framework(react,angular)                                       |
| older way                                                            | newer way                                                                                |
| synchronous                                                          | asyc                                                                                     |
| non strict mode <br/>(ex. without var we can define variable - z=10) | strict mode <br/>(ex. without var we can't define variable - var z=10, else throw error) |

`Synchronous vs. Asynchronous:`

- CommonJS requires modules in a synchronous manner, meaning the next line of code will execute only after the module has been loaded.
- In contrast, ES modules load modules asynchronously, allowing for more efficient and flexible code execution. This distinction is a powerful feature and an important point to remember for interviews.

`Strict Mode:`

Another significant difference is that CommonJS code runs in non-strict mode, while ES modules execute in strict mode. This means that ES modules enforce stricter parsing and error handling, making them generally safer and more reliable.

Overall, ES modules are considered better due to these advantages.

- To use ES modules,

```javascript
// package.json

{
  type: "module"; // by default its common js
}
```

`What is module.exports ?`

module.exports is an empty object by default.

- Another common pattern

```javascript
module.exports = {
  x,
  calculateSum,
};

module.exports.x = x;
module.exports.calculateSum = calculateSum;
```

- one more pattern -

  - create folder (calculate)
  - inside this folder a new module (index.js) which is a collection of modules(sum.js & multiply.js). </br>
    index.js -> sum.js + multiply.js

```javascript
// in app.js,
const { calculateSum, calculateMultiply } = require("./calculate"); // no need to write './calculate/index.js'
```

`But why are we doing all this?`

When you have a large project with hundreds of files,it’s beneficial to group related files together and create separate modules. In this case, the calculate folder serves as a new module that encapsulates related functionality, such as the calculateSum and calculateMultiply functions. By organizing your code into modules, you improve maintainability, readability,
and scalability, making it easier to manage and navigate your codebase.

- we can impore json ( data.json ) with require
- we can import Node js module - const util = require('node:util');

In general, a module can be a single file or a folder. A module is essentially a collection of JavaScript code that is private to itself and organized separately. If you want to export something from a module, you can use module.exports to expose the desired functionality to other parts of your application.

---

### 🎈 **5. Diving into the NodeJS Github repo.**

Behind the scenes

In JavaScript, when you create a function…

```javascript
function x() {
  const a = 10;
  function b() {
    console.log("b");
  }
}
console.log(a);
//op - a is not defined
```

`Will you be able to access this value? `
A: no

`Q: if u execute this code, will you be able to access it outside the function?`

A: You cannot access a value outside the function x because it is defined within the function's scope. Each function creates its own scope, so variables inside a function are not accessible from outside that function.

**_imp concept 🧐_**

> Modules in Node.js work similarly to function scopes. When you require a file,
> Node.js wraps the code from that file inside a function. This means that all
> variables and functions in the module are contained within that function’s
> scope and cannot be accessed from outside the module unless explicitly
> exported.

> To expose variables or functions to other modules, you use module.exports . This
> allows you to export specific elements from the module, making them
> accessible when required elsewhere in your application.

> All the code of a module is wrapped inside a function when you call **require** .
> This function is not a regular function; it’s a special type known as an IIFE
> (**_Immediately Invoked Function Expression_**). Here’s how it works:

```javascript
(function () {
  // All the code of the module runs inside here
})();
```

In this pattern, you create a function and then immediately invoke it. This is <ins>different from a normal function</ins> in JavaScript, which is defined and then called separately:

```javascript
function x() {}
x();
```

`In Node.js, before passing the code to the V8 engine, it wraps the module code inside an IIFE. `

The purpose of IIFE is to:

1. **Immediately Invoke Code:** The function runs as soon as it is defined.
2. **Keep Variables and Functions Private:** By encapsulating the code within the IIFE, it prevents variables and functions from interfering with other parts of the code. This ensures that the code within the IIFE remains independent and private.

Using IIFE solves multiple problems by providing scope isolation and immediate execution.

**_very Imp:_**

`Q1: How are variables and functions private in different modules?`

A: because of IIFE and the requirement (statement) wrapping code inside IFE.

`Q2: How do you get access to module.exports ? Where does this module come from?`

A: In Node.js, when your code is wrapped inside a function, this function has a parameter named **module** . This parameter is an object provided by Node.js that includes <ins>module.exports </ins>.

```javascript
// multiply.js
function calculateMultiply(a, b) {
  const result = a * b;
  console.log(result);
}

module.exports = { calculateMultiply };
```

```javascript
// xyz.js
(function (module, require) {
  require("./multiply");

  function calculateMultiply(a, b) {
    const result = a * b;
    console.log(result);
  }

  module.exports = { calculateMultiply };
})(module, require);
```

`How require() Works Behind the Scenes?`

1. **Resolving the Module :**
   Node.js first determines the path of the module. It checks whether the path is a local file ( ./local ), a JSON file ( .json ), or a module from the node_modules directory, among other possibilities.
2. **Loading the Module :**
   Once the path is resolved, Node.js loads the file content based on its type. The loading process varies depending on whether the file is JavaScript, JSON, or another type.
3. **Wrapping Inside an IIFE :**
   The module code is wrapped in an Immediately Invoked Function Expression (IIFE). This wrapping helps encapsulate the module's scope, keeping variables and functions private to the module.
4. **Code Evaluation and M odule Exports :**
   After wrapping, Node.js evaluates the module’s code. During this evaluation, module.exports is set to export the module's functionality or data. This step essentially makes the module's exports available to other files.
5. **Caching(very imp) :**
   Importance: Caching is crucial for performance. Node.js caches the result of the require() call so that the module is only loaded and executed once

**_Example :_**

Suppose you have three files: sum.js , app.js , and multiply.js . All three files require a common module named xyz .

Initial Require:

When sum.js first requires xyz with require('./xyz') , Node.js performs the full require() process for xyz :

1. Resolving the path to xyz .
2. Loading the content of xyz .
3. Wrapping the code in an IIFE.
4. Evaluating the code and setting module.exports .
5. Caching is the result.

   Node.js creates a cached entry for xyz that includes the evaluated module exports.

   `Subsequent Requires:`

   When app.js and multiply.js later require xyz using require('./xyz') , Node.js skips the initial loading and evaluation steps. Instead, it retrieves the module from the cache. This means that for app.js and multiply.js , Node.js just returns the cached module.exports without going through the resolution, loading, and wrapping steps again.

`Impact on Performance:`

If caching did not exist, each require('./xyz') call would repeat the full module loading and evaluation process. This would result in a performance overhead, especially if xyz is a large or complex module and is required by many files. With caching, Node.js efficiently reuses the module’s loaded and evaluated code, significantly speeding up module resolution and reducing overhead.

`Node.js GitHub repo`

v8 - https://github.com/nodejs/node/tree/main/deps/v8

libuv - https://github.com/nodejs/node/tree/main/deps/uv

- Libuv is the most amazing superpower.
- Node.js is popular just because of libuv
- libuv plays a critical role in enabling Node.js's high performance and scalability. It provides the underlying infrastructure for asynchronous I/O, event handling, and cross-platform compatibility.

In the Node.js repository, if you navigate to the lib directory, you'll find the core JavaScript code for Node.js. This lib folder contains the source code for various built-in modules like http , fs , path , and more. Each module is implemented as a JavaScript file within this directory.

`Where is setTimeout coming from and how it work behind scenes ?`

Ref - https://github.com/nodejs/node/blob/main/lib/timers/promises.js#L53

require in nodejs repo

the makeRequireFunction creates a custom require function for a given module mod .

This function:

- Validates that mod is an instance of Module .
- Defines a require function that uses mod.require() to load modules.
- Implements a resolve method for resolving module paths using Module.\_resolveFilename() .
- Implements a paths method for finding module lookup paths using Module.\_resolveLookupPaths() .
- Sets additional properties on the require function, such as main , extensions ,
  and cache .

[<img src="./readme_images/image-6.png" width="250"/>](./readme_images/image-6.png)

---

### 🎈 **6. libuv & async IO**

> "Node.js has an event-driven architecture capable of asynchronous I/O.”

`Q: What is Thread?`

A thread is the smallest unit of execution within a process in an operating system. It represents a single sequence of instructions that can be managed independently by a scheduler. Multiple threads can exist within a single process, sharing the same memory space but executing independently. This allows for parallel execution of tasks within a program, improving efficiency and responsiveness.

Threads can be either:

1. Single-threaded
2. Multi-threaded

`Q: What type of threading does JavaScript use?`

JavaScript is a synchronous, single-threaded language, meaning there is only one thread in which the JavaScript engine (such as the V8 engine) runs. In JavaScript, code is executed line by line within this single thread.

In other languages like C++ or Java, code can be executed across multiple threads. For example, a portion of the code might be executed in one thread, while another part runs simultaneously in a different thread.

However, JavaScript handles this process more straight forwardly, executing code one line after the other in sequence.
So, if you're executing line 2 in JavaScript, it will only run after line 1 has finished executing. This is the essence of synchronous execution: each task is performed one after the other, without overlap.

`Synchronous vs Asynchronous JavaScript`

`Q: What is a Synchronous System?`

In a synchronous system, tasks are completed one after another

`Q: What is an Asynchronous System?`

In this system, tasks are completed independently.

> So, JavaScript itself is synchronous, but with the power of Node.js, it can
> handle asynchronous operations, allowing JavaScript to perform multiple tasks concurrently.

`Q: what are the portions inside the JS engine and How synchronous code is executed By JS Engine ?`

A:

- The JavaScript engine operates with a single **_call stack_**, and all the code you write is executed within this call stack. The engine runs on a single thread, meaning it can only perform one operation at a time.

- In addition to the call stack, the JavaScript engine also includes a **_memory heap_**. This memory heap stores all the variables, numbers, and functions that your code uses.

- One key feature of the JavaScript V8 engine is its **_garbage collector_**. The garbage collector automatically identifies and removes variables that are no longer in use, freeing up memory.

Unlike languages like C++, where developers need to manually allocate and deallocate memory, JavaScript handles this process automatically. This means you don't have to worry about memory management—it's all taken care of by the engine.

`Now, lets see how code is executed inside`

- **Step 1: Global Execution Context Creation**

  As soon as the JavaScript engine begins executing the code, it creates a Global Execution Context. This is the main environment where the top-level code is executed. The global execution context is unique and is always the first to be pushed onto the call stack.

  [<img src="./readme_images/image-7.png" width="800"/>](./readme_images/image-7.png)

- **Step 2: Memory Creation Phase**

  Before any code is executed, the JavaScript engine enters the memory creation phase. During this phase:

  - Variables a and b are declared in memory and initialized to undefined .
  - The function multiplyFn is also stored in memory, with its value set to the entire function definition.

  [<img src="./readme_images/image-8.png" width="800"/>](./readme_images/image-8.png)

- **Step 3: Code Execution Phase**

  Once the memory creation phase is complete, the engine moves to the code execution phase:

  - Execution of let a = 10786; and let b = 20987; : The variables a and b are now assigned their respective values.
  - Execution of let c = multiplyFn(a, b); : The function multiplyFn is invoked, creating a new execution context specifically for this function.

  [<img src="./readme_images/image-9.png" width="800"/>](./readme_images/image-9.png)

- **Step 4: Function Execution Context Creation**

  When multiplyFn(a, b) is called, the JavaScript engine:

  Creates a new execution context for multiplyFn and pushes it onto the top of the call stack.
  In this new context, the parameters x and y are assigned the values of a and b .

- **Step 5: Memory Creation and Code Execution Inside multiplyFn**

  Inside multiplyFn , the memory creation phase initializes result in memory with undefined .

  - Execution of const result = a \* b; : The multiplication is performed, and result is assigned the value 226215682 .

    [<img src="./readme_images/image-10.png" width="800"/>](./readme_images/image-10.png)

  - Execution of return result; : The function returns 226215682 , and the multiplyFn execution context is popped off the call stack.

    [<img src="./readme_images/image-11.png" width="800"/>](./readme_images/image-11.png)

- **Step 6: Resuming Global Execution Context**

  Back in the global execution context, the returned value from multiplyFn ( 226215682 ) is assigned to the variable c .

  [<img src="./readme_images/image-12.png" width="800"/>](./readme_images/image-12.png)

- **Step 7: Once the entire code is executed, the global execution context is also popped out, and the call stack becomes empty.**

  [<img src="./readme_images/image-13.png" width="400"/>](./readme_images/image-13.png)

`Q: How asynchronous code executed?`

> The JavaScript engine cannot do this alone; it needs superpowers. This is where
> Node.js comes into the picture, giving it the ability to interact with operating
> system functionalities.

The JS engine gains its superpowers from Node.js. Node.js grants these powers through a library named <ins>Libuv</ins> —our superhero.

The JS engine cannot directly access OS files, so it calls on Libuv. Libuv, being very cool and full of superpowers, communicates with the OS, performs all the necessary tasks, and then returns the response to the JS engine. He offloads the work and does wonders behind the scene.

- The variables let a and let b are executed within the GEC (Global Execution Context) during the synchronous phase of the code execution process.
- However, when the code encounters <ins>an API call</ins>, the V8 engine, while still operating within the GEC, recognizes that it's dealing with an asynchronous operation. At this point, the V8 engine signals libuv —the superhero of Node.js —to handle this API call.
- What happens next is that libuv registers this API call, including its associated callback function (name - A), within its event loop, allowing the V8 engine to continue executing the rest of the code without waiting for the API call to complete.
- Next, when the code encounters a setTimeout function, a similar process occurs.
- The V8 engine identifies this as another asynchronous operation and once again notifies libuv .
- Following this, when the code reaches a file operation (like reading or writing a file), the process is similar.
- The V8 engine recognizes this as another asynchronous task and alerts libuv .
- libuv then registers the file operation and its callback in the event loop.

[<img src="./readme_images/image-14.png" width="800"/>](./readme_images/image-14.png)

Next, when the code executes

- let c = multiplyFn(a, b); , the JavaScript engine creates a new function context for multiplyFn and pushes it onto the call stack.
- The function takes two parameters, x and y , and within the function, the engine multiplies these values ( a \* b ) and stores the result in the result variable.
- The JavaScript engine handles this operation as part of the synchronous code execution
- Next, when the code executes
  let c = multiplyFn(a, b); the JavaScript engine creates a new function context for multiplyFn and pushes it onto the call stack.
- Once the multiplyFn completes its execution and returns the result, the function context is popped off the call stack, and the result is assigned to the variable c

`imp concept :`

- When the function execution context is popped off the call stack, the garbage collector may clear any memory allocated for that context in the memory heap, if it is no longer needed.
- After console.log(c) is executed and the value of c is printed to the console, the global execution context will also eventually be removed from the call stack if the code execution is complete.
- With the global context popped off the call stack, the JavaScript engine has finished processing, and the program ends.
- Now the call stack becomes empty, the JavaScript engine can relax, as there is no more code to execute.
- At this point, libuv takes over the major tasks. It handles operations such as processing timers, managing file system calls, and communicating with the operating system.
- libuv performs these heavy tasks in the background, ensuring that asynchronous operations continue to be managed effectively.

In summary, <ins> Node.js excels in handling asynchronous I/O operations, thanks to its non-blocking I/O model. </ins>

libuv is a multi-platform support library with a focus on asynchronous I/O.

- **Async I/O** -> ex. reading file and give output
- **Non blocking I/O** -> because this is not blocking main thread.

> all these stuff will help you to be a senior developer where if there is any performance issue on server,
> you can debug is it >blocking main thread or not. it also help you to write good code during development.

---

### 🎈 **7. sync, async,setTimeoutZero - code**

```javascript
const https = require("node:https");
const fs = require("node:fs");
const crypto = require("node:crypto");

console.log("Hello World !!");

var a = 107;
var b = 20;

// synchronous
fs.readFileSync("./file.txt", "utf8"); // 10ms
console.log("This will execute only after file load");

crypto.pbkdf2Sync("password", "salt", 500000, 50, "sha512");
console.log("First key is generated.");

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err, key) => {
  console.log("Second key is generated.");
});

https.get("https://dummyjson.com/users", (res) => {
  console.log("api fetched data successfully");
});

setTimeout(() => {
  console.log("setTimeOut called after 5 sec");
}, 5000);

// async function
fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log("file data", data);
});

function multiplyFn(x, y) {
  const result = x * y;
  console.log("multiplyFn", result);
}
multiplyFn(1, 2);



//----output----------------//

Hello World !!
This will execute only after file load
First key is generated.
multiplyFn 2
file data ABC
Second key is generated.
api fetched data successfully
setTimeOut called after 5 sec

```

`fs.readFileSync("./file.txt", "utf8");`

This function reads the contents of a file synchronously, meaning it will actually block the main thread while it’s running.

`What does this mean?`

The V8 engine is responsible for executing JavaScript code, but it cannot offload this task to Libuv (which handles asynchronous operations like I/O tasks). The main thread is blocked until the file is completely read.

This causes performance issues because the code execution will be halted at that point (e.g., line 10) until the file reading operation is complete.

`Best Practice`

- <ins>Avoid using synchronous methods in production code</ins> whenever possible, especially in performance-critical applications, because they can slow down your application by blocking the event loop.
- Instead, use asynchronous methods like fs.readFile() that allow other operations to continue while the file is being read, keeping the application responsive.

`Another example of blocking code in Node.js.`

**Crypto Module** - It is a core library which is used for cryptographic operations like generating secure keys, hashing passwords, and more

The first key is generated first because it's synchronous, while the second key is generated afterward because it's asynchronous

> Important Note: <br/>
> When you see Sync at the end of a function name (like pbkdf2Sync ), it means
> that the function is synchronous and will block the main thread while it’s running.

`Q: Why is setTimeout(0) Executed After the Multiplication Result?`

The Reason:

**Asynchronous Operation:** setTimeout is an asynchronous function, meaning it doesn't block the execution of the code. When you call setTimeout , the callback function is passed to Libuv (Node.js's underlying library), which manages asynchronous operations.

**Event Loop and Call Stack:** The callback function from setTimeout(0) is added to the event queue. However, it won't be executed until the current call stack is empty. This means that even if you specify a 0-millisecond delay, the callback will only execute after the global execution context is done.

**Trust Issues with setTimeout(0) :** When you ask the code to run after 0 milliseconds, it doesn't necessarily run immediately after that time. It runs only when the call stack is empty. This introduces some "terms and conditions," meaning that the actual execution timing is dependent on the state of the call stack.

---

### 🎈 **8. Deep dive into v8 JS Engine**

read documentation on web -> https://v8.dev/docs, https://v8.dev/blog

`Behind the Scenes: Parsing Stage in V8 Engine`

When JavaScript code is executed, it goes through several stages in the V8 engine. The first stage is <ins>parsing</ins>, which includes lexical analysis and tokenization.

Here’s how it works:

- `Parsing Stage: Lexical Analysis and Tokenization`

  - Lexical Analysis :

    **Purpose:** The main goal of lexical analysis is to break down the raw JavaScript code into manageable pieces called **tokens**.

    - **Input Code:** var a = 10; <br/>Tokens -> ['var','a','=','10',';']

  - Tokenization :

    Tokenization is the process of converting code into a series of tokens. Each token represents a fundamental element of the language, such as keywords, operators, identifiers, and literals.

    Example:<br/>
    For the code var a = 10; , the tokens might be:<br/>
    var (keyword)<br/>
    a (identifier)<br/>
    = (operator)<br/>
    10 (literal)<br/>
    ; (punctuation)<br/>

    **Why Tokenization?:**

    Tokenization helps the V8 engine to read and understand the code more effectively by breaking it down into smaller, more manageable pieces. This step is crucial for further analysis and compilation.

  - Output

    **Tokens**: The result of tokenization is a list of tokens that the V8 engine uses in subsequent stages of parsing.

  In the parsing stage,<br/>
  **lexical analysis** breaks down JavaScript code into **tokens**. This process helps the V8 engine understand and process the code by converting it into a format that can be easily analyzed and optimized in later stages.

- `2nd Stage: Syntax Analysis and Abstract Syntax Tree (AST)`

  After the lexical analysis and tokenization stages, the next step in the parsing process is syntax analysis. In this stage, the tokens are converted into an Abstract Syntax Tree (AST). This process is crucial for transforming the flat list of tokens into a
  structured representation of the code.

  1. **Syntax Analysis :**

     To analyze the syntactic structure of the tokens and build the Abstract Syntax Tree (AST). The tokens are analyzed according to the grammar rules of JavaScript to create a hierarchical tree structure that represents the code.

  2. **Abstract Syntax Tree (AST) :**

     The AST is a tree-like data structure that represents the syntactic structure of the source code. Each node in the tree corresponds to a construct in the code, such as variables, expressions, or statements.

  [AST Explorer](https://astexplorer.net/)
  ![AST](./readme_images/image-15.png)

  3. **Interesting Fact :**

     <ins>Syntax Errors:</ins> When the V8 engine reads code, it processes tokens one by one. If an unexpected token is encountered that does not fit the grammar rules, a syntax error occurs. This is because the AST cannot be generated if the code does not adhere to the expected syntax, indicating that something is wrong with the structure of the code.

  ![alt text](./readme_images/image-16.png)

`Interpreter and Compilation :`

1. Interpreted vs. Compiled Languages

- `Interpreted Languages:` <br/>

  - **Definition:** These languages are executed line by line. The interpreter reads and executes the code directly, which can lead to slower execution times compared to compiled languages.
  - **Pros:** Faster to start executing code, easier to debug.
  - **Cons:** Slower execution compared to compiled languages because of the line-by-line interpretation.
  - **Example:** Python

- `Compiled Languages:` <br/>
  - **Definition:** These languages are first translated into machine code (binary code) through a process called compilation. The machine code is then executed by the computer’s hardware, leading to faster execution times.
  - **Example:** C, C++.
  - **Pros:** Faster execution because the code is pre-compiled into machine code.
  - **Cons:** Longer initial compilation time, more complex debugging process.

`Q: Is JavaScript interpreted or compiled language?🤨`

A: <ins>JavaScript is neither purely interpreted nor purely compiled.</ins> It utilizes a combination of both techniques.

- `Interpreter:`

  - **Initial Execution:** JavaScript uses an interpreter to execute code quickly and start running the script. This allows for rapid execution of scripts and immediate feedback.

- `Compiler:`

  - **Just-In-Time (JIT) Compilation:** JavaScript engines like V8 use JIT compilation to improve performance. JIT compilation involves compiling code into machine code at runtime, just before execution. This process optimizes performance by compiling frequently executed code paths into optimized machine code.

  ![alt text](./readme_images/image-17.png)

`1. Abstract Syntax Tree (AST) to Bytecode`

- **AST to Bytecode:** After parsing the code and generating the AST, the code is passed to the interpreter. In the V8 engine, this interpreter is called `Ignition`.

Ignition:

- <ins>Converts the AST into bytecode.</ins> Bytecode is a lower-level, intermediate representation of the code that the JavaScript engine can execute more efficiently than raw source code.
- **Execution:** Ignition reads and executes the bytecode line by line.

`2. Just-In-Time (JIT) Compilation`

TurboFan:

- A compiler within the V8 engine that <ins>optimizes frequently executed (hot) code paths</ins>. When Ignition identifies a portion of the code that runs frequently (hot code), it sends this code to TurboFan for optimization.
- **Optimization:** TurboFan converts the bytecode into optimized machine code, which improves performance for repeated executions.

`3. Hot Code Optimization and Deoptimization`

- **Hot Code:** <ins>Refers to code that is executed frequently.</ins> TurboFan focuses on optimizing hot code to improve performance.

- **_Optimization Assumptions:_**

  TurboFan makes certain assumptions during optimization based on the types and values it encounters. For example, if a function is optimized with the assumption that it only processes numbers, it will run very efficiently for such cases.

- **_Deoptimization:_**

  - **Scenario:** If TurboFan’s assumptions are incorrect (e.g., a function that was optimized for numbers receives strings), the optimization may fail.

  - **Process:** In such cases, TurboFan will deoptimize the code and revert it to a less optimized state. The code is then sent back to Ignition for further interpretation and possible re-optimization.

  - **Example:** <br/>
    During optimization process, compiler makes assumption. If that assumption is not matched
    [ ex. sum(1,2) -> sum(3,5) -take less time -> sum(7,8) - take more less time -> sum("a", "b") - here breaks because those are not integer] then compiler will de optimized code, then interpreter will convert that code to byte code and execute.

Key Terms:

- **Inline Caching:** A technique used to speed up property access by caching the results of lookups.
- **Copy Elision:** An optimization technique that eliminates unnecessary copying of objects.
- There also parallel garbage collection is happening - Orinoco, oilpan, Scavenger, mcompact
- Mark & sweep algo running behind the scene

**_<ins>Ignition interpreter, Turbo Fan compiler - Together, They make your javascript faster than ever.</ins>_**

> Developer Note: <br/>
>
> - **_Best Practice:_** For optimal performance, try to <ins>pass consistent types and values to functions</ins>.
>   For example, if a function is optimized for numeric calculations, avoid passing strings to prevent deoptimization.

![alt text](./readme_images/image-18.png)

![alt text](./readme_images/image-19.png)

> All of these processes work differently in each JavaScript engine, such as
> SpiderMonkey or others, but the V8 engine is considered the best on the market.
> Understanding the structure of the V8 engine is very beneficial for you.

![alt text](./readme_images/image-20.png)

Check: https://v8.dev/

---

### 🎈 **9. libuv & Event Loop**

**_<ins>You're diving into the core of Node.js's asynchronous handling with libuv .</ins>_**

Understanding how libuv manages the **_<ins>event loop, callback queues, and thread pools </ins>_** is crucial, especially for non-blocking I/O tasks.

- The **_event loop_** in libuv is the heart of how Node.js handles asynchronous operations. It allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded.

  Tasks that are offloaded to libuv include **_<ins>file system operations, DNS lookups, and network requests, among others.</ins>_**

- The **_callback queue_** is where callbacks are stored after an asynchronous operation is completed. The event loop processes this queue to execute the callbacks when the call stack is empty.
- The **_thread pool_**, on the other hand, is used for handling more time-consuming tasks that cannot be handled within the event loop without blocking it, such as file system operations or cryptographic functions.

Let's take a closer look at what happens internally inside the event loop

![event loop](./readme_images/image-21.png)

ref : https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

The event loop in LIBUV operates in four major phases:

1. **Timers Phase:** <br/>
   In this phase, all callbacks that were set using setTimeout or setInterval are executed. These timers are checked, and if their time has expired, their corresponding callbacks are added to the callback queue for execution.

   - a. **pending callbacks:** <br/> suppose there are some I/O callback handle on poll phase, but didn't handle, then it will differed on next 'tick'(one full cycle).
   - b. **idle, prepare:** <br/> only used internally

2. **Poll Phase:** <br/>
   After timers, the event loop enters the Poll phase, which is crucial because it handles I/O callbacks. For instance, when you perform a file read operation using fs.readFile , the callback associated with this I/O operation will be executed in this phase. The Poll phase is responsible for handling all I/O related tasks, making it one of the most important phases in the event loop.

3. **Check Phase:** <br/>
   Next is the Check phase, where callbacks scheduled by the setImmediate function are executed. This utility API allows you to execute
   callbacks immediately after the Poll phase, giving you more control over the order of operations.

4. **Close Callbacks Phase:** <br/>
   Finally, in the Close Callbacks phase, any callbacks associated with closing operations, such as socket closures, are handled. This
   phase is typically used for cleanup tasks, ensuring that resources are properly released.

**_Event Loop Cycle with process.nextTick() and Promises [very important]_**

Before the event loop moves to each of its main phases (Timers, I/O Callbacks, Poll, Check, and Close Callbacks), it first processes any <ins>pending microtasks</ins>.

**_Microtasks include tasks scheduled using process.nextTick() and Promise callbacks. These tasks are handled promptly before moving on to the next phase._**

lets assume all the async tasks complete at a same time and v8 engine call stack is not empty yet, so then they will store in their respective callback queues. and will execute on current time and in correct order. Whom it should give priority is task of event loop. There are separate queues for timer, api, read file etc.

Event loop keeps checking v8 engine call stack & Libuv callback queues.

In this order event loop is continuously running and meanwhile checking if call stack is empty or not.
Whenever there is any callback they will be stored in seperate queue. when time comes they will execute.

![alt text](./readme_images/image-22.png)
![alt text](./readme_images/image-23.png)

`Q 1 : What is the output?`

```javascript

const fs = require("fs");

const a =100;

Promise.resolve("Promise").then(() => console.log("promise resolve"));

setImmediate(() => {
  console.log("setImmediate");
});

fs.readFile("./text.txt", "utf8", (err, data) => {

  console.log(" File reading CB");
});

setTimeout(() => console.log("setTimeout"), 0);

process.nextTick(() => console.log("process.nextTick"));

function printA(){
  console.log("a=",a);
}

printA();

console.log("This is last line");

//----------------Output:-------------------//

a=100
This is last line
process.nextTick
promise resolve
setTimeout
File reading CB       // this will print at last, here file size is small, so executed quickly
setImmediate
// File reading CB

```

Following this, the fs.readFile function is encountered. libuv handles this operation by calling the OS to start reading the file asynchronously. The associated callback function will be placed into the poll queue once the file read operation is complete.

When any I/O callbacks were ready, they would be executed here. The file read operation is complete, so the associated
callback function B is executed, printing "File Reading CB" to the console. B is then removed from the call stack.

`Q 2 : What is the output?`

```javascript

const fs = require("fs");

Promise.resolve("Promise").then(() => console.log("promise resolve"));

setImmediate(() => {
  console.log("1st setImmediate");
});

setTimeout(() => console.log("1st setTimeout"), 0);

fs.readFile("./text.txt", "utf8", (err, data) => {
  setTimeout(() => console.log(" 2nd setTimeout"), 0);

  process.nextTick(() => console.log(" 2nd process.nextTick"));

  setImmediate(() => {
    console.log(" 2nd setImmediate");
  });

  console.log(" File reading CB");
});

process.nextTick(() => console.log("1st process.nextTick"));

//----------------Output:-------------------//

1st process.nextTick
promise resolve
1st setTimeout
 File reading CB       // this will be printed at last, here file size is small, so executed quickly
 2nd process.nextTick
1st setImmediate
 2nd setImmediate
 2nd setTimeout

```

1. Synchronous Code Execution:
2. Microtasks: "Porcess.nextTick", "promise"
3. Timers Phase:
4. setImmediate Phase:
5. Poll Phase:

`ONE MORE IMP CONCEPT :` <br/>
**_<ins>When the event loop is empty and there are no more tasks to execute, it enters the poll phase and essentially waits for incoming events</ins>_**

`Q 3 : What is the output?`

```javascript
const a = 100;

Promise.resolve("Promise").then(() => console.log("promise resolve"));

setTimeout(() => console.log("1st setTimeout"), 0);

fs.readFile("./text.txt", "utf8", (err, data) => {

  setTimeout(() => console.log(" 2nd setTimeout"), 0);
  setImmediate(() => { console.log(" 2nd setImmediate"); });
  process.nextTick(() => console.log(" 2nd process next tick"));
  console.log(" File reading CB");

});

setImmediate(() => { console.log("1st setImmediate"); });

process.nextTick(() => {
  process.nextTick(() => console.log(" Inner next tick"));
  console.log("process next tick");
});

function printA(a) {
  console.log("a=", a);
}
printA(a);

console.log("This is the last line");

//----------------Output:-------------------//

a= 100
This is the last line
process next tick
  Inner next tick
promise resolve
1st setTimeout
  File reading CB  // this will be printed at last, here file size is small, so executed quickly
  2nd process next tick
1st setImmediate
  2nd setImmediate
  2nd setTimeout  (***)

```

> Important Note : <br/> **process.nextTick** callbacks have a **higher priority** than other asynchronous
> operations. This means that if you have nested process.nextTick callbacks, the
> inner process.nextTick callback will be executed before the outer one.

```javascript

const fs = require("fs");

setImmediate(() => {
  console.log("1st setImmediate");
});

setTimeout(() => console.log("1st setTimeout"), 0);

Promise.resolve("Promise").then(() => console.log("promise resolve"));

fs.readFile("./text.txt", "utf8", () => {
  setTimeout(() => console.log(" 2nd setTimeout"), 0);

  process.nextTick(() => console.log(" 2nd process.nextTick"));

  setImmediate(() => {
    console.log(" 2nd setImmediate");
  });

  console.log(" File reading CB");

  fs.readFile("./text.txt", "utf8", () => {             // Inside another callback
    setTimeout(() => console.log(" 3rd setTimeout"), 0);

    process.nextTick(() => console.log(" 3rd process.nextTick"));

    setImmediate(() => {
      console.log(" 3rd setImmediate");
    });

    console.log("2nd File reading CB");
  });
});

process.nextTick(() => console.log(" 1st process.nextTick"));
process.nextTick(() => {
  process.nextTick(() => console.log(" Inner process.nextTick"));
  console.log("process.nextTick");
});

//-----------------output--------------------//

1st process.nextTick
process.nextTick
 Inner process.nextTick
promise resolve
1st setTimeout
 File reading CB
 2nd process.nextTick
1st setImmediate
 2nd setImmediate
 2nd setTimeout
2nd File reading CB
 3rd process.nextTick
 3rd setImmediate
 3rd setTimeout

```

---

### 🎈 **10. Thread pool in libuv**

Thread means its a container which does some operation/runs a spice of code.

Whenever there's an asynchronous task, V8 offloads it to libuv. For example,

when reading a file, libuv uses one of the threads in its thread pool. The file system (fs) call is assigned to a thread in the pool, and that thread makes a request to the OS. While the file is being read, the thread in the pool is fully occupied and cannot perform any other tasks. Once the file reading is complete, the engaged thread is freed up and becomes available for other operations.

For instance, if you're performing a cryptographic operation like hashing, it will be assigned to another thread. There are certain functions for which libuv uses the thread pool.

In Node.js, the default size of the thread pool is 4 threads:

> UV_THREADPOOL_SIZE=4

Now, suppose you make 5 simultaneous file reading calls. What happens is that 4 file calls will occupy 4 threads, and the 5th one will wait until one of the threads is free.

`Q: When does libuv use the thread pool?`

Whenever you perform tasks like file system (fs) operations, DNS lookups (Domain Name System), or cryptographic methods, libuv uses the thread pool.

`Q: Is Node.js singlethreaded or multi-threaded?`

If you're dealing with synchronous code, Node.js is single-threaded. But if you're dealing with asynchronous tasks, it utilizes libuv's thread pool, making it multithreaded. the order of execution is not gauranteed over here which thread executes first will win.

`Q: Can you change the size of the thread pool?`

A: Yes, you can change the size of the thread pool by setting the UV_THREADPOOL_SIZE environment variable. For example, you can set it to 8 like this:

```javascript
process.env.UV_THREADPOOL_SIZE = 8;
```

If your production system involves heavy file handling or other tasks that benefit from additional threads, you can adjust the thread pool size accordingly to better suit your needs.

`Q: Suppose you have a server with many incoming requests, and users are hitting APIs. Do these APIs use the thread pool?`

A: No

`Q: libuv how does interact with OS?`

When we make api calls, it's not use thread pool.

In the libuv library, when it interacts with the OS for networking tasks, it uses sockets. Networking operations occur through these sockets. Each socket has a socket descriptor, also known as a file descriptor (although this has nothing to do with the file system).

When an incoming request arrives on a socket, and you want to write data to this connection, it involves blocking operations. To handle this, a thread is created for each request. However, creating a separate thread for each connection is not practical, especially when dealing with thousands of requests.

So for that, node js use diff algorithm - That is scalable <ins>I/O Event Notification Mechanism</ins>

> **OS architecture:**<br/>
> Hardware -> Kernel (Here epoll[on Linux] mechanism presents) -> process (ex. node js process-libuv)
> so libuv interacting with OS via epoll.

Instead, the system uses efficient mechanisms provided by the OS, such as epoll (on Linux) or kqueue (on macOS). These mechanisms handle multiple file descriptors (sockets) without needing a thread per connection.

Here’s how it works:

- epoll (Linux) and kqueue (macOS) are notification mechanisms used to manage many connections efficiently.
- When you create an epoll or kqueue descriptor, it monitors multiple file descriptors (sockets) for activity.
- The OS kernel manages these mechanisms.

  Ex. when many connections are established but its not necessary that it will always writing to that connection. sometime it could be holding there to make a read or write operation. or sometime any connection is not making any read/write operation, means its stay idle.

  The OS kernel notifies libuv of any changes or activity on the sockets. And libuv will send a callback on pool phase, callback will be checked by event loop then execute it to V8 engine. that's why its name 'scalable I/O Event Notification Mechanism'.

- This approach allows the server to handle a large number of connections efficiently without creating a thread for each one.

The kernel-level mechanisms, like epoll and kqueue , provide a scalable way to manage multiple connections, significantly improving performance and resource utilization in a high-concurrency environment. These epoll/kqueue are making async operation on OS level.

`File Descriptors (fds) and Socket Descriptors :`

- **File Descriptors (FDs)** are integral to Unix-like operating systems, including Linux and macOS. They are used by the operating system to manage open files, sockets, and other I/O resources.

- **Socket descriptors** are a special type of file descriptor used to manage network connections. They are essential for network programming, allowing processes to communicate over a network.

`Event Emitters :`

Event Emitters are a core concept in Node.js, used to handle asynchronous events. They allow objects to emit named events that can be listened to by other parts of the application. The EventEmitter class is provided by the Node.js events module. Here's a brief overview:

- **Creating an EventEmitter:** You create an instance of EventEmitter and use the on method to register event listeners.
- **Emitting Events:** Use the emit method to trigger events and pass data to listeners.
- **Handling Events:** Listeners (functions) handle the emitted events and perform actions based on the event data.

`Streams :`
Streams in Node.js are objects that facilitate reading from or writing to a data source in a continuous fashion. Streams are particularly useful for handling large amounts of data efficiently.

`Buffers :`

Buffers are used to handle binary data in Node.js. They provide a way to work with raw memory allocations and are useful for operations involving binary data, such as reading files or network communications.

`Pipes in Node.js :`

Pipes in Node.js are a powerful feature for managing the flow of data between streams. They simplify the process of reading from a readable stream and writing to a writable stream, facilitating efficient and seamless data processing.

`Important things to note:`

- Don't block the main thread
- Don't use sync methods (Heavy JSON objects)
- Complex Regex - Complex calculations/loops

- Data structure is important

- Naming is very important - process.nextTick() vs setImmediate()

- There's a lot to learn

---

### 🎈 **11. Creating a Server**

`What is a server?`

A: Understanding Servers: Hardware and Software

`What is a Server?`

The term "server" can refer to <ins>both hardware and software</ins>, <ins>depending on the context</ins>.

- **Hardware:** A physical machine (computer) that provides resources and services to other computers (clients) over a network.
- **Software:** An application or program that handles requests and delivers data to clients.

`Deploying an Application on a Server`

When someone says "deploy your app on a server," they usually mean:

- **Hardware Aspect:** You need a physical machine (server) to run your application. This machine has a CPU, RAM, storage, etc.
- **Operating System (OS):** The server hardware runs an operating system like Linux or Windows. Your application runs on this OS.
- **Server Software:** The software (e.g., a web server like Apache or an application server built with Node.js) that handles requests from users.

`AWS and Cloud Computing`

AWS (Amazon Web Services) provides cloud-based resources, including
servers.

- **EC2 Instance:** When you launch an EC2 instance, you’re essentially renting a virtual server from AWS. AWS manages the underlying hardware, and you deploy your application on the virtual server.
- **Scalability:** AWS allows you to easily scale your resources. For example, you can increase the memory or processing power of your server with a few clicks, which is not as straightforward on a physical laptop or desktop.
- **Reliability:** AWS servers are equipped with constant power, internet backup, and redundant systems to ensure high availability, which is difficult to achieve with a personal computer.

`Q: Can You Use Your Own Laptop as a Server?`

A: Yes, but with limitations:

- **Hardware Constraints:** Your laptop likely has limited RAM, CPU, and storage, which may not be sufficient for handling a large number of requests.
- **Internet Connectivity:** A home internet connection is typically less reliable and has dynamic IP addresses, making it less suitable for hosting a publicly accessible server.
- **Power and Maintenance:** Ensuring that your laptop is always on, connected to the internet, and has backup power is challenging. AWS handles all these concerns for you.

`Software Servers in Node.js`

When you create an HTTP server in Node.js, you’re building an application that listens for requests from clients and responds to them. This is an example of a software server.

`Client Server Architecture :`

![client server architecture](./readme_images/image-4.png)

The term "client" refers to someone accessing a server. Imagine a user sitting at a computer wanting to access a file from a server. For this, the client needs to open a socket connection (not to be confused with WebSocket). Every client has an IP
address, and every server has an IP address as well. The client could be a web browser.

To access the file, the client opens a socket connection. On the server side, there should be an application that is listening for such requests, retrieves the requested file, and sends it back to the client.

There can be multiple clients, and each client creates a socket connection to get data. After the data is received, the socket connection is closed. If the client needs to make another request, a new socket connection is created, data is retrieved, and the connection is closed again.

ex. namastedev.com/blog - new socket, namastedev.com/courses - new socket

Sockets operate using the TCP/IP protocol (Transmission Control Protocol/Internet
Protocol).

`What is a protocol?`

A protocol is a set of rules that define how computers communicate with each other. Protocols determine the format in which data is sent between devices.

- **FTP (File Transfer Protocol):** Used for transferring files.
- **SMTP (Simple Mail Transfer Protocol):** Used for sending emails.

When we talk about a web server, we usually mean an HTTP server. HTTP(HyperText Transfer Protocol) is a language or set of rules that defines how clients and servers communicate.

Essentially, when we create a server, it's often built using HTTP to handle basic data exchanges. Toward the end, I'll demonstrate how to create a server.

`Q: When you make a server request, how is data sent?`

![Data Sent](./readme_images/image-1.png)

Data is sent in chunks, and these smaller units are known as packets. Whenever data is transmitted, it's broken down into these packets. Remember the term "packets." The TCP/IP protocol is responsible for sending these packets and ensuring that the data transmission is properly managed.

In Node.js, there are concepts of streams and buffers that are used for handling and writing code related to data transmission We don't generally communicate using IP addresses; instead, we use domain names like youtube.com. However, at the end of the day, everything maps to an IP address.

We don't generally communicate using IP addresses; instead, we use domain names like youtube.com. However, at the end of the day, everything maps to an IP address.

As humans, we don’t easily understand or remember IPs, similar to how we save contacts with names instead of memorizing phone numbers. Similarly, when werequest a URL like <ins>youtube.com</ins>, internally, it is translated into an IP address. This is where the Domain Name System (DNS) comes into play.

A DNS server manages the mapping between domain names and IP addresses. When you request a website, your browser calls a DNS server to resolve the domain name into an IP address. Once the IP is resolved, a call is made to the server.

As a user, you don’t see what happens behind the scenes. When you request an IP, it goes to the server where an HTTP server processes the request and sends back the video data. This data is sent in chunks, known as streams, and the process involves buffers, which is why you sometimes see the video buffering.

`What does WEB means?`

A: Each computer have specific IP address. we can connect with any computer. That's the internet.

`Q: Can I create multiple servers?`

A: Yes, you can create multiple HTTP servers.

`Now, suppose a user is sending a request. How do we know which server it should go to?`

When I mention creating an HTTP server, it means we are setting up two different Node.js applications. The distinction between these servers is defined by a port, which is a 4-digit number (e.g., port 3000).

For example, suppose an HTTP server with IP address 102.209.1.3 is running on port 3000 . This combination of IP address and port number ( 102.209.1.3:3000 ) indicates which specific HTTP server the request should be routed to.

Essentially, this means there’s a single computer (the server) that can run multiple applications, each with its internal servers. The port number determines which application or server the request is directed to.

![multiple servers](./readme_images/image-2.png)

`Mapping Domain Names, IPs, Ports, and Paths to Applications`

A: When you enter a domain name like youtube.com , it gets mapped to an IP address by a DNS (Domain Name System) server. The IP address identifies the specific server where the website is hosted.

Now, when you combine the IP address with a port number, you can direct the request to a specific application running on that server. The port number acts as a gateway to different applications or services on the same server. For example:

- 102.209.1.3:3000 could point to a React application.
- 102.209.1.3:3001 could point to a Node.js application.

But there's more! If you add a path to the URL, you can create specific API routes. For example:

- If you enter youtube.com , the server might direct you to the React application running on port 3000 .
- If you enter youtube.com/api/... , it might direct the request to a Node.js application running on port 3001 .

Let's consider a scenario with namastedev.com . Suppose you have two applications:

1. A React application running on port 3000 .
2. A Node.js application running on port 3001 .

You can set it up so:

- Requests to namastedev.com go to the React application on port 3000 .
- Requests to namastedev.com/node go to the Node.js application on port 3001 .

This way, you can manage multiple applications on the same server and direct users based on the path they enter in the URL.

> In large companies, the architecture is often distributed across multiple servers
> rather than relying on a single server. This approach helps manage different
> aspects of the application efficiently and ensures scalability, reliability, and performance.

`Distributed Server Architecture Explained`

**Separation of Concerns:**

- **Frontend Server:** This server handles the user interface (UI) of the application. It serves the HTML, CSS, and JavaScript files that the browser needs to render the website. For example, namastedev.com could be hosted on an AWS server that serves both the frontend and backend.
- **Backend Server:** This server processes the logic, handles requests, and interacts with the database. Even though the backend might be on the same server as the frontend in some cases, it’s often separated in larger systems for better performance and security.
- **Dedicated Database Server:** The database is typically hosted on a separate, powerful server that is optimized for storing and managing data. When a client makes a request that involves data retrieval or storage, the backend server interacts with this database server to fulfill the request.
- **Media and File Servers:** Large files like videos, images, and other media are often stored on specialized servers. These servers are optimized for handling large amounts of data and delivering it quickly. When you request a video from namastedev.com , the video might be fetched from a dedicated media server. Images might also be stored on a different server, often managed by a content delivery network (CDN) to ensure fast delivery to users worldwide.
- **Inter-Server Communication:** When a client makes a request, the frontend or backend server might need to communicate with other servers to get the necessary data. For example, if you request a video on namastedev.com , the server might make an API call to another server that hosts the video content, retrieve it, and then send it to the client.

`Example: namastedev.com Architecture`

- **Frontend & Backend:** Hosted on an AWS server.
- **Database:** Stored on a separate, powerful database server.
- **Videos:** Stored on another server, possibly optimized for streaming large media files.
- **Images:** Stored on yet another server, potentially managed by a CDN for fast delivery.

In many companies, the frontend and backend may also be hosted on different servers. This separation allows each part of the system to be optimized for its specific role, ensuring better performance and making the system more scalable and resilient.

This distributed approach helps large companies manage massive amounts of data and traffic efficiently, ensuring that users have a smooth and responsive experience.

![alt text](./readme_images/image-3.png)

`Socket vs WebSockets`

When a user makes a request to a website, a socket connection is established between the client and the server. This connection is typically used for a single request-response cycle: the client sends a request, the server processes it, sends
back the response, and then the socket is closed. This process involves opening a new connection for each request.

On the other hand, WebSockets introduce a more efficient method by allowing the connection to remain open. This means that after the initial connection is established, it stays active, allowing for continuous communication between the client and server. Both the client and server can send and receive data at any time without the need to re-establish the connection. This persistent connection is ideal for real-time applications, where continuous interaction is required, such as in chat applications, online gaming, or live updates.

`Creating a server`

```javascript
const http = require("node:http");

const server = http.createServer(function (req, res) {
  if (req.url === "/getSecrectData") {
    res.end("There is no secrect data");
  }
  res.end("hello world");
});

server.listen(3000);
```

Now, I want to handle different responses for the URL localhost:3000/getsecretdata

We use **Express** to create a server. Express is a framework built on top of Node.js that makes our lives easier

---

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

---

### 🧨 **13. Creating a database & mongodb**

1. We can download mongo in our sytem, and use it
2. Mongodb will store our db on their cloud. we can create a new **Clusters** on official mongodb website & access it.

- Community version - free version for developer - download on our local sytem or deploy to our cloud, mongodb will not help you.
- Enterprise version - for company

They both can be self managed(when deploy your db on server you have to make sure your db is always up & running/backed up properly/ or manged by mongodb).

We can connect mongodb cluster to mongodb compass. Copy cluster string & connect with compass, then We can see data inside that database.

enctest021
L2jrIxW9PyDJAUdl

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---
