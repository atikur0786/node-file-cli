#! /usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();

// To list all files in a given directory in cli
program
  .command("list [dirPath]")
  .description("Lists all files in the specified directory")
  .action((dirPath = ".") => {
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

program
  .command("create <filePath> <fileName>") // filePath = directory, fileName = actual file
  .description("Create a file in the given path with the provided name")
  .action((filePath, fileName) => {
    try {
      const absolutePath = path.resolve(filePath);

      if (!fs.existsSync(absolutePath)) {
        console.error("Error: Directory does not exist.");
        return;
      }

      const fullFilePath = path.join(absolutePath, fileName); // Correctly form the file path

      if (fs.existsSync(fullFilePath)) {
        console.error("Error: File already exists.");
        return;
      }

      fs.writeFileSync(fullFilePath, "", "utf8"); // Create an empty file
      console.log(`✅ File created: ${fullFilePath}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

// write content to a file in existing directory from cli
program
  .command("write <filePath> <content>") // Content is now required (no square brackets)
  .description("Write content to a file in the given path")
  .action((filePath, content) => {
    try {
      const absolutePath = path.resolve(filePath);

      if (!fs.existsSync(absolutePath)) {
        console.error("Error: File does not exist.");
        return;
      }

      fs.writeFileSync(absolutePath, content, "utf8");
      console.log(`✅ Content written to file: ${absolutePath}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program
  .command("append <filePath> <content>")
  .description("Append content to an existing file")
  .action((filePath, content) => {
    try {
      const absolutePath = path.resolve(filePath);

      if (!fs.existsSync(absolutePath)) {
        console.error("Error: File does not exist.");
        return;
      }

      fs.appendFileSync(absolutePath, "\n" + content, "utf8"); // Append new content
      console.log(`✅ Content appended to file: ${absolutePath}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program
  .command("read <filePath>")
  .description("Read the content of a file")
  .action((filePath) => {
    try {
      const absolutePath = path.resolve(filePath);

      if (!fs.existsSync(absolutePath)) {
        console.log("Error: File does not exist.");
        return;
      }

      const content = fs.readFileSync(absolutePath, "utf8");
      console.log(`📄 Content of ${absolutePath}: `, content);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program
  .command("delete <filePath>")
  .description("Delete a file from the given path")
  .action((filePath) => {
    try {
      const absolutePath = path.resolve(filePath);

      if (!absolutePath) {
        console.log("Error: File does not exist.");
        return;
      }

      fs.unlinkSync(absolutePath);
      console.log(`✅ File deleted: ${absolutePath}`);
    } catch (error) {
      console.log("Error:", error.message);
    }
  });

program
  .command("update <filePath> <newContent>")
  .description("Update the file content")
  .action((filePath, newContent) => {
    try {
      const absolutePath = path.resolve(filePath);

      if (!fs.existsSync(absolutePath)) {
        console.error("Error: File does not exist.");
        return;
      }

      fs.writeFileSync(absolutePath, newContent, "utf8");

      console.log(`✅ File updated: ${absolutePath}`);
    } catch (error) {
      console.error("Error:", error);
    }
  });

program
  .command("rename <oldPath> <newPath>")
  .description("Rename a file by providing the old and new paths")
  .action((oldPath, newPath) => {
    try {
      const absoluteOldPath = path.resolve(oldPath);
      const absoluteNewPath = path.resolve(newPath);

      if (!fs.existsSync(absoluteOldPath)) {
        console.error("Error: File does not exist.");
        return;
      }

      fs.renameSync(absoluteOldPath, absoluteNewPath);
      console.log(`✅ File renamed: ${absoluteOldPath} -> ${absoluteNewPath}`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program.parse(process.argv);
