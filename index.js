import express from 'express';
import { DBManager } from './db.js';
import path from 'path';

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const urls = ['home', 'blog', 'music', 'fun'];

const app = express();
const dbManager = new DBManager();

app.use(express.json());

// Dossier public
app.use(express.static('./public'));

app.get('/visitors', async (req, res) => {
    const data = await dbManager.getVisitors();
    res.json(data[0]);
});

// Returns the website reviews
app.get('/reviews', async (req, res) => {
    const messages = await dbManager.getReviews();
    res.json(messages.reverse());
});

// Posts a new message on the messages board
app.post('/review', async (req, res) => {
    if (req.body.author && req.body.content) {
        dbManager.postReview(req.body);
        res.status(200);
    }
})

// Increments the dog's count
app.get('/dogkiller', async (req, res) => {
    dbManager.increaseCount('typodog');
    res.status(200);
})

app.listen(3005);

// 
app.get('*', function (req, res) {
    if (urls.includes(req.path.replace('/', ''))) {
        res.sendFile('/index.html', {root: path.join(__dirname, 'public')});
    } else {
        res.sendFile('/404.html', {root: path.join(__dirname, 'public')});
    }
});