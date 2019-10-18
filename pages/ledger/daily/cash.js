app.controller('CashCntlr', function ($scope, $firebaseArray) {

    $scope.title = "Daily Cash";
    $scope.numToDate = numToDateConv;
    $scope.recShow = false;
    $scope.nodata = false;
    $scope.begBal = 0;
    $scope.debitTaker = function (e) {
        let name = e.target.parentElement.previousElementSibling.lastElementChild;
        let code = name.parentElement.previousElementSibling.lastElementChild;
        let dateFrom = code.parentElement.previousElementSibling.lastElementChild;
        let isPurchase = e.target.previousElementSibling.textContent == 'PurPage';

        if (dateFrom.value == "") {
            $('#notification').html("<h6>Input Date</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateFrom.focus();
            return;
        }
        else if (!(dateFrom.value).match(dateEx)) {
            $('#notification').html("<h6>Date Format Invalid</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateFrom.focus();
            return;
        }
        else if (code.value == "") {
            $('#notification').html("<h6>Input Account Code</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            code.focus();
            return;
        }
        else if (name.value == "") {
            $('#notification').html("<h6>Account Code Invalid</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            code.focus();
            return;
        }
        document.getElementById("debCal").disabled = false;

        e.target.disabled = true;
        e.target.textContent = 'Loading...';
        let ref = firebase.database().ref("accounts");
        getAcNameOrBal(
            code.value,
            'balance',
            function (res) {
                $scope.begBal = res.data[0].balance;
            },
            function (err) {
                $scope.begBal = 0;
            }
        );
        $scope.records = [];
        $scope.preRecords = [];
        axios.post(apiUrl + 'ledger/daily', { type: 'debit', ACCode: code.value, dateFrom: dateToNum(dateFrom.value), operation: 0 })
            .then(function (res) {
                if (isPurchase) {
                    $scope.preRecords = req.data[0].map(x => !x.psNo && !x.seqNo);
                }
                else {
                    $scope.preRecords.push(...res.data);
                }

                $scope.nodata = false;
                $scope.$applyAsync();
                $print('Pre Records');
                $print($scope.preRecords);
            })
            .catch(function (err) {
                $print(err);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
        axios.post(apiUrl + 'ledger/daily', { type: 'debit', ACCode: code.value, dateFrom: dateToNum(dateFrom.value), operation: 1 })
            .then(function (res) {
                if (isPurchase) {
                    $scope.records = res.data[0].map(x => !x.psNo && !x.seqNo);
                }
                else {
                    $scope.records.push(...res.data);
                }

                $scope.nodata = false;
                $scope.$applyAsync();
                $print($scope.records);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            })
            .catch(function (err) {
                $print(err);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
    }

    $scope.arrTotal = function (arr, index, t) {
        if (index == -1) return 0;
        let total = 0;
        for (i = 0; i <= index; i++) {
            if (arr[i].sCode == arr[i].ACCodes[0] && (t == 0 || t == 1)) {
                total += arr[i].debitCredit[0].drAmount;
            }
            if (arr[i].sCode == arr[i].ACCodes[1] && (t == 0 || t == 2)) {
                total -= arr[i].debitCredit[1].crAmount;
            }
        }
        return total;
    }
});