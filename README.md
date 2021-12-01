# Web Development Projects
Repository created for storing project files for learning Web Development.
Each folder under the root of the repository represents an independent project.

---
---
<h1 align="center">Our First Brush With Node</h1>

### The node repl (<small>REPL stands for read-eval-print-loop</small>)

Node allows use to run javascript outside of the folder. To run node:

```shell
node [filename]
```

Filename is an optional argument. If you simply type node, you enter a Javascript REPL, wherears if you include the filename, node runs the corresponding javascript file.



### Process argv

<i style="color:orange"> </i>

If we create a javascript file printing *process.argv* and call it in Terminal:

```javascript
/* app.js */
console.log(process.argv);
```
Notice that the actual arguments start from index 2. process.argv contains two more additional elements which are the path of node and the directory name of the file that's being run.

```bash
node app.js arg1 arg2 arg3
# This is what we get:
[
  '/usr/local/bin/node', # path of node
  '/Users/pingleihe/Desktop/app.js', # __dirname
  # Followed by that are the arguments that we passed in inside bash:
  'arg1',
  'arg2',
  'arg3'
  # These arguments can be accessed with process.argv.slice(2) if we want to ignore the path of node and the directory name.
]
```



---

## Section 32: Exploring the modules and the NPM universe



### Working with exports

When you want information created/processed in a file to be exported and used by other javascript files, you can use set module.exports to the infomration you want to export.

```js
const PI = 3.1415926;
const add = (...rest) => {    
  let sum = 0;    
  for (let number of rest) {
    sum += number;
  }
return sum;
}; 

module.exports = {
  PI: PI,
  add: add
} //This object is what we get when we import this file
```

In app.js:

```js
const math = require("./math");
const res = math.add(1, 3, 5, 89, 2389);
console.log(res); //Prints out the sum of the arguments
```



### Requiring a directory

When you require from a path:

```js
const pets = require("./pets");
```

But **./pets** is **not the path of a javascript file but that of a folder**, you have to have an **index.js** inside that folder.

Whatever **./pets/index.js** exports is what requiring **./pets** does.

```js
/* ./pets/index.js */
const mimi = require("./cat"); //imports ./pets/cat.js
const wangwang = require("./dog"); //and other stuff from the same folder
module.exports = {cat:mimi, dog:wangwang}; // Requiring ./pets gets you this object
```



### Exploring modules and the NPM universe

The **node_modules** folder is usually not included when we sent our package to other people or upload it to GitHub, it includes the code for all the dependencies. The person receiving the project is supposed to install them.

### Adding global packages

```bash
npm install -g [package name]
```

