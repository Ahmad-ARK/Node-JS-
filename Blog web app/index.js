import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let posts = [];
let postId = 1;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/posts', (req, res) => {
  const newPost = {
    id: postId++,
    name: req.body.blogName,
    body: req.body.blogBody,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('show', { post });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});