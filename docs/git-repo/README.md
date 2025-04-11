
# Adding a project to the TAP Website
Here are the steps for adding your project from your Github repository to the TAP website at https://tapggc.org. Only one person in the team needs to get this process started, but others can also join to help editing.

## Find the code for the website
[Access the Code here] (https://github.com/TAP-GGC/tap-ws1-astro-agnosticui)

### 👀 Creating a Git Codespace
Start a Github Codespace to see previews of your changes (alternatively you can clone and run npm locally)

1. Click on the Code button, and select the Codespaces tab
![select <>Code](./Picture1.png)

2. Click on the “+” button to create a new codespace. This will open a browser tab with VS Code running in it. 
![new tab](./Picture2.png)

3. Make sure to install the “Live Server” plugin that will pop up as recommended. If you miss it, click on the Extensions button on the left sidebar and search and install it.
![Install Live Server](./Picture3.png)
When you install the Live Server extension, you should see that it will install NPM and then run steps to build the project. If this does not happen, you can type “npm i” for the first time you create your codespace. 

4. To see a preview of the current website, navigate to the terminal at the bottom and type “npm run dev”. This will process the files and start watching for changes. At the end, a pop up will ask you to view the site. Click on the “Open in Browser” button and the site preview will open on a new tab.
![How to preview](./Picture4.png)

5. At this point, you are ready to develop your project page.
![Ready to develop](./Picture5.png)


### Creating your project page 👀 
1. Start by creating your own team branch. Click on the fork icon on the VS Code left sidebar and then click on the “main” branch at the bottom-left of the screen. Once the menu pops, select “Create a new branch” and name your team branch. Then click on “Publish branch” to push your branch.
![Ready to develop](./Picture6.png)
![Ready to develop](./Picture7.png)

2. Now you are ready to make changes. If any of your teammates join, make sure they switch (not create) to the same branch. The steps to add a new project is roughly outlined in the README file of the repository. We will also have someone in class take you step by step. (Note that the “Create Metadata” link is now inside the “More” button on the TAP website menu). Also, your project file extension should now be **.mdx** (not .md).
![Create Metadata](../projects/CreateMarkdownPage.png)
 

### Submitting your project page 
Once you are happy with the changes you made in your team branch and everything is committed and published to Github, you can create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) so we can review and accept your changes. Start by navigating to the [pull requests section in our repo](https://github.com/TAP-GGC/tap-ws1-astro-agnosticui/pulls), click on the green **“New pull request”** button, and select your team branch on the **“compare:”** pulldown. If everything looks good, then press **“Create pull request”** to submit it.

#### Examples
You can follow the examples of previous projects:
**Ball is Life**: [page](https://tapggc.org/projects/2019/fall/ball-is-life/), [source](https://github.com/TAP-GGC/tap-ws1-astro-agnosticui/blob/main/src/content/projects/2019-08Fall/BallIsLife/BallIsLife.mdx) - click on the “Code” button so see the actual MDX content
