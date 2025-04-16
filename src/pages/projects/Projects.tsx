import { NavLink } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import styles from "./Projects.module.css";
import { useProjectControlStore } from "../../store/projectControlStore";
import { Project } from "../../types/project";

const Projects = () => {
    const selectedProject = useProjectControlStore((state) => state.selectedProject);
    const clearFiltersAndSorts = useProjectControlStore((state) => state.clearFiltersAndSorts);
    const setSelectedProject = useProjectControlStore((state) => state.setSelectedProject);
    const { data: projects, isLoading, isError } = useProjects();

    const handleChoseProject = (chosenProject: Project) => {
        if (chosenProject.id !== selectedProject?.id)
            clearFiltersAndSorts();
        setSelectedProject(chosenProject);
    }
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError}</div>;

    return(
        <div className={styles.main}>
            {
                projects?.map((project) => 
                    <NavLink to={`/projects/${project.id}`} key={project.id} onClick={() => handleChoseProject(project)}>
                        <div className={styles.element}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    </NavLink>
                )
            }
        </div>
    )
}

export default Projects;