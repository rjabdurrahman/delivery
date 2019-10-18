function findTotal(e) {
    e.target.value = comNum(e.target.value.replace(',', ''));
    let amountsEl = document.getElementsByName(e.target.name);
    let total = 0;
    for (var amountEl in amountsEl) {
        if (amountsEl[amountEl].value) {
            $print(Number(amountsEl[amountEl].value.split(',').join('')));
            total += Number(amountsEl[amountEl].value.split(',').join(''));
        }
    }
    if (e.target.name == "debitAmount") {
        $js('totalDebit').textContent = comNum(parseFloat(total.toFixed(2)).toString());
    }
    else if (e.target.name == "creditAmount") {
        $js('totalCredit').textContent = comNum(parseFloat(total.toFixed(2)).toString());
    }
    submitValid();
}


var accArray = null;
// Depricated

function ACNameComplete(event) {
    event.target.value = $.trim(event.target.value);
    getAcNameOrBal(
        event.target.value, 
        'ACName',
        function (res) {
            event.target.parentElement.nextElementSibling.firstElementChild.value = res.data[0].ACName;
        },
        function (err) {
            event.target.parentElement.nextElementSibling.firstElementChild.value = "";
        }
    );
}

function costcenterDisableforEx(event) {
    event.target.value = $.trim(event.target.value);
    let data = accArray.filter(function (el) {
        return el.flag == 6;
    });
    
    let fdata = data.find(function (el) {
        return el.accCode == event.target.value;
    });

    if (fdata) {
        document.getElementById("costCenter").disabled = false;
    }
    // else
    // document.getElementById("costCenter").disabled = true; 

}
function costcenterDisable(event) {
    event.target.value = $.trim(event.target.value);
    let data = rawMaterial.find(function (el) {
        return el.code == event.target.value;
    });
    $print(event.target.value);
    if (data.code == event.target.value) {
        document.getElementById("primaryUnit").disabled = false;
        document.getElementById("primaryUnitQuantity").disabled = false;
        document.getElementById("primaryUnitPrice").disabled = false;
        document.getElementById("stdUnit").disabled = false;
        document.getElementById("stdUnitQuantity").disabled = false;
        document.getElementById("stdUnitPrice").disabled = false;
    }
}

function inputfiledStdPrimayInactive(event) {
    event.target.value = $.trim(event.target.value);
}

function partyNameComplete(event) {
    event.target.value = $.trim(event.target.value);
    getPartyNameOrBal(
        event.target.value, 
        'name',
        function (res) {
            event.target.parentElement.nextElementSibling.firstElementChild.value = res.data[0].name;
        },
        function (err) {
            event.target.parentElement.nextElementSibling.firstElementChild.value = "";
        }
    )
}


