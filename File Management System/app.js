class FileManager {
    constructor() {
        this.files = [];
    }

    // Create a file
    createFile(fileName, fileContent) {
        return new Promise((resolve, reject) => {
            if (fileName && fileContent) {
                const file = { name: fileName, content: fileContent, timestamp: new Date() };
                this.files.push(file);
                resolve(`File '${fileName}' created successfully!`);
            } else {
                reject("File name and content cannot be empty.");
            }
        });
    }

    // Upload a file
    uploadFile(fileName, fileContent) {
        return new Promise((resolve, reject) => {
            if (fileName && fileContent) {
                const file = { name: fileName, content: fileContent, timestamp: new Date() };
                this.files.push(file);
                resolve(`File '${fileName}' uploaded successfully!`);
            } else {
                reject("Please provide file content.");
            }
        });
    }

    // Download a file
    downloadFile(fileName) {
        return new Promise((resolve, reject) => {
            const file = this.files.find(f => f.name === fileName);
            if (file) {
                resolve(file.content);
            } else {
                reject(`File '${fileName}' not found!`);
            }
        });
    }

    // Delete a file
    deleteFile(fileName) {
        return new Promise((resolve, reject) => {
            const fileIndex = this.files.findIndex(f => f.name === fileName);
            if (fileIndex !== -1) {
                this.files.splice(fileIndex, 1);
                resolve(`File '${fileName}' deleted successfully!`);
            } else {
                reject(`File '${fileName}' not found!`);
            }
        });
    }

    // Show all file names
    showFileNames() {
        return new Promise((resolve, reject) => {
            if (this.files.length > 0) {
                resolve(this.files.map(f => f.name).join(", "));
            } else {
                reject("No files available.");
            }
        });
    }
}

// Instantiate the FileManager
const fileManager = new FileManager();

// Function to create a file
function createFile() {
    const fileName = document.getElementById('fileName').value;
    const fileContent = document.getElementById('fileContent').value;

    fileManager.createFile(fileName, fileContent)
        .then(message => {
            showMessage(message);
            // Clear the input fields after creating the file
            document.getElementById('fileName').value = '';
            document.getElementById('fileContent').value = '';
        })
        .catch(error => showMessage(error));
}


// Function to upload a file
function uploadFile() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            fileManager.uploadFile(file.name, reader.result)
                .then(message => showMessage(message))
                .catch(error => showMessage(error));
        };
        reader.readAsText(file);
    } else {
        showMessage("Please select a file.");
    }
}

// Function to download a file
function downloadFile() {
    const fileName = prompt("Enter the name of the file to download:");
    fileManager.downloadFile(fileName)
        .then(content => {
            const blob = new Blob([content], { type: "text/plain" });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        })
        .catch(error => showMessage(error));
}

// Function to delete a file
function deleteFile() {
    const fileName = prompt("Enter the name of the file to delete:");
    fileManager.deleteFile(fileName)}
    ;
