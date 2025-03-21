# node-file-cli

A command-line interface (CLI) tool for file operations in Node.js.

## Installation

```bash
npm install -g node-file-cli
```

## Usage

`node-file-cli` provides several commands to manage files from the terminal:

### List Files in a Directory

Lists all files in the specified directory. If no directory is provided, it lists files in the current directory.

```bash
node-file-cli list [dirPath]
```

Examples:

```bash
node-file-cli list
```

```bash
node-file-cli list ./documents
```

### Create a New File

Creates a new empty file at the specified location.

```bash
node-file-cli create <dirPath> <fileName>
```

Example:

```bash
node-file-cli create ./documents myfile.txt
```

### Write Content to a File

Writes content to a file, replacing any existing content.

```bash
node-file-cli write <filePath> <content>
```

Example:

```bash
node-file-cli write ./documents/myfile.txt "Hello, world!"
```

### Append Content to a File

Appends new content to an existing file.

```bash
node-file-cli append <filePath> <content>
```

Example:

```bash
node-file-cli append ./documents/myfile.txt "This is additional text."
```

### Read File Content

Displays the content of a file.

```bash
node-file-cli read <filePath>
```

Example:

```bash
node-file-cli read ./documents/myfile.txt
```

### Update File Content

Updates the entire content of a file.

```bash
node-file-cli update <filePath> <newContent>
```

Example:

```bash
node-file-cli update ./documents/myfile.txt "This is the updated content."
```

### Delete a File

Deletes a file from the specified path.

```bash
node-file-cli delete <filePath>
```

Example:

```bash
node-file-cli delete ./documents/myfile.txt
```

### Rename a File

Renames a file by providing the old and new paths.

```bash
node-file-cli rename <oldPath> <newPath>
```

Example:

```bash
node-file-cli rename ./documents/oldname.txt ./documents/newname.txt
```

## Error Handling

The CLI provides error messages for common issues:

- When a specified directory or file doesn't exist
- When trying to create a file that already exists
- When attempting operations on invalid paths
