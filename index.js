import express from 'express';
import { DBManager } from './db.js';

const app = express();
const dbManager = new DBManager();

app.use(express.json());

// Dossier public
app.use(express.static('./public'));

app.get('/visitors', async (req, res) => {
    const data = await dbManager.getVisitors();
    res.json(data[0]);
});

app.listen(3005, () => {
    console.log(`Api ?? sur port 3005 💜`);
});