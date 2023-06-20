const core = require('@actions/core');

function run() {
  try {
    const changedFilesString = core.getInput('all_changed_files');  // Get changed files from the changed-files action
    const changedFiles = changedFilesString.split(' ');  // Split into an array of file paths
    const pathPrefix = core.getInput('path_prefix');
    const directories = new Set();

    for (const file of changedFiles) {
      const parts = file.split('/');
      if (parts.length > 2) {
        const directory = parts[2]; // Get the directory name directly
        if (directory) {
          directories.add(directory);
        }
      }
    }

    const sanitizedDirectories = Array.from(directories);

    const matrix = { element: sanitizedDirectories };

    core.setOutput('matrix', JSON.stringify(matrix));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
