app.controller('AccountCntlr', function ($scope, $firebaseArray) {
    var ref = getRef('accounts');
    $scope.title = "Account";
    $scope.accounts = accounts;
    $scope.load = false;
    $scope.nodata = false;
    axios.get(apiUrl + 'chart/accounts')
        .then(function (res) {
            dbAccounts = $scope.comAccounts = res.data;
            $scope.$applyAsync();
            $scope.load = true;
            if ($scope.comAccounts.length == 0) {
                $scope.nodata = true;
            }
        })
        .catch(function (error) {
            notify(error.message, 2);
        });
    $scope.getAccArr = function(fl){
        return $scope.comAccounts.filter(function(el){
            return el.flag == fl;
        });
    }
    // var accs = lsExGJInit('comAccounts', []);
    // var accLength = lsExGJInit('comAccounts', []).length;
    // for (acc in $scope.accounts) {
    //     for (i = 0; i < accLength; i++) {
    //         if (accs[i].nature == $scope.accounts[acc].name) {
    //             $scope.comAccounts.push(accs[i]);
    //         };
    //     }
    // }
});