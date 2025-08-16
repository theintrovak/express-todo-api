import express from "express"

const app = express();
const port = 3000;
app.use(express.json());
 let todos = [];
 let idno = 1;
 // create a task
 app.post("/add/:todos", (req ,res) => {
    const {title} = req.body;
    const todo = { id: idno++ , title , completed: false };
    todos.push(todo);
    res.status(201).json(todo);
    // get all tasks
 })
 app.get("/todos", (req ,res) => {
    if( todos.length === 0) {
        res.status(404).json({message: "No todos found"});
    }
    
    res.status(200).json(todos);
 })
 // get single task by id
 app.put("/todos/:id", (req ,res) => {
     const id = parseInt(req.params.id);
     const todo = todos.find((todo) => todo.id === id);
    if (!id) {
        res.status(404).json({message: "task not found"});
    }
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.status(200).json(todo);
 })
 // delete a task by id 
 app.delete("/todos/:id", (req , res) => {
    const id = parseInt(req.params.id);
     const todo = todos.find((todo) => todo.id === id);
     if (!todo){
         res.status(404).json({message: "Todo not found"});
     }
     todos = todos.filter((todo) => todo.id !== id);
     res.status(200).json({message: "task deleted successfully"})

 })


app.listen(port , () => {
    console.log(`server is running on port ${port}`);
});
