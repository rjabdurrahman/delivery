app.controller('RawMaterialLedgerCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Raw Materials Ledger";
    $scope.qCode = getQueryVariable('code') ? getQueryVariable('code') : '';
    $scope.qName = getQueryVariable('name') ? decodeURI(getQueryVariable('name')) : '';
    $scope.qEmail = getQueryVariable('email') ? getQueryVariable('email') : '';
    $scope.numToDate = numToDateConv;
    $scope.recShow = false;
    $scope.nodata = false;
    $scope.beg = 0;
    if(location.hash == '#/rawmaterials'){
        debitorCodes = [$firebaseArray(getRef('paddyRaw'))];
    }
    if(location.hash == '#/finishedandby'){
        debitorCodes = [$firebaseArray(getRef('buyProducts'))];
        debitorCodes.push($firebaseArray(getRef('rice')))
    }
    console.log(location.hash);
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
        // $print(dateToNum(dateTo.value));
        // $print(dateToNum(dateFrom.value));
        $scope.records = [];
        $scope.preRecords = [];
        // Begining Balance
        for (i in debitorCodes) {
            let data = debitorCodes[i].find(function (el) {
                return el.code == code.value;
            });
            // $print(data);
            if (data) {
                $scope.beg = data;
                break;
            }
            else $scope.beg = 0;
        }
        fsDb.collection("JournalForm").where('partyCodes', 'array-contains', code.value).where("date", "<", dateToNum(dateFrom.value)).get()
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
                        var dlen = obj.partyCodes.length;
                        if (dlen > 2) {
                            var debCres = [];
                            var debCresCode = [];
                            debCres = debCres.concat(obj.debitCredit);
                            debCresCode = debCresCode.concat(obj.partyCodes)
                            obj.debitCredit = [];
                            obj.partyCodes = [];

                            for (i = 0; i < dlen; i++) {
                                console.log(i);
                                obj.debitCredit.push(debCres.shift());
                                obj.debitCredit.push(debCres.shift());
                                obj.partyCodes.push(debCresCode.shift());
                                obj.partyCodes.push(debCresCode.shift());
                                let newObj = Object.assign({}, obj);
                                if (newObj.partyCodes.indexOf(newObj.sCode) >= 0)
                                    $scope.preRecords.push(newObj);
                                obj.debitCredit = [];
                                obj.partyCodes = [];
                                i++;
                            }
                        }
                        else
                            $scope.preRecords.push(obj);
                        $scope.nodata = false;
                        $scope.$applyAsync();
                        // $print($scope.preRecords);
                        // e.target.disabled = false;
                        // e.target.textContent = 'Calculate';
                    });
                }
            })
            .catch(function (err) {
                notify('Something went wrong in Database', 2);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
        fsDb.collection("JournalForm").where('partyCodes', 'array-contains', code.value).where("date", ">=", dateToNum(dateFrom.value)).where("date", "<=", dateToNum(dateTo.value)).get()
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
                        var dlen = obj.partyCodes.length;
                        if (dlen > 2) {
                            var debCres = [];
                            var debCresCode = [];
                            debCres = debCres.concat(obj.debitCredit);
                            debCresCode = debCresCode.concat(obj.partyCodes)
                            obj.debitCredit = [];
                            obj.partyCodes = [];

                            for (i = 0; i < dlen; i++) {
                                console.log(i);
                                obj.debitCredit.push(debCres.shift());
                                obj.debitCredit.push(debCres.shift());
                                obj.partyCodes.push(debCresCode.shift());
                                obj.partyCodes.push(debCresCode.shift());
                                let newObj = Object.assign({}, obj);
                                if (newObj.partyCodes.indexOf(newObj.sCode) >= 0)
                                    $scope.records.push(newObj);
                                obj.debitCredit = [];
                                obj.partyCodes = [];
                                i++;
                            }
                        }
                        else
                            $scope.records.push(obj);
                        $scope.nodata = false;
                        $scope.$applyAsync();
                        // $print($scope.records);
                        e.target.disabled = false;
                        e.target.textContent = 'Calculate';
                    });
                }
            })
            .catch(function (err) {
                notify('Something went wrong in Database', 2);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
    }

    $scope.arrTotal = function (arr, index, t) {
        if (index == -1) return 0;
        let total = 0;
        for (i = 0; i <= index; i++) {
            if (arr[i].sCode == arr[i].partyCodes[0] && (t == 0 || t == 1)) {
                total += arr[i].debitCredit[0].drAmount;
            }
            if (arr[i].sCode == arr[i].partyCodes[1] && (t == 0 || t == 2)) {
                total -= arr[i].debitCredit[1].crAmount;
            }
        }
        return total;
    }
    $scope.zeroDiv = function (n){
        if(n == 0) return 1;
        else return n;
    }
    $scope.dataTotal = function (arr, index, t) {
        if (index == -1 && (t == 7 || t == 8)) return '';
        else if (index == -1) return 0;
        let total = 0;
        for (i = 0; i <= index; i++) {
            if (arr[i].sCode == arr[i].partyCodes[0]) {
                if (t == 1 && !isNaN(arr[i].debitCredit[0].primaryQuantity)) {
                    total += arr[i].debitCredit[0].primaryQuantity;
                }
                if (t == 5 && !isNaN(arr[i].debitCredit[0].totalQuantity)) {
                    total += arr[i].debitCredit[0].totalQuantity;
                }
                if (t == 7 && arr[i].debitCredit[0].primaryUnit != '') {
                    return arr[i].debitCredit[0].primaryUnit;
                }
                if (t == 8 && arr[i].debitCredit[1].stdUnit != '') {
                    return arr[i].debitCredit[1].stdUnit;
                }
            }
            if (arr[i].sCode == arr[i].partyCodes[1]) {
                if (t == 1 && !isNaN(arr[i].debitCredit[1].primaryQuantity)) {
                    total -= arr[i].debitCredit[1].primaryQuantity;
                }
                if (t == 5 && !isNaN(arr[i].debitCredit[1].totalQuantity)) {
                    total -= arr[i].debitCredit[1].totalQuantity;
                }
                if (t == 7 && arr[i].debitCredit[1].primaryUnit != '') {
                    return arr[i].debitCredit[1].primaryUnit;
                }
                if (t == 8 && arr[i].debitCredit[1].stdUnit != '') {
                    return arr[i].debitCredit[1].stdUnit;
                }
            }
        }
        return total;
    }

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