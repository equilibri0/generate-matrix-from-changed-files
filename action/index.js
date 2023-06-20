const core = require('@actions/core');

try {
  const changedFilesString = core.getInput('all_changed_files');
  const changedFiles = changedFilesString.split(', ');
  const pathPrefix = core.getInput('path_prefix');
  const directories = [];

  for (const file of changedFiles) {
    const parts = file.split('/');
    if (parts.length > 2) {
      const directory = parts[2];
      if (directory) {
        const fullPath = pathPrefix ? `${pathPrefix}/${directory}` : directory;
        directories.push(fullPath);
      }
    }
  }

  const matrix = { element: directories };

  core.setOutput('matrix', JSON.stringify(matrix));
  
  console.log('Matrix Output:', JSON.stringify(matrix)); // Debug statement

} catch (error) {
  core.setFailed(error.message);
}
