app.controller('ExLedgerCntlr', function ($scope, $firebaseArray) {

    $scope.title = "Expense Ledger";
    $scope.numToDate = numToDateConv;
    $scope.recShow = false;
    $scope.nodata = false;
    accArrayA = $firebaseArray(getRef('accounts'));
    let name = '';
    let code = '';
    let dateTo = '';
    let dateFrom = '';
    let coCen = '';
    $scope.reCalculate = function (e) {
        coCen = e.target.textContent;
        dropFunction();
        $scope.records = [];
        axios.post(apiUrl + 'ledger/expense', {operation: 2, costCenter: coCen, ACCode : code.value, dateFrom : dateToNum(dateFrom.value), dateTo : dateToNum(dateTo.value)})
            .then(function (res) {
                $scope.records.push(...res.data);
                $scope.nodata = false;
                $scope.$applyAsync();
            })
            .catch(function (err) {
                alert(err);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
    }

    $scope.debitTaker = function (e) {
        name = e.target.parentElement.previousElementSibling.lastElementChild;
        code = name.parentElement.previousElementSibling.lastElementChild.previousElementSibling;
        dateTo = code.parentElement.previousElementSibling.lastElementChild;
        dateFrom = dateTo.parentElement.previousElementSibling.lastElementChild;
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
        else if (dateTo.value == "") {
            $('#notification').html("<h6>Input Date To</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
            dateTo.focus();
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
        // $print(dateToNum(dateTo.value));
        // $print(dateToNum(dateFrom.value));
        $scope.records = [];
        $scope.costCenters = [];
        axios.post(apiUrl + 'ledger/expense', {operation: 1, ACCode : code.value, dateFrom : dateToNum(dateFrom.value), dateTo : dateToNum(dateTo.value)})
            .then(function (res) {
                $scope.records.push(...res.data);
                $scope.costCenters = [...new Set(res.data.map( x => x.costCenter))];
                $scope.nodata = false;
                $scope.$applyAsync();
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
                total += arr[i].drAmount;
            }
            if (arr[i].type == 'Cr' && (t == 0 || t == 2)) {
                total -= arr[i].crAmount;
            }
        }
        return total;
    }
});