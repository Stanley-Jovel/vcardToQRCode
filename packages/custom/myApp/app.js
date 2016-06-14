'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanStarter = new Module('meanStarter');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

MeanStarter.register(function(app, users, system) {

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');
  //dependencies
  //MeanStarter.aggregateAsset('js', 'script.js');

  MeanStarter.routes(app);
  MeanStarter.angularDependencies(['mean.system', 'mean.users', 'pascalprecht.translate', 'ngStorage',  
  								   'oitozero.ngSweetAlert', 'ct.ui.router.extras.sticky']);

  return MeanStarter;
});