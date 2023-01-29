import express from 'express';

const app = express();
app.use(express.json());

// Dossier public
app.use(express.static('./public'));

app.listen(3005, () => {
    console.log(`Api ?? sur port 3005 💜`);
});