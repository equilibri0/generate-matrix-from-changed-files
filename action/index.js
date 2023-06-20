const core = require('@actions/core');

try {
  const changedFilesString = core.getInput('all_changed_files');
  const pathPrefix = core.getInput('path_prefix');
  const directories = [];

  if (changedFilesString) {
    const changedFiles = changedFilesString.split(' ');

    for (const file of changedFiles) {
      const parts = file.split('/');
      if (parts.length > 3) {
        const directory = parts[3];
        if (directory) {
          const fullPath = pathPrefix ? `${pathPrefix}/${directory}` : directory;
          if (!directories.includes(fullPath)) {
            directories.push(fullPath);
          }
        }
      }
    }
  }

  const matrix = { element: directories };

  core.setOutput('matrix', JSON.stringify(matrix));
} catch (error) {
  core.setFailed(error.message);
}