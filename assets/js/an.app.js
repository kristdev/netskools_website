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
    MyApp.controller('signupController', ['$scope', '$q', '$http', '$templateCache', function ($scope,$q,$http,$templateCache) {
        $scope.activepage = "nous-contacter";
        $scope.state_activation = false;
        $scope.selectdefault = 0;
        $scope.type_hote=0;

        $scope.enable_submit = function () {
            if ($scope.subscription === true) {
                $scope.state_activation = true;
            } else {
                $scope.state_activation = false;
            }
            return $scope.state_activation;
        };

        //Initialisation de la base données
        var ddoc;

        $scope.findpath = function(){
            var deffered = $q.defer();
            $http
                .get('assets/js/an.app.php')
                .then(function(response){
                $scope.path = response.data;
                deffered.resolve($scope.path);
            }, function(response){
                deffered.reject('Erreur lecture');
            });
            return deffered.promise;
        };

        $scope.findpath().then(function(){
            $scope.dbpath = $scope.path;

            $scope.netskoolsSouscriptionsDB = new PouchDB($scope.dbpath);
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
            // ===================================

            // Save Design Doc
            $scope.netskoolsSouscriptionsDB
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
            if($scope.nom,$scope.prenom, $scope.prenom, $scope.type_hote, $scope.nom_hote, $scope.selectedCountry, $scope.etat_region, $scope.ville, $scope.adresse, $scope.telephone, $scope.info){
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
                    nom: angular.uppercase($scope.nom),
                    prenom: angular.uppercase($scope.prenom),
                    email: $scope.email,
                    type_hote: value_hote,
                    nom_hote: angular.uppercase($scope.nom_hote),
                    pays_residence: $scope.selectedCountry,
                    etat_region: angular.uppercase($scope.etat_region),
                    ville: angular.uppercase($scope.ville),
                    adresse: angular.uppercase($scope.adresse),
                    telephone: $scope.telephone,
                    info: $scope.info,
                    activation: false,
                    _id: new Date().toISOString()
                };    

                $scope.netskoolsSouscriptionsDB
                    .put(doc)
                    .then(function (response) {

                    // handle response
                    console.log('Chaine Ecrite: ' + JSON.stringify(response));
                    document.getElementById('nom').value='';
                    document.getElementById('prenom').value='';
                    document.getElementById('email').value='';
                    document.getElementById('prenom').value='';
                    document.getElementById('nom_hote').value='';
                    document.getElementById('etat_region').value='';
                    document.getElementById('ville').value='';
                    document.getElementById('adresse').value='';
                    document.getElementById('telephone').value='';
                    document.getElementById('info').value='';
                    swal('Demande enregistrée avec succès!', 'Un de nos télé-conseillers vous contactera dans les 48h ouvrables', 'success');
                    $scope.state_activation = false;
                    deferred.resolve('Ecriture réussie');
                })
                    .catch(function (err) {
                    console.log(err);
                    deferred.reject('Echec Ecriture');
                });
                return deferred.promise;
            }else{
                swal('Echec écriture', 'Remplissez les champs du formulaire', 'error');
            }
        };
        /*====================================*/
        });
    }]);
})();