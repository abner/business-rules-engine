var PATH_TO_DGENI_PACKAGE = '../dgeni-templates/dgeni-package';
var Dgeni = require('dgeni');

var dgeni = new Dgeni([require(PATH_TO_DGENI_PACKAGE)]);
dgeni.generate(); // Outputs to static html /build
