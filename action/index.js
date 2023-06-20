const core = require('@actions/core');

function run() {
  try {
    const changedFilesString = core.getInput('all_changed_files');  // Get changed files from the changed-files action
    const changedFiles = changedFilesString.split(', ');  // Split into an array of file paths
    const pathPrefix = core.getInput('path_prefix');
    const directories = {};

    for (const file of changedFiles) {
      const directory = file.replace(pathPrefix, '').split('/')[0];
      if (directory in directories) {
        directories[directory] = true;
      }
    }

    const elements = Object.keys(directories);
    const matrix = { element: elements };

    core.setOutput('matrix', JSON.stringify(matrix));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
