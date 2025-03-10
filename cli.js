#! /usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();

program.command("list [dirPath]").description("Lists all files in the specified directory").action((dirPath = ".") => {
    try {
        const absolutePath = path.resolve(dirPath); // Convert to absolute path

        if (!fs.existsSync(absolutePath)) {
            console.error("Error: Directory does not exist.");
            return;
        }

        const stats = fs.statSync(absolutePath);
        if (!stats.isDirectory()) {
            console.error("Error: Provided path is not a directory.");
            return;
        }

        const files = fs.readdirSync(absolutePath); // Read directory contents
        console.log(`📂 Files in ${absolutePath}:`);
        files.forEach((file) => {
            console.log(`  - ${file}`);
        });

    } catch (error) {
        console.error("Error:", error.message); // Handle errors
    }
});

program.parse(process.argv);