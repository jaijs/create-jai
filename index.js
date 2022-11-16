#!/usr/bin/env node
const cwd=process.cwd();
const { execSync } = require('child_process');
const os = require('os');
const fs= require("fs");
const path = require("path")

// STEP 1: Create a new folder
const repoName = process.argv[2]; // get folder name
if(!repoName){
    console.log("Please provide a folder name")
    return
}

// create folder
const repoPath = `${cwd}/${repoName}`;

// copy folder
if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath);
}
if (!fs.existsSync(repoPath+'/src')) {
    fs.mkdirSync(repoPath+'/src'); // create src folder
}



// Copy files to src folder
const code=`'use-strict'

const { Jai,  JaiDOM} = require('@singh_harpal/jai-js');

let HTML=<div>
    <h1>Hello World</h1>
    <i>{msg}</i>
</div>

const App=new JaiDOM({
    data: { msg:" Jai is awesome" }, html:HTML
})

export default App;
`;

fs.writeFileSync(`${repoPath}/src/index.js`, code);


// STEP 2: Install dependencies


const runCommand = (command) => {
    try { 
        execSync(command, { stdio: 'inherit' });
    }
    catch (e) {
        console.log(`Failed to execute: ${command}`, e);
        return false
    }

return true
}

const dependencies = ['@singh_harpal/jai-js', '@singh_harpal/jai-cli', 'jai-server']; // list of dependencies
const installDependenciesCommand = `cd ${repoName} && npm install ${dependencies.join(' ')}`; // install dependencies


// STEP 3: Run commands
console.log("Installing Jai dependencies...")

const packageJson = {
    name: repoName,
    version: '1.0.1',
    private: true,
    scripts: {
        start:'jai-cli start'
    }
  };
  fs.writeFileSync(
    path.join(repoPath, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
runCommand(installDependenciesCommand);


