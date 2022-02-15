import Task from "../models/Tasks";
import Tasks from "../models/Tasks";

export async function getTask(req, res) {
  try {
    const tasks = await Tasks.findAll({
      attributes: ["id", "projectId", "name", "done"],
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      data: "No result found ",
    });
  }
}

export async function createTask(req, res) {
  const { name, done, projectId } = req.body;
  try {
    const newtask = await Tasks.create(
      {
        name,
        done,
        projectId,
      },
      {
        fields: ["name", "done", "projectId"],
      }
    );
    if (newtask) {
      return res.status(200).json({
        newtask,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messaje: "Something goes wrong",
      data: {},
    });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await Tasks.destroy({
      where: {
        id: id,
      },
    });
    if (deleteTask) {
      return res.status(200).json({
        deleteRowCount: deleteRowCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messaje: "Something goes wrong",
      data: {},
    });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { projectId, name, done } = req.body;

  try {
    const task = await Task.findOne({
      attributes: ["name", "projectId", "done", "id"],
      where: { id },
    });
    const updateTask = await Task.update(
      {
        name,
        done,
        projectId,
      },
      {
        where: { id },
      }
    );
    if (updateTask) {
      res.json({
        message: "Task Update",
        updateTask,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messaje: "Something goes wrong",
      data: {},
    });
  }
}

export async function getOneTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      where : {id}
    })
    if(task){
      return res.status(200).json({
      task
      });
    }
    else{
      res.status(500).json({
        messaje: "No result found",
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messaje: "Something goes wrong",
      data: {},
    });
  }
}

export async function getTaskByProject(req,res){
  const {projectId} = req.params;
  const tasks = await Task.findAll({
    attributes: [ 'id', 'projectId', 'done', 'name'], // los atributos a recibir
    where: {projectId}
  })
  res.json({tasks});
}