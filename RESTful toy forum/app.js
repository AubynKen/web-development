const express = require('express');
const path = require('path');
const uuid = require('uuid');
const methodOverride = require('method-override');

const app = express();
const generateId = uuid.v4;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({
    extended: true
}));

let comments = [{
        id: generateId(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: generateId(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: generateId(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: generateId(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', {
        comments
    });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const {
        userName,
        newComment
    } = req.body;
    comments.push({
        id: generateId(),
        username: userName,
        comment: newComment
    });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const {
        id
    } = req.params;
    const comment = comments.find(element => element.id === id);
    console.log(comment);
    res.render('comments/show', {
        comment
    });
});

app.get('/comments/edit/:id', (req, res) => {
    const {
        id
    } = req.params;
    res.render('comments/edit', {
        id
    });
});

app.patch("/comments/:id", (req, res) => {
    const {
        id
    } = req.params;
    const {
        newComment
    } = req.body;
    console.log("id", id, newComment);
    const comment = comments.find(element => element.id === id);
    comment.comment = newComment;
    res.redirect('/comments');
});

app.delete("/comments/:id", (req, res) => {
    const {
        id
    } = req.params;
    comments = comments.filter(el => el.id !== id);
    res.redirect('/comments');
});

app.listen(3000, (req, res) => {
    console.log("Sever up and running on port 3000");
});