from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body
class ReadmeRequest(BaseModel):
    projectName: str
    description: str
    technologies: str
    github: str

@app.post("/generate-readme")
async def generate_readme(data: ReadmeRequest):
    tech_list = "\n".join([f"- {tech.strip()}" for tech in data.technologies.split(",") if tech.strip()])

    readme_content = f"""# {data.projectName}

## Description
{data.description}

## Technologies Used
{tech_list}

## Author
[GitHub Profile]({data.github})
"""

    return {"readme": readme_content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
