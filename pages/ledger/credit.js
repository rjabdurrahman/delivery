app.controller('CreditLedgerCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Credit Ledger";
    $scope.numToDate = numToDateConv;
    $scope.recShow = false;
    $scope.nodata = false;
    $scope.begBal = 0;
    accArrayA = $firebaseArray(getRef('accounts'));
    $scope.debitTaker = function (e) {
        let name = e.target.parentElement.previousElementSibling.lastElementChild;
        let code = name.parentElement.previousElementSibling.lastElementChild;
        let dateTo = code.parentElement.previousElementSibling.lastElementChild;
        let dateFrom = dateTo.parentElement.previousElementSibling.lastElementChild;
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
        // Begining Balance
        let ref = firebase.database().ref("accounts");
        ref.orderByChild("accCode").equalTo(code.value).on("child_added", function (snapshot) {
            $scope.begBal = snapshot.val().balance;
        });
        $scope.records = [];
        $scope.preRecords = [];
        fsDb.collection("JournalForm").where('ACCodes', 'array-contains', code.value).where("date", "<", dateToNum(dateFrom.value)).get()
            .then(function (snapshot) {
                $scope.recShow = true;
                if (snapshot.size == 0) {
                    // e.target.disabled = false;
                    // e.target.textContent = 'Calculate';
                    // $scope.nodata = true;
                    // $scope.$applyAsync();
                }
                else {
                    snapshot.docs.forEach(element => {
                        let obj = element.data();
                        obj.sCode = code.value;
                        var dlen = obj.ACCodes.length;
                        if (dlen > 2) {
                            var debCres = [];
                            var debCresCode = [];
                            debCres = debCres.concat(obj.debitCredit);
                            debCresCode = debCresCode.concat(obj.ACCodes)
                            obj.debitCredit = [];
                            obj.ACCodes = [];

                            for (i = 0; i < dlen; i++) {
                                console.log(i);
                                obj.debitCredit.push(debCres.shift());
                                obj.debitCredit.push(debCres.shift());
                                obj.ACCodes.push(debCresCode.shift());
                                obj.ACCodes.push(debCresCode.shift());
                                let newObj = Object.assign({}, obj);
                                if (newObj.ACCodes.indexOf(newObj.sCode) >= 0)
                                    $scope.preRecords.push(newObj);
                                obj.debitCredit = [];
                                obj.ACCodes = [];
                                i++;
                            }
                        }
                        else
                            $scope.preRecords.push(obj);
                        $scope.nodata = false;
                        $scope.$applyAsync();
                        $print('Pre Records');
                        $print($scope.preRecords);
                        // e.target.disabled = false;
                        // e.target.textContent = 'Calculate';
                    });
                }
            })
            .catch(function (err) {
                $print(err);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
        fsDb.collection("JournalForm").where('ACCodes', 'array-contains', code.value).where("date", ">=", dateToNum(dateFrom.value)).where("date", "<=", dateToNum(dateTo.value)).get()
            .then(function (snapshot) {
                $scope.recShow = true;
                if (snapshot.size == 0) {
                    e.target.disabled = false;
                    e.target.textContent = 'Calculate';
                    $scope.nodata = true;
                    $scope.$applyAsync();
                }
                else {
                    snapshot.docs.forEach(element => {
                        let obj = element.data();
                        obj.sCode = code.value;
                        var dlen = obj.ACCodes.length;
                        if (dlen > 2) {
                            var debCres = [];
                            var debCresCode = [];
                            debCres = debCres.concat(obj.debitCredit);
                            debCresCode = debCresCode.concat(obj.ACCodes)
                            obj.debitCredit = [];
                            obj.ACCodes = [];

                            for (i = 0; i < dlen; i++) {
                                console.log(i);
                                obj.debitCredit.push(debCres.shift());
                                obj.debitCredit.push(debCres.shift());
                                obj.ACCodes.push(debCresCode.shift());
                                obj.ACCodes.push(debCresCode.shift());
                                let newObj = Object.assign({}, obj);
                                if (newObj.ACCodes.indexOf(newObj.sCode) >= 0)
                                    $scope.records.push(newObj);
                                obj.debitCredit = [];
                                obj.ACCodes = [];
                                i++;
                            }
                        }
                        else
                            $scope.records.push(obj);
                        $scope.nodata = false;
                        $scope.$applyAsync();
                        $print($scope.records);
                        e.target.disabled = false;
                        e.target.textContent = 'Calculate';
                    });
                }
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
                total -= arr[i].debitCredit[0].drAmount;
            }
            if (arr[i].sCode == arr[i].ACCodes[1] && (t == 0 || t == 2)) {
                total += arr[i].debitCredit[1].crAmount;
            }
        }
        return total;
    }
});