from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReadmeData(BaseModel):
    name: str
    titleLine: str
    bio: str
    githubUsername: str
    languages: str
    frameworks: str
    tools: str
    learning: str
    hobbies: str
    currentProject: str
    linkedin: str
    twitter: str
    github: str
    quote: str


@app.post("/generate-readme")
def generate_readme(data: ReadmeData):
    readme = f"""
## Hi there! 👋 I'm {data.name}

🚀 **{data.titleLine}**

{data.bio}

---

### 🛠️ Technologies & Tools

- 💻 **Languages:** {data.languages}
- ⚡ **Frameworks & Libraries:** {data.frameworks}
- 🔧 **Tools & Platforms:** {data.tools}

---

### 📌 About Me

- 🌱 Currently exploring **{data.learning}**
- 📚 {data.hobbies}
- ✨ Working on **{data.currentProject}**

---

### 📈 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username={data.githubUsername}&show_icons=true&theme=radical)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username={data.githubUsername}&layout=compact&theme=radical)

---

### 📫 Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)]({data.linkedin})
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)]({data.twitter})
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)]({data.github})

---

⚡ *"{data.quote}"*

🔥 Let's build something amazing together!
""".strip()

    return { "readme": readme }
