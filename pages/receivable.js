app.controller('ReceivableCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Debtor";
    axios.get(apiUrl + 'chart/debtors')
        .then(function (res) {
            dbReceivables = $scope.comReceivables = res.data;
            $scope.$applyAsync();
            $scope.load = true;
            if ($scope.comReceivables.length == 0) {
                $scope.nodata = true;
            }
        })
        .catch(function (error) {
            notify(error.message, 2);
        });
});