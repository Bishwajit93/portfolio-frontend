"use client"


import { Project } from "@/types/project"
import ProjectCard from "./components/ProjectCard"
import { fetchProjects } from "@/api"

import { useEffect, useState} from "react"

export default function ProjectPage(){
  const[projects,setProjects] = useState<Project[]>([])
  const[loading,setLoading] = useState(true)

  useEffect(()=> {
    fetchProjects()
      .then(setProjects)
      .catch((err)=> {
        console.error(err)
        alert("SOrry! Failed to load Pprojects...")
      })
      .finally(() => setLoading(false))
  }, [])
  
  return(
    <main>
      <h1 className="text-3xl font-bold mb-4">🛠️ My Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </main>
  )
}