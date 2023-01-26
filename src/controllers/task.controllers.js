const pool = require("../postegres");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM  task");
    res.json(allTasks.rows);
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
  }
};

const createTask = async (req, res) => {
  console.log(req.params.id);
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
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
