app.controller('CreditorLedgerCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Creditor Ledger";
    $scope.qCode = getQueryVariable('code') ? getQueryVariable('code') : '';
    $scope.qName = getQueryVariable('name') ? decodeURI(getQueryVariable('name')) : '';
    $scope.qEmail = getQueryVariable('email') ? getQueryVariable('email') : '';
    $scope.numToDate = numToDateConv;
    $scope.recShow = false;
    $scope.nodata = false;
    $scope.begBal = 0;
    
    $scope.debitTaker = function (e) {
        let name = e.target.parentElement.previousElementSibling.lastElementChild;
        let code = name.parentElement.previousElementSibling.lastElementChild;
        let dateTo = code.parentElement.previousElementSibling.lastElementChild;
        let dateFrom = dateTo.parentElement.previousElementSibling.lastElementChild;
        $print(name);

        if (dateFrom.value == "") {
            $('#notification').html("<h6>Input Date From</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateFrom.focus();
            return;
        }
        else if (!(dateFrom.value).match(dateEx)) {
            $('#notification').html("<h6>Date From Format Invalid</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateFrom.focus();
            return;
        }
        else if (dateTo.value == "") {
            $('#notification').html("<h6>Input Date To</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateTo.focus();
            return;
        }
        else if (!(dateTo.value).match(dateEx)) {
            $('#notification').html("<h6>Date To Format Invalid</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateTo.focus();
            return;
        }
        else if (dateToNum(dateFrom.value) > dateToNum(dateTo.value)) {
            $('#notification').html("<h6>From Date is Greater than To Date</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
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

        document.getElementById("ctorPrint").disabled = false;

        e.target.disabled = true;
        e.target.textContent = 'Loading...';
        $scope.records = [];
        $scope.preRecords = [];
        
        // Begining Balance
        getPartyNameOrBal(
            code.value,
            'balance',
            function (res) {
                $scope.begBal = res.data[0].balance;
            },
            function (err) {
                $scope.begBal = 0;
            }
        );

        axios.post(apiUrl + 'ledger/debit', {type: 'debitor', partyCode : code.value, dateFrom : dateToNum(dateFrom.value), operation: 0})
            .then(function (res) {
                $scope.preRecords.push(...res.data);
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
        axios.post(apiUrl + 'ledger/debit', {type: 'debitor', partyCode : code.value, dateFrom : dateToNum(dateFrom.value), dateTo : dateToNum(dateTo.value), operation: 1})
            .then(function (res) {
                $scope.records.push(...res.data);
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
            if (arr[i].type == 'Dr' && (t == 0 || t == 1)) {
                total -= arr[i].drAmount;
            }
            if (arr[i].type == 'Cr' && (t == 0 || t == 2)) {
                total += arr[i].crAmount;
            }
        }
        return total;
    }
    creditorCodes = $firebaseArray(getRef('payables'));

    function generateMail() {
        let msg = `Your Ledger
        This is the transaction
        `;
        return encodeURIComponent(msg);
    }

    $scope.sendMail = function () {
        window.open('mailto:' + $scope.qEmail + '?subject=Your Ledger&body=' + generateMail());
    }
});