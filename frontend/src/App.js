import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    titleLine: "",
    bio: "",
    githubUsername: "",
    languages: "",
    frameworks: "",
    tools: "",
    learning: "",
    hobbies: "",
    currentProject: "",
    linkedin: "",
    twitter: "",
    github: "",
    quote: ""
  });

  const [readme, setReadme] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      <h2 className="text-3xl font-bold text-center mb-4">GitHub Profile README Generator</h2>

      <form onSubmit={handleSubmit} className="bg-white p-5 shadow-lg rounded-lg space-y-4">
        <input name="name" placeholder="Full Name" className="form-control" onChange={handleChange} />
        <input name="titleLine" placeholder="Title Line (e.g. Web Dev | Tech Lover)" className="form-control" onChange={handleChange} />
        <textarea name="bio" placeholder="Short Bio" className="form-control" onChange={handleChange} />

        <input name="githubUsername" placeholder="GitHub Username (for stats)" className="form-control" onChange={handleChange} />
        <input name="languages" placeholder="Languages (e.g. JS, Python)" className="form-control" onChange={handleChange} />
        <input name="frameworks" placeholder="Frameworks & Libraries (e.g. React, Bootstrap)" className="form-control" onChange={handleChange} />
        <input name="tools" placeholder="Tools & Platforms (e.g. Git, VS Code)" className="form-control" onChange={handleChange} />

        <input name="learning" placeholder="Currently learning..." className="form-control" onChange={handleChange} />
        <input name="hobbies" placeholder="Hobbies / Side interests" className="form-control" onChange={handleChange} />
        <input name="currentProject" placeholder="Current project you're working on" className="form-control" onChange={handleChange} />

        <input name="linkedin" placeholder="LinkedIn URL" className="form-control" onChange={handleChange} />
        <input name="twitter" placeholder="Twitter URL" className="form-control" onChange={handleChange} />
        <input name="github" placeholder="GitHub Profile URL" className="form-control" onChange={handleChange} />

        <input name="quote" placeholder='Custom Quote (e.g. "Code is like humor...")' className="form-control" onChange={handleChange} />

        <button type="submit" className="btn btn-primary w-full mt-3">Generate README</button>
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
