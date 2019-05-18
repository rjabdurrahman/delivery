app.controller('DailyRevCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Daily Revenue";
    $scope.numToDate = numToDateConv;
    $scope.recShow = false;
    $scope.nodata = false;
    $scope.begBal = 0;
    accArrayA = $firebaseArray(getRef('accounts'));
    $scope.debitTaker = function (e) {
        let name = e.target.parentElement.previousElementSibling.lastElementChild;
        let code = name.parentElement.previousElementSibling.lastElementChild;
        let dateFrom = code.parentElement.previousElementSibling.lastElementChild;
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
        // $print(dateToNum(dateFrom.value));
        // Begining Balance
        let ref = firebase.database().ref("accounts");
        ref.orderByChild("accCode").equalTo(code.value).on("child_added", function (snapshot) {
            $scope.begBal = snapshot.val().balance;
        });
        $scope.records = [];
        $scope.preRecords = [];
        fsDb.collection("JournalForm").where("date", "<", dateToNum(dateFrom.value)).get()
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
                        obj.ACCodes = obj.ACCodes.map(function (x) {
                            return x.substr(0, 4);
                        });
                        if (obj.ACCodes.indexOf('REV-') >= 0) {
                            $scope.preRecords.push(obj);
                        }
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
        fsDb.collection("JournalForm").where("date", "==", dateToNum(dateFrom.value)).get()
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
                        obj.ACCodes = obj.ACCodes.map(function (x) {
                            return x.substr(0, 4);
                        });
                        if (obj.ACCodes.indexOf('REV-') >= 0) {
                            $scope.records.push(obj);
                        }
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
            if (arr[i].ACCodes[0].indexOf('REV-') >= 0 && (t == 0 || t == 1)) {
                total -= arr[i].debitCredit[0].drAmount;
            }
            if (arr[i].ACCodes[1].indexOf('REV-') >= 0 && (t == 0 || t == 2)) {
                total += arr[i].debitCredit[1].crAmount;
            }
        }
        return total;
    }
    $scope.codeMatch = function(code){
        return code.substr(0, 4) == 'REV-';
    }
});