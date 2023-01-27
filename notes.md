# BACKEND

## 1. Paquetes principales

1. Express
2. Morgan: Ver por consolas de las peticiones
3. Cors: Permite comunicar dos servidores en distintos puertos

```javascript
npm i express morgan cors
```

## 2. Paquetes de desarrollo

1. Nodemon

```javascript
npm i nodemon -D
```

## 3. Modulo para conectar postgresql

1. pg: Permite la conexion a postgres

```javascript
npm i pg
```

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", //user default
  password: "helloluna19", // password que se ingreso en la instalacion
  host: "localhost", // localhost por defecto
  port: 5432,
  database: "tasksdb", // nombre de la base de datos
});

module.exports = pool;
```

### 3.1 Probar conexion de la bases de datos

```javascript
const { Router } = require("express");
const Pool = require("../postegres");

const router = Router();

// Se realiza la prueba en la ruta get
router.get("/tasks", async (req, res) => {
  const result = await Pool.query("SELECT NOW()");
  console.log(result);
  res.json(result.rows[0].now);
});
```

## 4. Controladores

Se utiliza los controladores para extraer funciones en este caso de la rutas con el objetivo que el codigo no sea tan largo.

```javascript
const getAllTasks = (req, res) => {
  res.send("retrieving a list of tasks");
};

const getTask = (req, res) => {
  res.send("retrieving a single task");
};

const createTask = (req, res) => {
  res.send("create a list of tasks");
};

const deleteTask = (req, res) => {
  res.send("delete a list of tasks");
};

const updateTask = (req, res) => {
  res.send("update a list of tasks");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
```

Las rutas queda mucho mas cortas

```javascript
const { Router } = require("express");
const Pool = require("../postegres");

const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.controllers");

const router = Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks", updateTask);

module.exports = router;
```

### Controladores

```javascript
const pool = require("../postegres");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM  task");
    res.json(allTasks.rows);
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "task not found",
      });
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "task not found",
      });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
```

## Midlewares de Error

Se realiza un midlewares para el manejo de errores en index.js se coloca despues de la consulta de las rutas.
Esta funcion tiene una condicion especial, tiene 4 argumentos que lo caracteriza:

- request
- response
- next: es una funcion callback que nos permite ejecutarse despues de una acción.
- err: indica el error

```javascript
app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoute);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});
```

El argumento next() se agrega a cada uno de los controladores en este caso caso particular a las tareas controladas. En la proxima imagen se createTask con el tercer argumento se incluye next se incluye despues de catch(error).

```javascript
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
```

### Manejador de errores

Se incluye la siguiente linea dentro del try para el manejo de errores

```javascript
throw new Error("Algo esta mal");
```

## Variables de entorno (revisar)

## CORS

solo agregamos el modulo de cors

```javascript
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const taskRoute = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoute);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000, () => {
  console.log("server en port 4000");

```

## Comandos SQL

```sql
\l : ver tablas
CREATE DATABASE nombre_base_de_datos; Crear bases de datos
\c nombre_base_de_datos:  conectar con base de datos
SELECT * FROM task



```
