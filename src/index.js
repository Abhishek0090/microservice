// app.js
const express = require('express');
const app = express();
const Todo = require('./models/Todo');

app.use(express.json());

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll({});
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new todo
app.post('/todos', async (req, res) => {
    const { description } = req.body;
    try {
        const newTodo = await Todo.create({ description });
        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await todo.update({ description });
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await todo.destroy();
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
