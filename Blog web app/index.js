import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.post("/", (req, res) => {
    const blogName = req.body.blogName;
    const blogBody = req.body.blogBody;
    if(blogName.trim() != "" && blogBody.trim() != ""){
        posts.push({name: blogName, body: blogBody});
        console.log(posts)
        // res.render("index.ejs", {posts: posts});
    }
    else{
        console.log("Naaah")
    }
    res.redirect("/");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
})



app.listen(port, (req, res) => {
    console.log(`Server is litening at port ${port}`);
    console.log(posts)
});

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
