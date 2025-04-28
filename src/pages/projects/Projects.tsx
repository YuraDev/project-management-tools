import { NavLink } from "react-router-dom";
import { useProjectControlStore } from "../../store/projectControlStore";
import { Project } from "../../types/project";
import { useUserProjects } from "../../hooks/users/useUserProjects";
import { useUserStore } from "../../store/userStore";
import { useUserThemeStore } from "../../store/userThemeStore";

const Projects = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const { data: projects, isLoading, isError } = useUserProjects(currentUser?.id || "");

    const selectedProject = useProjectControlStore((state) => state.selectedProject);
    const clearFiltersAndSorts = useProjectControlStore((state) => state.clearFiltersAndSorts);
    const setSelectedProject = useProjectControlStore((state) => state.setSelectedProject);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

    const handleChoseProject = (chosenProject: Project) => {
        if (chosenProject.id !== selectedProject?.id)
            clearFiltersAndSorts();
        setSelectedProject(chosenProject);
    }

    const themeClassMap = {
        purple: "hover:bg-[#f5f3ff] hover:shadow-lg",
        green: "hover:bg-[#dcfce7] hover:shadow-lg",
        blue: "hover:bg-[#dbeafe] hover:shadow-lg",
        orange: "hover:bg-[#ffedd5] hover:shadow-lg",
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: Something went wrong while fetching the projects!{isError}</div>;
    if (projects?.length === 0) return <div>No projects found.</div>;
    
    return (
        <div
          className={`min-h-[calc(100vh-100px)] px-9 py-7 flex flex-col gap-3 ${
            backgroundMode === "black" ? "bg-black text-white" : "bg-[#f9f9fb] text-black"
          }`}
        >
          {projects?.map((project) => (
            <NavLink to={`/projects/${project.id}`} key={project.id} onClick={() => handleChoseProject(project)}>
              <div
                className={`border border-[#E2E8F0] rounded-xl p-4 bg-white shadow-sm cursor-pointer transition-all ease-in-out duration-200 flex justify-between items-center ${
                  highlightMode && themeClassMap[highlightMode]
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#1A202C] mb-1">{project.title}</h3>
                  <p className="text-sm text-[#4A5568]">{project.description}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      );
}

export default Projects;