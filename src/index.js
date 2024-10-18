// import exphbs from "express-handlebars"
const express = require("express")
const path = require("path")
const app = express()
const LogInCollection = require("./mongo")

app.use(express.json())
 
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
// console.log(publicPath);

// app.engine("handlebars", exphbs({ defaultLayout: "main" })); 
app.set("view engine", "hbs"); 
app.use(express.static("images")); 
app.set('views', tempelatePath)
app.use(express.static(publicPath))

//ROUTES
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.post('/signup', async (req, res) => {
     const data = {
        name: req.body.name,
        password: req.body.password
    }
    const checking = await LogInCollection.findOne(data)
    console.log(checking);
     try{
        if (checking!=null) {
        res.send("User details already exists")
    }
    else
    {
        await LogInCollection.create([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }
    res.status(201).render("home", {
        naming: req.body.name
    })
    // console.log(__dirname);
    // res.sendFile(path.join(__dirname, '../tempelates/home.hbs'));
})


app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            // res.status(201).render("index", { naming: `${req.body.password}+${req.body.name}` })
            // console.log(__dirname);
            res.status(201).render("home", {
                naming: req.body.name
            })
                      
        }
        else {
            res.send("incorrect password")
        }
    } 
    catch (e) {
        res.send("wrong details")
    }
})



const port = process.env.PORT || 3000 ;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});