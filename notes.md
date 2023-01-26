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

router.get("/tasks/8", getTask);

router.post("/tasks", createTask);

router.delete("/tasks", deleteTask);

router.put("/tasks", updateTask);

module.exports = router;
```

## Comandos SQL

```sql
\l : ver tablas
CREATE DATABASE nombre_base_de_datos; Crear bases de datos
\c nombre_base_de_datos:  conectar con base de datos



```
