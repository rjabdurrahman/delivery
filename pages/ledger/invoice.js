app.controller('InvoiceCntlr', function ($scope) {
    $scope.totalAmount = 0;
    $scope.createInvoice = function (e) {
        let voucherNo = $js('voucherNo').value;
        $scope.records = [];
        if (voucherNo == '') {
            notify('Input Voucher No!', 2);
            return;
        }
        else {
            voucherNo = $scope.vn = parseInt(voucherNo);
            e.target.disabled = true;
            e.target.textContent = 'Loading';
            fsDb.collection("JournalForm").where('voucherNo', '==', voucherNo).get()
                .then(function (snapshot) {
                    if (snapshot.size == 0) {
                        e.target.disabled = false;
                        e.target.textContent = 'Create';
                    }
                    else {
                        let count = 0;
                        $scope.totalAmount = 0;
                        snapshot.docs.forEach(element => {
                            let obj = element.data();
                            obj.date = numToDateConv(obj.date);
                            if (count % 2 == 0) {
                                $scope.totalAmount += obj.debitCredit[1].totalPriceTK;
                            }
                            count++;
                            $scope.records.push(obj);
                            $print(obj);
                            $scope.$applyAsync();
                            $js('pdfBtn').style.display = 'block';
                        });
                        e.target.disabled = false;
                        e.target.textContent = 'Create';
                    }
                })
                .catch(function (err) {
                    $print(err);
                    e.target.disabled = false;
                    e.target.textContent = 'Create';
                });
        }
    }

    $scope.amountInWords = function (num) {
        if (num == 0) return;
        let a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'taka only ' : 'taka only';
        return str;
    };
})