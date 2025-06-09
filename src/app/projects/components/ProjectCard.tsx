import { Project } from "@/types/project"
export default function ProjectCard({project}: {project:Project}){
    return(
      <li className="mb-4 p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
        <p className="mb-1">{project.description}</p>
        <p className="text-sm text-gray-600">{project.tech_stack}</p>
      </li>
    )
}