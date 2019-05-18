app.controller('ReceivableCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Debtor";
    var ref = firebase.database().ref().child('receivables');
    dbReceivables = $scope.comReceivables = $firebaseArray(ref);
    $scope.comReceivables.$loaded().then(function () {
        $scope.load = true;
        if ($scope.comReceivables.length == 0) {
            $scope.nodata = true;
        }
    });
});