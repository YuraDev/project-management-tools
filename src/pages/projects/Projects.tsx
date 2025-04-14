import { NavLink } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import styles from "./Projects.module.css";

const Projects = () => {

    const { data: projects, isLoading, isError } = useProjects();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError}</div>;

    return(
        <div className={styles.main}>
            {
                projects?.map((project) => 
                    <NavLink to={`/projects/${project.id}`} key={project.id}>
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