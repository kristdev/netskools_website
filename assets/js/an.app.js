(function () {
    'use strict';

    var MyApp = angular.module('MyApp', ['countrySelect']);
    //Directive menu principal de pages
    MyApp.directive('mainmenu', [function () {
        return {
            restrict: 'E',
            templateUrl: 'assets/ngapp/mainmenu.html'
        };
    }]);
    // Directive Template de téléchargement en banière
    MyApp.directive('maindownload', [function () {
        return {
            restrict: 'E',
            templateUrl: 'assets/ngapp/maindownload.html'
        };
    }]);
    // Directive Footer de pages
    MyApp.directive('thefooter', [function () {
        return {
            restrict: 'E',
            templateUrl: 'assets/ngapp/footer.html'
        };
    }]);
    // 
    MyApp.controller('homeController', ['$scope', function ($scope) {
        $scope.activepage = "home";
    }]);
    // 
    MyApp.controller('signupController', ['$scope', '$q', '$filter', function ($scope,$q,$filter) {
        $scope.activepage = "nous-contacter";
        $scope.state_activation = false;
        $scope.nom="";
        $scope.prenom="";
        $scope.email="";
        $scope.type_hote="";
        $scope.selectedCountry="";
        $scope.nom_hote="";
        $scope.etat_region="";
        $scope.ville="";
        $scope.adresse="";
        $scope.telephone="";
        $scope.info="";
        
        $filter('uppercase')($scope.nom);

        $scope.enable_submit = function () {
            if ($scope.subscription === true) {
                $scope.state_activation = true;
            } else {
                $scope.state_activation = false;
            }
            return $scope.state_activation;
        };

        //Initialisation de la base données
        var netskoolsSouscriptionsDB, ddoc;
        netskoolsSouscriptionsDB = new PouchDB('http://kristdev:Kokodi.1@https://kristdev.iriscouch.com/netskools_souscriptions');
        // ====================

        // create a design doc
        ddoc = {
            _id: '_design/indexCollection',
            views: {
                indexCollection: {
                    map: function mapFun(doc) {
                        if (doc.collection) {
                            emit(doc.collection);
                        }
                    }.toString()
                }
            }
        };
        // =======================


        // Save Design Doc
        netskoolsSouscriptionsDB
            .put(ddoc)
            .then(function (response) {
            // handle response
                console.log(JSON.stringify(response));
            })
            .catch(function (err) {
                console.log(err);
            });
        /*============================*/

        //Ajout des données du formulaire
        $scope.addData = function() {
            var deferred = $q.defer();
            var value_hote;
            switch (true){
                    case $scope.type_hote == 0: 
                        value_hote = 'Ecole primaire';
                        break;
                    case $scope.type_hote == 1:
                        value_hote = 'Ecole secondaire';
                        break;
                    case $scope.type_hote == 2:
                        value_hote = 'Ecole supérieure';
                        break;
                    case $scope.type_hote == 3:
                        value_hote = 'Ecole de formation';
                        break;
                    case $scope.type_hote == 4:
                        value_hote = 'Institut de recherche ou de statistique';
                        break;
                    case $scope.type_hote == 5:
                        value_hote = 'Organisme ou organe étatique';
                        break;
                    default: value_hote = 'Autre structure';
                    
            }
            
            var doc = {
                collection: 'demandeur',
                nom: $scope.nom,
                prenom: $scope.prenom,
                email: $scope.email,
                type_hote: value_hote,
                nom_hote: $scope.nom_hote,
                pays_residence: $scope.selectedCountry,
                etat_region: $scope.etat_region,
                ville: $scope.ville,
                adresse: $scope.adresse,
                telephone: $scope.telephone,
                info: $scope.info,
                activation: false,
                _id: new Date().toISOString()
            };    

            netskoolsSouscriptionsDB
                .put(doc)
                .then(function (response) {
                    
                    // handle response
                    console.log('Chaine Ecrite: ' + JSON.stringify(response));
                    $scope.nom = '';
                    $scope.prenom = '';
                    $scope.email = '';
                    $scope.type_hote = '';
                    $scope.nom_hote = '';
                    $scope.selectedCountry = '';
                    $scope.etat_region = '';
                    $scope.ville = '';
                    $scope.adresse = '';
                    $scope.telephone = '';
                    $scope.info = '';
                    ohSnap('Donnée enregistrée avec succès!', 'green');
                    deferred.resolve('Ecriture réussie');
                })
                .catch(function (err) {
                    console.log(err);
                    deferred.reject('Echec Ecriture');
                });
            return deferred.promise;
        };
        /*====================================*/
    }]);
})();