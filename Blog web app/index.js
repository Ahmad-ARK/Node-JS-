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

let id = 0;

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

function createBlogPreview(blogBody, maxWords = 8){
    const preview = blogBody.split(' ').slice(0, maxWords).join(' ');
    return preview;
}

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if(post){
        res.render("show.ejs",{post});
        console.log(`Thats what you are looking for ${post}`);
    } else {
        res.status(404).send("Post not found");
    }
});

app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if(postIndex !== -1){
        posts.splice(postIndex, 1);
        console.log(`The post with id ${postId} has been deleted`);
        res.redirect("/")
    } else {
        res.status(404).send("Post not found");
    }

})

app.post("/", (req, res) => {
    const blogName = req.body.blogName;
    const blogBody = req.body.blogBody;
    if(blogName.trim() != "" && blogBody.trim() != ""){
        const previewBlog = createBlogPreview(blogBody);
        id++;
        posts.push({name: blogName,preview: previewBlog ,body: blogBody, id: id});
        console.log(posts)
        // res.render("index.ejs", {posts: posts});
    }
    else{
        return res.redirect("/?error=Please fill in all fields");
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
