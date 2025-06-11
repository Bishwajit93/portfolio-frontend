"use-client"

import {useState} from "react"

type AddProjectFormProps =  {
    onAdd: (projectData:{title: string; description: string; techStack: string}) => void
}

export default function AddProjectForm({onAdd}: AddProjectFormProps){
    const [title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[techStack, setTechStack]= useState("")

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        onAdd({title, description, techStack})
        setTitle("")
        setDescription("")
        setTechStack("")
    }

    return(
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label className="block mb-y font-semibold">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                    rows={4}
                />
            </div>
            <div>
                <label className="block mb-1 font-semibold">
                    Tech Stack
                </label>
                <input
                    type="text"
                    value={techStack}
                    onChange={(e)=>setTechStack(e.target.value)}
                    required
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
                Add Project
            </button>
        </form>
    )
}