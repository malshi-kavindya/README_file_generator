import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    technologies: "",
    github: "",
  });

  const [readme, setReadme] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/generate-readme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setReadme(data.readme);
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-4">GitHub README Generator</h2>

      <form onSubmit={handleSubmit} className="bg-white p-5 shadow-lg rounded-lg">
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="projectName"
            className="form-control"
            placeholder="Enter project name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Enter project description"
            onChange={handleChange}
            required
          ></textarea>
        </div>


        <div className="mb-3">
          <label className="form-label">Technologies Used</label>
          <input
            type="text"
            name="technologies"
            className="form-control"
            placeholder="Comma-separated (e.g., React, FastAPI)"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">GitHub Profile URL</label>
          <input
            type="url"
            name="github"
            className="form-control"
            placeholder="https://github.com/yourusername"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Generate README</button>
      </form>

      {readme && (
        <div className="mt-5 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-xl font-semibold">Generated README</h3>
          <pre className="whitespace-pre-wrap p-2 bg-white border">{readme}</pre>
          <button className="btn btn-success mt-2" onClick={() => navigator.clipboard.writeText(readme)}>
            Copy to Clipboard
          </button>
          
        </div>
      )}
    </div>
  );
}

export default App;
