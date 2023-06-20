const core = require('@actions/core');

function run() {
  try {
    const changedFilesString = core.getInput('all_changed_files');
    const changedFiles = changedFilesString.split(' ');
    console.log('Changed files:', changedFiles);

    const pathPrefix = core.getInput('path_prefix');
    const prefixParts = pathPrefix.split('/').filter(Boolean); // split the prefix and filter out empty strings
    const prefixLength = prefixParts.length;
    console.log('Prefix length:', prefixLength); // Debug log

    const directories = new Set();

    for (const file of changedFiles) {
      const parts = file.split('/');
      console.log('File parts:', parts);

      if (parts.length > prefixLength) {
        const directory = parts[prefixLength];
        if (directory) {
          directories.add(directory);
        }
      }
    }

    const sanitizedDirectories = Array.from(directories);
    console.log('Directories:', sanitizedDirectories);

    const matrix = { element: sanitizedDirectories };

    core.setOutput('matrix', JSON.stringify(matrix));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
