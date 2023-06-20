const core = require('@actions/core');

function run() {
  try {
    const changedFilesString = core.getInput('all_changed_files');  // Get changed files from the changed-files action
    const changedFiles = changedFilesString.split(', ');  // Split into an array of file paths
    const pathPrefix = core.getInput('path_prefix');
    const directories = [];

    for (const file of changedFiles) {
      const parts = file.split('/');
      if (parts.length > 2) {
        const directory = parts.slice(2, -1).join('/'); // Get the directory name by removing the last part of the file path
        if (directory) {
          const fullPath = pathPrefix ? `${pathPrefix}/${directory}` : directory; // Apply path prefix if provided
          directories.push(fullPath);
        }
      }
    }

    const matrix = { element: directories };

    core.setOutput('matrix', JSON.stringify(matrix));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
