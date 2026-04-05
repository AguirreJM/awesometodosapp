export default function Todo(props) {
    // 1. Function to Toggle Status (PUT)
    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            props.setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        // This flips the checkmark
                        return { ...currentTodo, status: !currentTodo.status }
                    }
                    return currentTodo;
                });
            });
        }
    }; // <--- This bracket was missing!

    // 2. Function to Delete Todo (DELETE)
    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();

        if (json.acknowledged) {
            props.setTodos(currentTodos => {
                // This removes the todo from the list
                return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
            });
        }
    };

    return (
        <div className="todo">
            {/* The .replace removes the quotes from your text */}
            <p>{props.todo.todo.replace(/"/g, "")}</p>
            <div className="mutations">
                <button
                    className="todo__status"
                    onClick={() => updateTodo(props.todo._id, props.todo.status)}
                >
                    {(props.todo.status) ? "☑" : "☐"}
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(props.todo._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}
