import express from 'express';
import { urlencoded, static as expressStatic } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

app.use(urlencoded({ extended: true }));
app.use(expressStatic(join(__dirname, 'public')));
app.set('view engine', 'ejs');

const tasks = [];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
