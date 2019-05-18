app.controller('ProductionLedgerCntlr', function ($scope, $firebaseArray) {
    $scope.title = "Production Ledger"
    var rmObjs = [$firebaseArray(getRef('paddyRaw'))];
    var fgObjs = [$firebaseArray(getRef('rice'))];
    var byObjs = [$firebaseArray(getRef('buyProducts'))];
    $scope.ledgerCreate = function (e) {
        let psNo = $js('psNo').value;
        let seqNo = $js('seqNo').value;
        if (psNo == '') {
            notify('PS No Empty!', 2);
            $js('psNo').focus();
            return;
        }
        else if (seqNo == '') {
            notify('PS No Empty!', 2);
            $js('seqNo').focus();
            return;
        }
        else {
            $scope.records = [];
            e.target.disabled = true;
            e.target.textContent = 'Loading';
            fsDb.collection("JournalForm").where('psNo', '==', parseInt(psNo)).where('seqNo', '==', parseInt(seqNo)).get()
                .then(function (snapshot) {
                    if (snapshot.size == 0) {
                        e.target.disabled = false;
                        e.target.textContent = 'Create';
                    }
                    else {
                        $scope.totalAmount = 0;
                        snapshot.docs.forEach(element => {
                            let obj = element.data();
                            obj.date = numToDateConv(obj.date);
                            var dlen = obj.ACCodes.length;
                            if (dlen > 2) {
                                var debCres = [];
                                var debCresCode = [];
                                var parsCode = [];
                                debCres = debCres.concat(obj.debitCredit);
                                debCresCode = debCresCode.concat(obj.ACCodes)
                                parsCode = parsCode.concat(obj.partyCodes)
                                obj.debitCredit = [];
                                obj.ACCodes = [];
                                obj.partyCodes = [];

                                for (i = 0; i < dlen; i++) {
                                    console.log(i);
                                    obj.debitCredit.push(debCres.shift());
                                    obj.debitCredit.push(debCres.shift());
                                    obj.ACCodes.push(debCresCode.shift());
                                    obj.ACCodes.push(debCresCode.shift());
                                    obj.partyCodes.push(parsCode.shift());
                                    obj.partyCodes.push(parsCode.shift());
                                    let newObj = Object.assign({}, obj);
                                    $scope.records.push(newObj);
                                    obj.debitCredit = [];
                                    obj.ACCodes = [];
                                    obj.partyCodes = [];
                                    i++;
                                }
                            }
                            else
                                $scope.records.push(obj);
                            $scope.$applyAsync();
                        });
                        e.target.disabled = false;
                        e.target.textContent = 'Create';
                        $js('excelBtn').style.display = 'block';
                        $js('pdfBtn').style.display = 'block';
                    }
                    $scope.records.sort(function (a, b) {
                        return a.entryNo - b.entryNo;
                    });
                    $print($scope.records);
                })
                .catch(function (err) {
                    $print(err);
                    e.target.disabled = false;
                    e.target.textContent = 'Create';
                });
            // Production Input Filter
            $scope.prdInput = function (arr) {
                let inputArr = arr.filter(function (x) {
                    return x.ACCodes[0] == 'WIP-9001';
                });
                return inputArr;
            }
            $scope.rmlist = function (arr) {
                let rm = rmObjs[0].map(function (x) {
                    return x.code;
                });
                let rmArr = arr.filter(function (x) {
                    return rm.indexOf(x.partyCodes[1]) >= 0;
                });
                return rmArr;
            }
            $scope.laborX = function (arr, f) {
                let fArr = arr.filter(function (x) {
                    if (f == 1) return x.ACCodes[1] >= 'EX-6700' && x.ACCodes[1] <= 'EX-6750-99';
                    else if (f == 2) return x.ACCodes[1] >= 'EX-6751' && x.ACCodes[1] <= 'EX-6799-99';
                    else if (f == 3) return x.ACCodes[1] >= 'EX-6801' && x.ACCodes[1] <= 'EX-6899-99';
                });
                return fArr;
            }
            function difference(setA, setB) {
                var _difference = new Set(setA);
                for (var elem of setB) {
                    _difference.delete(elem);
                }
                return _difference;
            }
            $scope.others = function (arr) {
                let rm = $scope.rmlist($scope.prdInput($scope.records));
                let lab1 = $scope.laborX($scope.prdInput($scope.records), 1);
                let lab2 = $scope.laborX($scope.prdInput($scope.records), 2);
                let lab3 = $scope.laborX($scope.prdInput($scope.records), 3);
                var gSet = new Set([...rm, ...lab1, ...lab2, ...lab3]);
                var allSet = new Set($scope.prdInput($scope.records));
                return Array.from(difference(allSet, gSet));
            }
            // Product Output
            $scope.prdOutput = function (arr) {
                let inputArr = arr.filter(function (x) {
                    return x.ACCodes[1] == 'WIP-9001';
                });
                return inputArr;
            }
            $scope.fglist = function (arr) {
                let fg = fgObjs[0].map(function (x) {
                    return x.code;
                });
                let fgArr = arr.filter(function (x) {
                    return fg.indexOf(x.partyCodes[0]) >= 0;
                });
                // $print(fgArr);

                return fgArr;
            }
            $scope.byList = function (arr) {
                let by = byObjs[0].map(function (x) {
                    return x.code;
                });
                let byArr = arr.filter(function (x) {
                    return by.indexOf(x.partyCodes[0]) >= 0;
                });
                return byArr;
            }
            // Else Conditon End by Next
            $scope.total = function(arr, t) {
                let total = 0;
                arr.forEach(function(x){
                    if(t == 0) total += x.debitCredit[0].totalPriceTK;
                    if(t == 1) total += x.debitCredit[1].totalPriceTK;
                });
                return total;
            }
        }
    }
})