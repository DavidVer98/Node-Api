import Project from "../models/Projects";

export async function getProjects(req, res) {
  try {
    const proyects = await Project.findAll();
    res.status(200).json({
      data: proyects,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getOneProject(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        id: id,
      },
    });
    if (project) {
      res.status(200).json({
        data: project,
      });
    } else {
      res.status(500).json({
        data: "No result found ",
      });
    }
  } catch (error) {
    console.log(e);
  }
}

export async function createProject(req, res) {
  const { name, priority, description, deliverydate } = req.body;

  try {
    let newProject = await Project.create(
      {
        name,
        priority,
        description,
        deliverydate,
      },
      {
        fields: ["name", "priority", "description", "deliverydate"],
      }
    );
    if (newProject) {
      return res.json({
        messaje: "Project created successfully",
        data: newProject,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      messaje: "Something goes wrong",
      data: {},
    });
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await Project.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount) {
      res.status(200).json({
        message: "The project was deleted",
        count: deleteRowCount,
      });
    } else {
      res.status(500).json({
        message: "The project does not exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const {name, priority, description, deliverydate} = req.body;
  try {
    const project = await Project.update(
      // attributes[],
      {
        name,
        priority,
        description,
        deliverydate,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (project != 0){
    res.status(200).json({
      data: project,
      message: 'Project data updated',
    });
  }else{
    res.status(200).json({
      message: 'Failed to update project',
    });
  }
  } catch (error) {
    console.log(error);
  }
}
