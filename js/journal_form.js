function findTotal(e) {
    e.target.value = comNum(e.target.value.replace(',',''));
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
function ACNameComplete(event) {
    event.target.value = $.trim(event.target.value);
    let data = accArray.find(function (el) {
        return el.accCode == event.target.value;
    });
    // $print(data);
    if (data) {
        event.target.parentElement.nextElementSibling.firstElementChild.value = data.accText;
    }
    else event.target.parentElement.nextElementSibling.firstElementChild.value = '';

    //$print(data.nature); 
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




var partyArray = null;
function partyNameComplete(event) {
    event.target.value = $.trim(event.target.value);
    $print(event.target.value);
    $print(partyArray.length);
    for (i = 0; i < partyArray.length; i++) {
        for (j = 0; j < partyArray[i].length; j++) {
            // $print(partyArray[i][j].code);
            // $print(event.target.value);

            if (partyArray[i][j].code == event.target.value) {
                event.target.parentElement.nextElementSibling.firstElementChild.value = partyArray[i][j].name;
                return;
            }
        }
    }
    event.target.parentElement.nextElementSibling.firstElementChild.value = '';
}