Apart of stuff like Node, Nodemon etc, its is preferable to install all of the dependencies locally inside the folder (for version control

### Installing all dependencies for a project

```bash
# Terminal
npm install
# This installs all the dependencies according to package.json
```

---



<h2 align="center">Creating servers with Express</h1>



### Our very first Express app

```js
/* The two lines below import express and create a new Express application */
const express = require("express");
const app = express();
 
/* The callback is triggered whenever a request is received */
app.use((req, res) => {
	console.log("The server received an request.")
});
 
/* The callback is triggered when the server starts running on port 3000 */
app.listen(3000, (req, res) => {
	console.log("The server is up and running.")
});
```

**req** is the request object node created from the HTTP form.
**res** is the response object that contains a bunch of methods such as **send()** or **render()**

### The Request and Response objects

```js
app.get("/", (req, res) => {
  res.send("This is what gets sent back when the root of the server receives a get request");
})
```

We can also send other stuff:

```js
// We can nest html elements in the string that we send, and this gets rendered on the client side
res.send("<h1> This is a title </h1>");

// We can send javascript objects, which get converted into jsons:
res.send({
  firstName: "Jackson",
  lastName: "Wang",
  age: 23
});
```



### Express routing basics

```js
const express = require("express");
const app = express();
 
/* Depending on what the users requests for, we can send different responses */
app.get('/', (req, res) => {
  res.send("Welcome to the home page of the website.")
});

app.get('/cats', (req, res) => {
  res.send("MEOW");
});

app.get('/dogs', (req, res) => {
  res.send("WOLF");
})

/* You can put regular expressions in the url. "*" is a regular expression that matches everything, so this gets matched when nothing above matches.*/
app.get('*', (req, res) => {
  res.send("Can't find what you are looking for.")
});

/* Only one response is sent back when we receive a request, so the first url that matches triggers the corresponding callback function */
app.listen(3000);
```

All of the callback functions above are called "middlewares". A midldeware is a function that is run during the request-response cycle.



### Express path parameters

```js
app.get("/r/:subreddit/:userID", (req, res) => {
  const {subreddit, userID: id} = req.params; //This extracts data from the url
  res.send(`<h1 style="text-color: pink">You are on the ${subreddit} subreddit. Welcome back, ${id}!</h1>`);
})
```

When you acces ***websiteURL/r/cats/mario***, you would get:

<p style="color: pink; text-align: center; font-size: 2rem">You are on the cats subreddit. Welcome back, mario!</p>



### Working with query strings

```js
app.get("/search", (req, res) => {
  const {q: searchTerm} = req.query;
  res.send(`Here is the result for ${searchTerm.}`);
})
```

When user accesses **websiteURL/search?q=Superman** ,they get:

<q>Here is the result for Superman</q>



### Query string format

- A query string starts with a question mark
- Each question mark 



### Auto-restart with nodemon

```bash
nodemon app.js # p.s.Nodemon needs to be npm installed first
```

---

<h2 align="center">Creating Dynamic HTML with Templating</h1>

### Configuring Express for EJS

#### Setting up the view engine:

```js
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views")); //Now it is ./views relative to where the app.js file is
```

To render views:

```js
app.get('/', (req, res) => {
  res.render("home"); //This sends back the ./views/home.js; writing "home" suffices
});
```



### EJS interpolation

To embed JS values directly into HTML text:

```html
<h1>
  The value of the number x is <%= x %>. <br>
  The upper case of "hello" is <%= "hello".toUpperCase() %>.
</h1>
```

### Passing data into templates

```js
app.get('/', (req, res) => {
  app.render("home", { x: 1, y: 2}); //We can pass an object in the render function
});
```

```html
<h1>
  The x corrdinate is <%= x %>.
  And the y corrdinate is <%= y %>.
</h1>
```

We recall that if the object key is the same as the variable name, there is a shorthand:

```javascript
const name = "Jonh";
const id = 34;
const student = {name, id};
// This is the same as :
const student = {name: name, id:id};
```

### Conditionals in EJS

```html

<% if (condition) { %>
   <!-- You can generate this using the "ejsif" snippet. -->
   <!-- HTML Code or other stuff here -->
<% } %>
```

### Serving Assets in Express

```
project structure:
-->|project
   |-->|views
       |--> home.ejs
   |-->|public
       |-->|css
           |index.css
       |-->|js
           |index.js
   |-->app.js
```

Inside app.js:

```js
/* To serve the public folder */
app.use(express.static(path.join(__dirname, 'public')));
```



<h2 align="center">Define RESTful routes</h2>

### Parsing the request body

In order to parse the urlencoded request body (ones sent by forms for instance), we need to use this setting:

```javascript
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
```

We can get the request body by calling this in the middleware:

```js
const requestBody = req.body; //For exeample, when we receive a form.
```



<h3 align="center">What Exactly is RESTfulness?</h3>



<img src="https://miro.medium.com/max/2628/1*M0hdLsgbzelOFuq-1BVH-g.png" style="width: 60%" alt="">



### Simulating http methods in javascript with method overriding

HTML form natively only supports two methods: *GET* and *POST*, in order for our server to process other methods, like PATCH and DELETE, we use **Method Overriding**

```js
/* Importing method-override */
const methodOverride = require('method-override')

// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
```

The code above tells the browser when they receive a post request with a *_method=[methodname]*  in the URL body, to treat the request as a [methodname] request. 

The code below shows a **POST** form that pretends to be a **PATCH** form:

```ejs
    <form method="POST" action="/comments/<%=comment.id%>?_method=PATCH">
        <textarea name="comment" id="" cols="30" rows="10"><%= comment.comment %></textarea>
        <button>Save</button>
    </form>
```



---

## Section 37 Mongoose

Mongoose is a **Object Data Model** which connects javascript/node to MongoDB.

### Connecting mongoose to MongoDB

```js
/* requiring mongoose */
const mongoose = require('mongoose');
/* Connecting mongoose. mongoose.connect returns a promise */
/* Don't have to remember this, just copy it every time you use it */
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    });
```



### Defining the Schema

Before creating an object model, let's defined the **Schema** for the model:

```javascript
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
```



### Compiling the Model

Now let's use the Schema to defined a **model**:

```javascript
const Movie = mongoose.model('Movie', movieSchema);
// Argument 'Movie' ==> database called 'movies'
// Argument 'Dog' ==> database called 'dogs'
```

now we can use the model to create new javascript objects:

```javascript
// Creating a movie mongoose javascript object
const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' });
// Saving it to mongo
amadeus.save();
```

### Creating and saving many objects

```javascript
Movie.insertMany([
     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
     { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
 ])
     .then(data => {
         console.log("IT WORKED!")
         console.log(data);
     })

```

### Finding Data

```javascript
// Model.find({conditions}) doesn't return directly the list of movies found, but a thenable(ie. on which you can call the .then() method, similar to a promise) object. You would have to chain it to see the data:
Movie.find({title:'amadeus'}).then(data => {
  console.log(data);
});

//other methods:
Movie.findOne({}); //This finds the first movie that matches and returns the query object
Movie.findById(id);
```

### Updating Data

```javascript
Model.updateOne({conditions}, {updates});
Model.updateMany({conditions}, {updates});
/* Exeample */
Movie.updateMany({title {$in: ['amadeus', 'avatar']}}, {score:10}); // This sets the score of amadeus and avatar to 10

/* Shell says :
{ n: 2, nModified: 2, ok:1 }
/*
```

The update methods don't return the objects found. If we want to get the data too, use findAndUpdate:

```javascript
Movie.findAndUpdateOne({condidion}, {updates}, {new:true})
	.then((data) => console.log(data));
// If we do not specify {new:true}, what's returned is the version of the document before the update.
```

Equivalent methods for deletions:

```javascript
Movie.deleteOne({conditions});
Movie.deleteMany({conditions});
Movie.findOneAndDelete({conditions});
```

### Schema validation

Previously we've defined schemas using the shorthand way, where we set the value of a key to the type of the data.

```javascript
const someSchema = new mongoose.Schema({
  someField: String;
  someOtherField: Number
});
```

If we want to add extra validation, we need to use the syntax below:

```javascript
const productSchema = new mongoose.schema({
  name: {
    type: String,
    required: true //If we try to create a product without a name, an error is raised
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price must be positive!"] // custom error message
	},
  onSale: {
    type: Boolean,
    default: false //If we do not include a onSale field during declaration, this will automatically be set to false.
  },
  qty: { // As we can nest objects inside objcets, we can also defined more complex strutures inside the schema
    online: {
      type: Number,
      default: 0
    },
    inStore: {
      type: Number,
      default: 0;
    }
  },
  size: {
    type: String,
    enum: {'S', 'M', 'L'} // Size can be only one of the three values
  },
});
```

p.s: If a field is not in a data, including it in a model will have no effect.

### Runvalidator

When we update an object, the **validators are by default disabled**. We can for instance set a price to -10 even though its minimum is set at zero. In order for validators to be activated we need to **specify runValidators to true** in the options.

```java
Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 9 }, { new: true, runValidators: true });
```

### Adding methods to schemas

```javascript
mySchema.methods.myMethod = function {
  /* code */
}; //Be careful not to use arrow functions, the this keyword would be the windows object otherwise.

mySchema.static.myStaticMethod = function {
  /* statements for the static method that acts on the whole class */
};
```

### Virtuals

When we want a field that is a function of other fields, we can use a virtual field

```js
personSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    });
// Note that we can also set a setter to the virtual
```

Now say we have a person called tammy:

```js
tammy.fullname // This returns the firstname and the lastname in a single string
```

### Middleware: pre-hooks and post-hooks

We can set pre-hooks and/or post-hooks to a method. In the code below, we set a pre-hook to save, so every time an instance calls save, we display "we are saving [object]":

```js
mySchema.pre('save', async function () {
    console.log(`We are saving ${this}`);
});

mySchema.post('save', function(next) {
  // Same idea for post. We can use the next function instead of the async syntax.
  next();
});
```

---

<h2 style="text-align: center">Section 40 MiddleWare</h2>

### The Request-Response cycle

When a request is being made to the server, before the response is sent back, the request is handled by middlewares.

A middleware is simply a function that has access to the **request, response** and the **next** objects.

```javascript
const myMiddleWare = (req, res) => {
  res.send("Your request is now hijacked by my middleware.");
};

app.use(myMiddleWare);
```

If we put the app.use(myMiddleWare) at the beginning of our Express app, any request is automatically hijacked by the middleware. When the result is sent, the cycle ends.

```javascript
const logger = (req, res, next) => {
  console.log("This just prints something in the console and does nothing else");
  next();
};
```

If we pass in the logger middleware function into app.use( ) however, this simply prints something in the server console, and then the request is passed to the next middleware when next() is called. next is actually referencing the next middleware in the cycle.



### Passing in middlewares

```javascript
const myMiddleWareOne = (req, res, next) => {/* code here */};
const myMiddleWareTwo = (req, res, next) => {/* code here */};
const myMiddleWareThree = (req, res, next) => {/* code here */};

app.get('/some/route/here', myMiddleWareOne, myMiddleWareTwo, myMiddleWareThree);
```

We can pass in multiple Express middlewares in any of the app.HttpVerb functions such as app.get, app.post etc. The request will be handled in order by the list of middlewares that we pass in.



---

<h2 style="text-align: center">Section 42 Express Error Handling</h2>

### Error handling middleware

An Express middleware that takes in 4 arguments handles errors.

```javascript
const errorHandler = (err, req, res, next) => {
  /* code that handles error */
};
```

When we call next with an argument (eg. next(err) ) in an Express middleware, this first error handling middleware that catches the request handles it.



### Custom Express Error

We can defined our own custom Express Error class

```javascript
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
```



### Handling Asynchronous errors

For synchronous errors, we can just throw a new error when encountered.

For asynchronous ones, the recommended way to handle them is to use a catch/try block.

```javascript
const myMiddleWare = async (req, res, next) => {
  try {
    /* code here */
  }.catch(err) {
    /* do something here */
  }
};
```

Alternatively, we can pass the error to the error handler.

```javascript
const myMiddleWare = async (req, res, next) => {
  try {
    /* code here */
  }.catch(err) {
    return next(err); // returning stops the code execution
  }
};
```



### Error handling function wrapper

One way to avoid having to write the try catch block in every asynchronous middleware that might encounter errors is to write a custom wrapper function that transforms a middleware into one with the same functionality but that passes possible errors to the erro handler.

```javascript
const catchAsync = (func) => {
    res = (req, res, next) => {
        func(req, res, next)
            .catch(next); //When catches error, do next(err)
    };
    return res;
};
```

```javascript
// The Middleware below does not know what to do with errors
const myMiddleWare = async (req, res, next) => {/* code here */};

// We can wrap it with the custom middleware wrapper that we just wrote, now errors can be handled, youpi.
app.HttpVerb('/some/route', catchAsync(myMiddleWare));
```

---

<h2 style="text-align: center">Section 44 Database Relationships</h2>

### One to few

When we have a few objects attached to one type of object (say, a few addresses attached to a user), in Mongo, a good approach would be just to embed one type of object under another.

```javascript
const userSchema = mongoose.Schema({
  // Fields for the parent-object
    firstName: String, lastName: String,
  // Embed addresses in an array
    addresses: [{
        _id: false, // Disable id creation for addresses stored under users
        street: String,
        city: String,
        state: String,
    }],
});
```



### One to Many

If a same document is referenced by multiple other documents, we can use **population**.

We set the type of the object to *mongoose.Schema.Types.ObjectId* and we set the *ref* to a the document type.

```javascript
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ 
    type: Schema.Types.ObjectId, // Story ids
    ref: 'Story' // We are referencing stories
  }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});
```

Now when we push mongoose person objects into the story fans array, mongoose automaticall converts that to an ObjectId object (instead of pushing the whole thing).

### Populate

If ref is set, we can use the populate function to replace the object ids with the corresponding objcets.

```javascript
const myFarm = Farm.findOne({}).populate('products');
console.log(myFarm);
// Now in the products field, we no longer see ObjectIds but actual objects
```



### One to a Bajillion

If a parent has too many children (and we don't need all of them when we get the parent), say, Twitter users with tons of  tweets. We may want to reference the parent in the child (like we do in sql) rather than referencing children in the parent.

[Six Rules Of Thumb](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3) ← some rulse to follow for MongoDB

### when to use which model

- Favor embedding unless there is a reason not to
- If we need embedded objects on its own, use references rather than object-wise embedding
- if the array of embedded references grow too large, reference the parents rather than the children

---

<h2 style="text-align: center">Section 47 Routers and Cookies</h2>

### Routers

Imagine we have more and more sections in our routes, '/dogs', '/cats', '/shelters', '/food' with respictive sub routes '/dogs/:id/edit' etc. Instead of having app.httpVerb function in the same index.js file, we can write separate routers.

```javascript
const express = require('express');
const dogRouter = express.Router();

router.use(/*Whatever middleware you want to use*/)

router.get('/:id', (req, res) => {
  /* Middleware when /dogs/:id is hit by a get method */
});

router.get('/new', (req, res) => {
  /* Middleware when /dogs/new is hit by a get method */
});

/* and some other stuff */

module.exports = dogRouter;
```

We write the above router in a separate file which we import in our index.js

```javascript
const express = require('express');
const dogRouter = require('./routers/dogRouter.js');
const app = express();

app.use('/dogs', dogRouter());

app.listen(3000, () => console.log("Server up and runnig."))
```

Now when we send a request to anything that starts with /dogs, the dogRouter treats the request.

---

## Cookies

Key points to remember:

- The server can set a user's browser's cookies. These cookies are sent every time the browser sends a request to the same server again.
- Cookies can be **signed** to assure its **integrity**. This means the server can make sure that the cookies are actually set by the server and not modified by other software or by the user. This does not protect the cookies from exposure (you can still see the cookies) but just means you cannot change the cookies without the server knowing.

```javascript
const express = require('express');
const app = express();

// In order for express to be able to parse cookies, you need to install cookie parser.
const cookieParser = require('cookie-parser');

// Optional: If you want to use signed cookies, pass in a key to the cookieParser, this is not supposed to be know by the user.
app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies; // Retrieving cookies.
    res.send(`Hey there, ${name}`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'John Cena'); // Setting 'name' to 'John Cena' in user's cookies
    res.send('OK SENT YOU A COOKIE!!!');
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true }); // Set signed to be true in options
    res.send('OK SIGNED YOUR SIGNED FRUIT COOKIE!');
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies); // This only logs the unsigned cookies
    console.log(req.signedCookies); // Signed cookies
    res.send("Got your cookies");
})

app.listen(3000, () => {
    console.log("Server up and running!");
})
```



## Session

Session, as opposed to cookis, is when we assign a (signed) session id to a user in the cookies, and store information linked to that user on the server side. A typical application of sessions is when a user puts stuff in the kart without registering. The server associates the kart to the session id.

We might want to sometimes use sessions because:

- There is a limited number of cookies we can set (for a single website), and the amount of data stored in one single cookie is limited. 
- Security reasons.

// connect.sid = .... expres session

### Setting up express-session

```javascript
const session = require("express-session"); // Note: You have to install express-session

app.use(session({ secret: "wuy23se98*"})); // Secret used to sign the session id
```

We don't have to explicitly code the part where we assign a session id to a user. As long as the session middleware is used, whenever a browser with no session id sends any request to the server, express-session is going to add a <i style="color:orange">connect.sid</i> (sid stands for session-id) field to the user's browser.

### Accessing and retrieving data in the session

From now on, every request will have a <i style="color:orange">req.session</i> object.

Let's create a page on the server that displays how many times the user has accessed that page. 

```javascript
app.get('/viewcount', (req, res) => {
  if (!req.session.count) {
    req.session.count = 1;
  } else {
    req.session.count += 1;
  }
  res.send(`You have accessed the page ${req.session.count} times`);
});
```

### Using an acutal data store

In a bebuggin setting, session data are stored in memory by default. In production, we use an actual data sstore like redish.

## Flash

A flash message is a message that is rendered when a particular event happens or a particular condition is met, and that message disapeears if you refresh the page. For exeample, when a user successfully leaves a review, you may want to flash a message that tells the user "Successfully leaved a review" in the new page that you render (for exeample, the page of the thing that the user is reviewing). When the user refreshes that page, the flash message disappears.

We will use an npm module called **connect-flash**

```javascript
/* ....
code for the usual express setep ....
..... */
const flash = require('connect-flash');

// Tells the app to use flash, don't forget the parenthesis
app.use(flash());

// Store flash messages in local variables
// Reminder: the res.locals object is reset to null on each request-resonse cycle. So the success and error variables are only accessible by ejs during hte cycle.
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
```

Now suppose in the boilerplate, you wrote something that renders a flash message when there is one, something like this:

```ejs
<!-- The below code basically says: if there is a success message, render a bootstrap alert -->
<% if (typeof success !== 'undefined' && success.length) { %>
<div class="alert alert-success alert-dismissible fade show col-10 offset-1" role="alert">
    <%= success %>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
<% }%>
```

In order to add a flash message, simply use the res.flash function:

Note that you use <i style="color: orange">req.flash('type')</i> to retrieve a flash message, and <i style="color: orange">res.flash('type', 'message')</i> to flash a message.

```javascript
const someMiddleWare = (req, res) => {
  /* some code */
  res.flash('success', 'Hey, this is a success message'); // res.flash(...) != req.flash(...)
  res.flash('error', "And this is an error message"); 
  /* other stuff */
}
```

Now whenever you flash a message, the next page rendered by express will display that message.

---

<h1 style="text-align: center">Section 50: Authentication</h1>

## Authentication vs. Authorization:

- Authentication: Verifying the identity of a user
- Authorization: Verifying what the user can do and cannot do

## Password hashing:

For security reasons, it is never a good idea to store users' passwords in plain text. It is impossible to extract users' passwords by looking at a well-designed database. 

The way we verify a user's password without storing is is by using a hash function. Given a password string, a hash function outputs a hashcode that cannot be reversed to the password.

## Properties of a good cryptographic hash function:

- It should be a one-way function. i.e. You can never revert a hash code the function spits out to the actual password.
- Small change in input should yield in a large change in the output.
- Determinism: A same input always yields the same output.
- It should be almost impossible to find a two strings that collide to a same output.
- The hash function should be deliberately slow so that we cannot simply try a bunch of inputs to see which one corresponds to the hashcode we want to have. 

# Salting

The number of hashing functions that websites use are very small, and a few hundred of the most used passwords can contain a huge percentage of what people use as their passwords. Therefore, a hacker that steals a webisite's database can look at the hashcodes and identify some common hashcodes that correspond to some common passwords.

In order to avoid this, we use salting, which is a procedure that adds random information in the password before hashing. 



## Passport

Passport is a all-in-one authintication tool. We can use multiple **strategies** in passport, which are ways of authenticating a user. For exeample local login (with username and password), Google login, Facebook login, Github login etc etc. 

### Password local mongoose

We can use a local strategy with mongoose (you first have to install the *passport* package, then *passport-local* for local stategies, and *passport-local-mongoose* to use mongoose to store users' information)

### Defining a user Schema

```javascript
// Import the necessary plugins
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Defining the user schema. Don't have to specity username and password, because those are defined by the plugin below.
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// password local mongoose plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
```



### Configuration in app.js

Now that we have set up the whole thing, we can configure express to use passport-local-mongoose.

```javascript
/* ... other code ... */
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require('/path/to/the/user/schema.js')

app.use(passport.initialize()); // You have to have this line to use passport
app.use(passport.session()); // Note that you have to use express session before using passport session

/* passport.use() : pass in the authentication strategy to passport
new LocalStategy() : you pass in a authentication function/method 
User.authenticate() generates an authentication function used in local strategy*/
passport.use(new LocalStategy(User.authenticate()));

// telling passport how to serialize and deserialize users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

### Registering an user

The User.register(userObject, password) function creates a user with hashed password.

```javascript
User.register({username: "Jonhn Cena", email:"johncena@gmail.com"}, password);
```

### Authentication/Login

We can use a middleware function built-in to passport to authenticate an user.
Say we want to be treat a post request to /login. The request is going to include a username and a password for authentication.

```javascript
app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  res.flash('success', "Successfully logged in");
  res.redirect('/mainpage');
});
```

**Explaination:** When we set up <i style="color: orange">passport.use(new LocalStategy(User.authenticate()));</i> this tells passport what to do when we type passport.authenticate('local' , options). It authenticates the user, and if the authintication failed, failureFlash:true tells passport to flash an error message to the user, and failureRedirect: '/login' redirects the user to hte login page (with the flashed message of course).

### Require authentication to some paths

Now say there are certain requests that we only want users who are authenticated to be able to use. Password actually adds a <i style="color:orange">req.isAuthenticated()</i> function that returns a boolean telling you whether the request is made by an authenticated user. 

```javascript
app.get('/authenticated-only', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('/path/to/the/page');
  } else {
    res.flash('error', 'You must be signe id');
    res.redirect('/main')
  }
})
```

### Logout

Here you go:

```javascript
req.logout();
```

### Retrieving information relative to a user

```javascript
req.user;
```

The <i style="color:orange">req.user</i> field is the deserialized form of the user object. It doens't contain the salt nor the hashed password.
We can put this in a local variable so that we have access to it in ejs templates. 

### Login

Similar to the <i style="color:orange">req.logout()</i>, there is a <i style="color:orange">req.login()</i> function. When we authenticate an user (see authentication section above), this method is automatically called. But say the user registers, and we want to log the user in automatically after a successful registration, we can use this function.

```javascript
req.login(registeredUserObject, err => {
  if (err) return next();
  /* code what happens if no error */
});
// Note that this method doesn't support promises, so you have to have a callback function.
```

### Original URL

When we redirect a user to a page (say if we require the user to login), we may want to save in the session where the user was trying to access before we redirected him so that we can send him back to that original url.

```javascript
req.session.returnTo = req.originalUrl;
```



---

<h1 style="text-align: center">Section 53 Refactoring request handling code</h1>



## Routes

In order to make our route code look cleaner, we can group multiple http verbs associated with the url together.

**Exeample:**

Instead of having:

```javascript
route.get('/some/route', (req, res) => {
  /* GET method code */
})

route.post('/some/route', (req, res) => {
  /* POST method code */
})

route.delete('/some/route', (req, res) => {
  /* DELETE method code */
})
```

The code above treats different http actions to the same route. We can group and chain different methods together under <i style="color:orange">router.route('/my/route')</i>:

```javascript
route.route('/some/route')
  .get((req, res) => {/* GET method code */})
  .post((req, res) => {/* POST method code*/ })
  .delete((req, res) =. {/* DELETE method code */});
```

Chaining different methods makes the code cleaner.

## Controllers

To further simplify our code, we can put the middleware functions in a separate file. Say we have a route handler to handle shelters <i style="color:cyan">/controllers/shelters.js</i> :

```javascript
// Inside shelters.js
module.exports.renderShelter = (req, res) => {/* code */};
module.exports.modify = async (req, res) => {/* code */};
module.exports.delete = async (req, res) => {/* code */};
```

And in <i style="color:cyan">/routes/shelters.js</i> :

```javascript
const shelters = require("../controllers/shelter");

route.route('/some/route')
  .get(shelters.renderShelter)
  .put(shelters.modify)
  .delete(shelters.delete);
```

