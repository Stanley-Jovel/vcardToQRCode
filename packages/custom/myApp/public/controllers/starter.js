'use strict';
angular.module('mean.meanStarter').controller('StarterController', ['$scope', '$rootScope', '$translate', '$state','ContactService', 'MeanUser', 'SweetAlert','Global',
  function($scope, $rootScope, $translate, $state, ContactService, MeanUser, SweetAlert, Global) {
    //variables
    $scope.username = MeanUser.user.name;
    var vcard = 
      'BEGIN:VCARD\n'+
      'VERSION:3.0\n'+
      'N:{{NAME}};{{LAST_NAME}};;Mr.\n'+
      'FN:{{NAME}} {{LAST_NAME}}\n'+
      'ORG:{{ORG}}\n'+
      'TITLE:{{TITLE}}\n'+
      'TEL;TYPE=WORK,VOICE:{{TEL}}\n'+
      'ADR;TYPE=WORK:;;{{STREET}};{{CITY}};{{STATE}};{{ZIP}};{{COUNTRY}}\n'+
      'EMAIL;TYPE=PREF,INTERNET:{{EMAIL}}\n'+
      'URL;TYPE=WORK:{{URL}}\n'+
      'END:VCARD';
    $scope.QRApi = {};
    $scope.QRApi.config = {
      version: 'v1',
      width: 200,
      height: 200
    };
    $scope.QRApi.url = 'https://api.qrserver.com/'+
                $scope.QRApi.config.version+
                '/create-qr-code/?size='+
                $scope.QRApi.config.width+'x'+$scope.QRApi.config.height+'&data=';
    $scope.contact = {};
    $scope.contacts = {};
    $scope.contact.qrdata = 'Example';
    $scope.show_save_buttons = false;

    //globals
    if ($rootScope.contact !== ''){
      $scope.contact = $rootScope.contact;
      $rootScope.contact = '';
    }

    //css classes
    $scope.qrimg = 'qrimg';
    $scope.qrloading = true;
    $scope.qrloading_array = [];

    //functions
    function is_blank(val) {
      if (val)
        return val;
      else
        return '';
    }
    $scope.generateQR = function () {
      var vcard_aux = vcard
          .replace(new RegExp('\{\{NAME\}\}', 'g'), is_blank($scope.contact.name))
          .replace(new RegExp('\{\{LAST_NAME\}\}', 'g'), is_blank($scope.contact.lastname))
          .replace(new RegExp('\{\{ORG\}\}', 'g'), is_blank($scope.contact.org))
          .replace(new RegExp('\{\{TITLE\}\}', 'g'), is_blank($scope.contact.title))
          .replace(new RegExp('\{\{TEL\}\}', 'g'), is_blank($scope.contact.tel))
          .replace(new RegExp('\{\{STREET\}\}', 'g'),  is_blank($scope.contact.street))
          .replace(new RegExp('\{\{CITY\}\}', 'g'),  is_blank($scope.contact.city))
          .replace(new RegExp('\{\{STATE\}\}', 'g'),  is_blank($scope.contact.state))
          .replace(new RegExp('\{\{ZIP\}\}', 'g'),  is_blank($scope.contact.zip))
          .replace(new RegExp('\{\{COUNTRY\}\}', 'g'),  is_blank($scope.contact.country))
          .replace(new RegExp('\{\{EMAIL\}\}', 'g'),  is_blank($scope.contact.email))
          .replace(new RegExp('\{\{URL\}\}', 'g'),  is_blank($scope.contact.url));
      if ($scope.contact.qrdata !== escape(vcard_aux)) {
        $scope.qrloading = true;
        $scope.contact.qrdata = escape(vcard_aux);
      }
    };
    $scope.resetContact = function () {
      var qrdata_aux = $scope.contact.qrdata;
      $scope.contact = {};
      $scope.contact.qrdata = qrdata_aux;
    };
    //crud
    $scope.qrcode_save = function () {
      if (MeanUser.loggedin) {
        $scope.contact.user = MeanUser.user._id;
        ContactService.create($scope.contact)
          .then(function (response) {
            $scope.show_save_buttons = true;
            if (response.data.success) {
              $translate(['QR_CODE_SAVED_IN_DIRECTORY','GO_TO_DIRECTORY']).then(function (translations) {
                SweetAlert.swal({
                  title: '',
                  text: translations['QR_CODE_SAVED_IN_DIRECTORY'],
                  type: "success",
                  showCancelButton: true,
                  confirmButtonText: translations['GO_TO_DIRECTORY'],
                  cancelButtonText: "OK"
                },
                function (isConfirm) {
                  if (isConfirm) {
                      $state.go('directory');
                  }
                });
              });
            } else {
              $translate('ERROR_OCURRED').then(function (translation) {
                swal("Error", translation, "warning");
              });
            }
          });
      } else {
        $rootScope.contact = $scope.contact;
        $state.go('auth.login');
      }
    }
    $scope.qrcode_delete = function (index) {
      var contact = $scope.contacts[index];
      $translate(['DELETE_CONTACT_QUESTION','DELETE','CANCEL']).then(function (translations) {
        swal({
          title: translations['DELETE_CONTACT_QUESTION'],
          text: '',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: translations['DELETE'],
          cancelButtonText: translations['CANCEL']
        },
        function (isConfirm) {
          if (isConfirm) {
            ContactService.delete(contact._id).then(function (response) {
              console.log(response.data);
              if (response.data.success) {
                $scope.contacts.splice(index, 1);
              }
            });
          }
        });
      });
    }

    //get all qrcodes from logged user
    $scope.getDirectory = function () {
      ContactService.get(MeanUser.user._id).then(function (response) {
        $scope.contacts = response.data;
        $scope.qrloading_array = [];      
        $scope.contacts.forEach(function (item, index) {
          $scope.qrloading_array[index] = true;
        });
      });
    }

    //hide 'loading' gifs
    $scope.qrloading_hide = function () {
      $scope.qrloading = false;
      if ($scope.contact.qrdata !== "Example") {
        $scope.show_save_buttons = true;
      }
    }

    $scope.qrloading_hide_multiple = function (index) {
      $scope.qrloading_array[index] = false;
    }

    //watch for changes in contact variable
    $scope.$watchCollection('contact', function () {
      $scope.show_save_buttons = false;
    });
  }
]);
