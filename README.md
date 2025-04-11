
# TAP Projects and Blog Website with Astro, AgnosticUI, and Vue.js

Website for browsing TAP projects and blog posts. Built with static and dynamic components using the [Astro](https://astro.build/) framework. UI components from [AgnosticUI](https://agnosticui.com/) and dynamic [Vue 3](https://vuejs.org/) components.

Hosted at [tapggc.org](https://tapggc.org) using [Github Pages](https://pages.github.com), which is automatically deployed from this repository on each commit to `main` branch.


## How to Build and Deploy

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
|:----------------  |:-------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |


## Creating a Git Codespace (no npm install)
Start a Github Codespace to see previews of your changes (alternatively you can clone and run npm locally)

1. Click on the Code button, and select the Codespaces tab
![]()

2. Click on the “+” button to create a new codespace. This will open a browser tab with VS Code running in it. 
![]()

3. Make sure to install the “Live Server” plugin that will pop up as recommended. If you miss it, click on the Extensions button on the left sidebar and search and install it.
![]()
When you install the Live Server extension, you should see that it will install NPM and then run steps to build the project. If this does not happen, you can type “npm i” for the first time you create your codespace. 

4. 
![]()

# Adding content

## How to Add a Blog Entry

Create a mdx file under `/src/content/posts/`, under the appropriate semester directory. Check metadata of other posts to set field appropriately. 

## 👀 How to Create a Project

See [instructions](docs/projects/README.md)

## 👀 How to Create a Student Profile

See [instructions](docs/student-profiles/README.md)