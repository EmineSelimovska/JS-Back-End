const { log } = require("console");
const handlebars = require('express-handlebars');
const express = require("express");
const path = require("path");
const app = express();

const {addCat, getCats} = require('./cats')

//Add handlebars to express
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars')

// Add third party middleware
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

app.use(express.static('public'));

// Add middlewares
app.use((req, res, next) => {
  console.log("Middleware1");
  next();
});

app.use((req, res, next) => {
  console.log(`HTTP Request ${req.method} : ${req.path}`);
  next();
});

// Partial route middleware
app.use("/cats", (req, res, next) => {
  console.log("Cats middleware");
  next();
});

// Route specific middleware
const specMiddleware = (req, res, next) => {
  console.log("Specific middleware");
  next();
};
app.get("/specific", specMiddleware, (req, res, next) => {
  res.send("Some specific route with middleware");
});

//Express router / Actions
app.get("/", (req, res) => {
 // res.send("Hello from Express!");
 res.render('home');
});

app.get("/about", (req, res) => {
    res.render('about')
})

//Don't work this!!
//app.get('/css/style.css', (req,res) => {
   // res.sendFile(path.resolve(__dirname,'public/css/style.css'))
//})

app.get("/cats", (req, res) => {
    const cats = getCats()
   
  res.render("cats", {cats});
});

app.post("/cats", (req, res) => {
  addCat(req.body.name, Number(req.body.age))
  
  res.redirect('/cats');
});

app.get("/cats/:catId", (req, res) => {
  const catId = Number(req.params.catId);
  if (!catId) {
    return res.status(404).send("Cannot find a cat!");
  }
  console.log(req.params);
  res.send(`Request with parametars - ${req.params.catId}`);
});

app.get("/download", (req, res) => {
  // res.download('./cv.pdf')
  // res.sendFile(path.resolve(__dirname,'cv.pdf'))
  // res.attachment('./cv.pdf')
  //  res.end()
});

app.get("/old-route", (req, res) => {
  res.redirect("/cats");
});

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});
//End of express router

app.listen(5000, () => console.log("Server is listening on port 5000..."));
