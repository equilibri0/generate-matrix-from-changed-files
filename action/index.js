const core = require('@actions/core');

function run() {
  try {
    const changedFilesString = core.getInput('all_changed_files');  // Get changed files from the changed-files action
    const changedFiles = changedFilesString.split(', ');  // Split into an array of file paths
    const pathPrefix = core.getInput('path-prefix');
    const elements = [];

    for (const file of changedFiles) {
      const element = file.replace(pathPrefix, '').split('/')[0];
      elements.push(element);
    }

    const uniqueElements = [...new Set(elements)];
    const matrix = { element: uniqueElements };

    core.setOutput('matrix', JSON.stringify(matrix));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
