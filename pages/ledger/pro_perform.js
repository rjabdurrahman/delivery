app.controller('ProPerLedgerCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Product Performance Report"
    var fgObjs = [$firebaseArray(getRef('rice'))];
    var byObjs = [$firebaseArray(getRef('buyProducts'))];
    $scope.numToDate = numToDateConv;
    $scope.nodata = false;
    $scope.product = '';
    $scope.pName = function(e){
        for(x of fgObjs[0]){
            if(x.code == e.target.value){
                $scope.product = x.name;
                return;
            }
            else $scope.product = '';
        }
        for(x of byObjs[0]){
            if(x.code == e.target.value){
                $scope.product = x.name;
                return;
            }
            else $scope.product = '';
        }
    }
    $scope.createProPerLed = function (e) {
        let pCode = $js('ACCodeS').value;
        let fDate = $js('ctorDataForm').value;
        let tDate = $js('dateto').value;
        if (pCode == '') {
            notify('Product Code  Empty!', 2);
            $js('ACCodeS').focus();
            return;
        }
        else if (fDate == '') {
            notify('Date From Empty!', 2);
            $js('ctorDataForm').focus();
            return;
        }
        else if (tDate == '') {
            notify('Date To Empty!', 2);
            $js('dateto').focus();
            return;
        }
        else if (!(fDate).match(dateEx)) {
            notify('Date From Format Incorrect!', 2);
            $js('ctorDataForm').focus();
            return;
        }
        else if (!(tDate).match(dateEx)) {
            notify('Date To Format Incorrect!', 2);
            $js('dateto').focus();
            return;
        }
        else if (dateToNum(fDate) > dateToNum(tDate)) {
            notify('Date From is Greater Than Date To!', 2);
            $js('ctorDataForm').focus();
            return;
        }
        else {
            $scope.records = [];
            // e.target.disabled = true;
            // e.target.textContent = 'Loading';
            function codeCheck(code) {
                let fg = fgObjs[0].map(function (x) {
                    return x.code;
                });
                let by = byObjs[0].map(function (x) {
                    return x.code;
                });
                if (fg.indexOf(code) >= 0) return 1;
                else if (by.indexOf(code) >= 0) return 2;
                else return 0;
            }
            if (codeCheck(pCode) == 0) {
                notify('Code Not Exist!', 2);
                $js('ACCodeS').focus();
                return;
            }
            // AC Code Maker
            let acCode = '';
            if (codeCheck(pCode) == 1) {
                if (parseInt(pCode.substr(-3)) < 10) acCode = 'REV-700' + parseInt(pCode.substr(-3));
                else if (parseInt(pCode.substr(-3)) < 100) acCode = 'REV-70' + parseInt(pCode.substr(-3));
                else if (parseInt(pCode.substr(-3)) > 100) acCode = 'REV-7' + parseInt(pCode.substr(-3));
                console.log(acCode);
            }
            else if (codeCheck(pCode) == 2) {
                if (parseInt(pCode.substr(-3)) < 10) acCode = 'REV-770' + parseInt(pCode.substr(-3));
                else if (parseInt(pCode.substr(-3)) < 100) acCode = 'REV-77' + parseInt(pCode.substr(-3));
                else if (parseInt(pCode.substr(-3)) > 100) acCode = 'REV-7' + (parseInt(pCode.substr(-3)) + 700);
                console.log(acCode);
            }
            e.target.disabled = true;
            e.target.textContent = 'Loading...';
            fsDb.collection("JournalForm").where("formName", "==", "Sales (Sales)").where('ACCodes', 'array-contains', acCode).where("date", ">=", dateToNum(fDate)).where("date", "<=", dateToNum(tDate)).get()
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
                        obj.sCode = acCode;
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
                                if (newObj.ACCodes[1] == newObj.sCode)
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
                        $js('pdfBtn').style.display = 'block';
                        $js('excelBtn').style.display = 'block';
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                notify('Something went wrong in Database', 2);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
            // COGS RECORDS
            $scope.cRecords = [];
            fsDb.collection("JournalForm").where("formName", "==", "Sales (Cost of Good Sold)").where('partyCodes', 'array-contains', pCode).where("date", ">=", dateToNum(fDate)).where("date", "<=", dateToNum(tDate)).get()
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
                        obj.sCode = pCode;
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
                                if (newObj.partyCodes[1] == newObj.sCode)
                                    $scope.cRecords.push(newObj);
                                obj.debitCredit = [];
                                obj.partyCodes = [];
                                i++;
                            }
                        }
                        else
                            $scope.cRecords.push(obj);
                        $scope.nodata = false;
                        $scope.$applyAsync();
                        $print($scope.cRecords);
                        // e.target.disabled = false;
                        // e.target.textContent = 'Calculate';
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                notify('Something went wrong in Database', 2);
                e.target.disabled = false;
                e.target.textContent = 'Calculate';
            });
        }
        // Else Condition End
        $scope.totalCal = function(arr){
            let total = 0;
            arr.forEach(function(x){
                total += x.debitCredit[1].totalPriceTK;
            });
            return total;
        }
        $scope.cogsFind = function(enNo){
            let data = null;
            data = $scope.cRecords.find(function(x){
                return x.entryNo == enNo + 1;
            });
            return data;
        }
    }
})