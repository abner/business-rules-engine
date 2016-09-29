var path = require('canonical-path');
var Package = require('dgeni').Package;

/**
 * To build docs, we need a repo situated at the root of this repo to generate documentation.
 * This will be on a project to project basis.
 */
var NAME_OF_REPO = 'dist2/**/*.js'; // TODO: Name the repo that the docs are going to be generated from.
var PATH_TO_FILES_WITH_DOCS = './' + NAME_OF_REPO;
var PATH_TO_EXCLUDED_FILES = '';
var PATH_TO_BASE = '';
var PATH_TO_OUTPUT = 'build';

module.exports = new Package('dgeni-package', [
  require('dgeni-packages/jsdoc'),
  require('dgeni-packages/nunjucks')
])
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {

  log.level = 'debug';

  // Specify the base path used when resolving relative paths to source and output files
  readFilesProcessor.basePath = path.resolve(__dirname, '..');

  // Specify collections of source files that should contain the documentation to extract
  readFilesProcessor.sourceFiles = [
    {
      include: PATH_TO_FILES_WITH_DOCS,
      exclude: PATH_TO_EXCLUDED_FILES,
      basePath: PATH_TO_BASE
    }
  ];

  // Template folder
  templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

  // Template name
  templateFinder.templatePatterns.unshift('common.template.html');

  // Output folder
  writeFilesProcessor.outputFolder  = PATH_TO_OUTPUT;
});
