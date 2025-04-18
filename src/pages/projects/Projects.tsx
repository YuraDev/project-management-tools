import { NavLink, useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import styles from "./Projects.module.css";
import { useProjectControlStore } from "../../store/projectControlStore";
import { Project } from "../../types/project";
import { Settings } from "lucide-react";

const Projects = () => {
    const navigate = useNavigate();
    const { data: projects, isLoading, isError } = useProjects();

    const selectedProject = useProjectControlStore((state) => state.selectedProject);
    const clearFiltersAndSorts = useProjectControlStore((state) => state.clearFiltersAndSorts);
    const setSelectedProject = useProjectControlStore((state) => state.setSelectedProject);

    const handleChoseProject = (chosenProject: Project) => {
        if (chosenProject.id !== selectedProject?.id)
            clearFiltersAndSorts();
        setSelectedProject(chosenProject);
    }
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError}</div>;

    const handleSettingsClick = (event: React.MouseEvent, projectId: string) => {
        event.stopPropagation();
        console.log("navigate")
        navigate(`/projects/${projectId}/settings`);
    }

    return(
        <div className={styles.main}>
            {
                projects?.map((project) => 
                    <NavLink to={`/projects/${project.id}`} key={project.id} onClick={() => handleChoseProject(project)}>
                        <div className={styles.element}>
                            <div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                            {/* <div className={styles.settingIconWrapper}>
                                <Settings size={28} className={styles.settingsIcon} onClick={(event) => handleSettingsClick(event, project.id)}/>
                            </div> */}
                        </div>
                    </NavLink>
                )
            }
        </div>
    )
}

export default Projects;