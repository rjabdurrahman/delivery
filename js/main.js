function $print(data) {
    console.log(data);
}

function $js(id) {
    return document.getElementById(id);
}

function $sn(name) {
    return document.getElementsByName(name);
}

function lsSet(vname, data) {
    localStorage.setItem(vname, data);
}

function lsSetJ(vname, data) {
    localStorage.setItem(vname, JSON.stringify(data));
}

function lsGet(vname) {
    return localStorage.getItem(vname);
}

function lsGetJ(vname) {
    return JSON.parse(localStorage.getItem(vname));
}

function lsExGJInit(vname, data) {
    return lsGet(vname) ? lsGetJ(vname) : data;
}

function createNum(data) {
    return data == "" ? 0 : parseFloat(data);
}

function $html(tag, atts, text) {
    var node = document.createElement(tag);
    if (text)
        node.textContent = text;
    for (att in atts) {
        node.setAttribute(att, atts[att]);
    }
    return node;
}

// Clearer
function exitModel() {
    document.getElementById('id01').style.display = 'none';
}

function clearer(...fields) {
    for (field in fields) {
        fields[field].value = "";
    }
}

// Date Expression
var dateEx = /^\d{1,2}-(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-\d{2}$/i;

function numValidate(event) {
    if (event.target.value.length > 0 && event.key == '-') event.preventDefault();
    var theEvent = event || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
    }
    var regex = /[0-9]|\./;
    if (!regex.test(String.fromCharCode(key)) && key != 8 && key != 37 && key != 39 && key != 45 && key != 173 && evt.key != '.') {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

//Company Accounts
var accounts = {
    CA: { name: 'Current Asset', min: 1001, max: 1999, flag: 1, type: 1, begBal: true },
    NCA: { name: 'Non-Current Asset', min: 2001, max: 2999, flag: 2, type: 1, begBal: true },
    CL: { name: 'Current Liability', min: 3001, max: 3999, flag: 3, type: 2, begBal: true },
    NCL: { name: 'Non-Current Liability', min: 4001, max: 4999, flag: 4, type: 2, begBal: true },
    EQTY: { name: 'Equity', min: 5001, max: 5999, flag: 5, type: 2, begBal: true },
    EX: { name: 'Expense', min: 6001, max: 6999, flag: 6, type: 1, begBal: false },
    REV: { name: 'Revenue', min: 7001, max: 7999, flag: 7, type: 2, begBal: false },
    COGS: { name: 'Cost of Goods Sold', min: 8001, max: 8499, flag: 10, type: 1, begBal: false },
    CN: { name: 'Contra', min: 8501, max: 8999, flag: 12, type: 2, begBal: true },
    WIP: { name: 'Production', min: 9001, max: 9199, flag: 11, type: 1, begBal: true },
    WD: { name: 'Withdrawal', min: 9201, max: 9399, flag: 8, type: 1, begBal: false },
    PD: { name: 'Contra Expense', min: 9401, max: 9599, flag: 13, type: 2, begBal: false },
    SD: { name: 'Contra Revenue', min: 9601, max: 9799, flag: 9, type: 1, begBal: false }
}

function accountFlag(nat) {
    for (ac in accounts) {
        if (accounts[ac].name == nat) return accounts[ac].flag;
    }
}

var wb = XLSX.utils.book_new();
wb.Props = {
    Title: "Company WordBook",
    Subject: "Test",
    Author: "Abdur Rahman",
    CreatedDate: new Date(2018, 09, 18)
};
// wb.SheetNames.push("Test Sheet");
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
// User Info
var userInfo = {};
if (lsGet('user')) {
    userInfo = lsGetJ('user');
}
//   // Initialize Firebase  Abdur Rahman
// var config = {
//     apiKey: "AIzaSyCcl2jCPFCebAgYpfygKlXraqy4N0lrN8o",
//     authDomain: "company-173ab.firebaseapp.com",
//     databaseURL: "https://company-173ab.firebaseio.com",
//     projectId: "company-173ab",
//     storageBucket: "",
//     messagingSenderId: "289097515037"
// };
// firebase.initializeApp(config);

// // Initialize Firebase New Testing  (new email newcompany1fortesting@gmail.com Only My testing)
// var config = {
//     apiKey: "AIzaSyDeYkyNagQebR0nnoJsDnjbeLogi9pEkeY",
//     authDomain: "company-559b6.firebaseapp.com",
//     databaseURL: "https://company-559b6.firebaseio.com",
//     projectId: "company-559b6",
//     storageBucket: "company-559b6.appspot.com",
//     messagingSenderId: "302908330708"
//   };
//   firebase.initializeApp(config);
// //End here


//Firebase for Both Afsana And Rahaman
// var config = {
//     apiKey: "AIzaSyAsnnJWZo7V4GB3PCOynsCOF-0b1miKbQA",
//     authDomain: "companytestingproject.firebaseapp.com",
//     databaseURL: "https://companytestingproject.firebaseio.com",
//     projectId: "companytestingproject",
//     storageBucket: "companytestingproject.appspot.com",
//     messagingSenderId: "654823352343"
//   };
//   firebase.initializeApp(config);

//Firebase for Company
var config = {
    apiKey: "AIzaSyDu8AG8ZoBeMToQSAbwxkIGMANP8t5RN4o",
    authDomain: "ishanagrolimited.firebaseapp.com",
    databaseURL: "https://ishanagrolimited.firebaseio.com",
    projectId: "ishanagrolimited",
    storageBucket: "ishanagrolimited.appspot.com",
    messagingSenderId: "12905357107"
};
firebase.initializeApp(config);



const auth = firebase.auth();
auth.onAuthStateChanged(function (fuser) {
    if (fuser) {
        // $print(fuser);
        var user = firebase.auth().currentUser;
        getRef('users/' + user.uid).once('value').then(function (snapshot) {
            let userIn = snapshot.val();
            if (!localStorage.user.uc) {
                Object.assign(userInfo, userIn);
                $print(userInfo);
                lsSetJ('user', userInfo);
            }
            var $body = angular.element(document.body);
            var $rootScope = $body.scope().$root;
            $rootScope.$apply(function () {
                $rootScope.userInfo = userInfo;
            });
        });
    } else {
        $print('You are not logged!');
        let locURL = window.location.href.substring(window.location.href.indexOf('#'), window.location.href.length);
        if (locURL != '#/') {
            window.location.href = '#/';
        }
    }
});

var db = firebase.database().ref();

function getRef(name) {
    return db.child(name);
}

// Initialize Cloud Firestore through Firebase
var fsDb = firebase.firestore();

// Disable deprecated features
fsDb.settings({
    timestampsInSnapshots: true
});

// Last Entry for For Form Entry
var lastEntryNo = null;
// Online Status
if (navigator.onLine) { $js('online').style.display = 'none'; };
if (!navigator.onLine) { $js('online').style.display = 'block'; };
window.addEventListener('offline', function (e) { $js('online').style.display = 'block'; });
window.addEventListener('online', function (e) { $js('online').style.display = 'none'; });
// Api Url and Socket
var apiUrl = 'http://localhost:3000/api/';
// var apiUrl = 'https://radiant-island-72424.herokuapp.com/api/';
var socket = io(apiUrl.replace('/api/', ''));

function formDataToFire(data, cleardata, name) {
    let url = apiUrl + 'form/' + name;
    axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function (res) {
            cleardata();
            notify('Added Sucessfully', 1);
        })
        .catch(function (error) {
            notify(error.message, 2);
        });
    // fsDb.collection(cname).doc(dname).set(data)
    //     .then(function () {
    //         db.child('lastFormEntry').set(++lastEntryNo.$value);
    //         $('#notification').html("<h6>Added Sucessfully</h6>").removeClass('w3-red').addClass('w3-green').fadeIn(200).delay(300).fadeOut(200);
    //         cleardata();
    //     })
    //     .catch(function (error) {
    //         $('#notification').html("<h6>Something Went Wrong in Database!</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(300).fadeOut(200);
    //     });
}

// Insert Chart
function insertChart(route, data, clearF) {
    axios.post(apiUrl + 'chart/' + route, data, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function (res) {
            if (res.data.err){
                notify(res.data.err, 2);
                return false;
            }
            else {
                notify("Added Successfully!", 1);
                clearF();
                location.reload();
            }
        })
        .catch(function (error) {
            notify(error.message, 2);
        });
}


// Update Chart
function updateChart(route, data, clearF){
    axios.post(apiUrl + 'chart/update/' + route, data, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function (res) {
            if (res.data.err){
                notify(res.data.err, 2);
                return false;
            }
            else {
                notify("Added Successfully!", 1);
                clearF();
                location.reload();
            }
        })
        .catch(function (error) {
            notify(error.message, 2);
        });
}

// Remove Chart 
function removeChart(route, code) {
    axios.post(apiUrl + 'chart/remove/' + route, { code }, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function (res) {
            if (res.data.err)
                notify(res.data.err, 2);
            else {
                notify("Removed Successfully!", 1);
                location.reload();
            }
        })
        .catch(function (error) {
            notify(error.message, 2);
        });
}

// Date to Number function
function dateToNum(dateStr) {
    let dateArr = dateStr.split('-');
    let mon = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let date = new Date(parseInt('20' + dateArr[2]), parseInt(mon.indexOf(dateArr[1].toLowerCase())), parseInt(dateArr[0]));
    return Date.parse(date);
}

var numToDateConv = function (num) {
    let mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(num);
    return date.getDate().toString() + '-' + mon[date.getMonth()] + '-' + date.getFullYear().toString().slice(-2);
}

// JSX Alernative
function jsx(html) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    return wrapper.firstElementChild;
}

// Notifer
function notify(msg, t) {
    if (t == 1) {
        $('#notification').html("<h6>" + msg + "</h6>").removeClass('w3-red').addClass('w3-green').fadeIn(200).delay(1000).fadeOut(200);
    }

    if (t == 2) {
        $('#notification').html("<h6>" + msg + "</h6>").removeClass('w3-green').addClass('w3-red').fadeIn(200).delay(1000).fadeOut(200);
    }
}

function getQueryVariable(variable) {
    var query = window.location.hash.substring(window.location.hash.indexOf('?') + 1, window.location.hash.length);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
};

// User Default Permissions
var dPermission = {
    c_1: false,
    c_1_e: false,
    c_1_d: false,
    c_2: false,
    c_2_e: false,
    c_2_d: false,
    c_3: false,
    c_3_e: false,
    c_3_d: false,
    c_4: false,
    c_4_e: false,
    c_4_d: false,
    c_5: false,
    c_5_e: false,
    c_5_d: false,
    c_6: false,
    c_6_e: false,
    c_6_d: false,
    c_7: false,
    c_7_e: false,
    c_7_d: false,
    c_8: false,
    c_8_e: false,
    c_8_d: false,
    c_9: false,
    c_9_e: false,
    c_9_d: false,
    c_10: false,
    c_10_e: false,
    c_10_d: false,
    c_11: false,
    c_11_e: false,
    c_11_d: false,
    c_12: false,
    c_12_e: false,
    c_12_d: false,
    fe_1: false,
    fe_2: false,
    fe_3: false,
    fe_4: false,
    fe_5: false,
    fe_6: false,
    fe_7: false,
    j_1: false,
    j_2: false,
    l_1: false,
    l_2: false,
    l_3: false,
    l_4: false,
    l_5: false,
    l_6: false,
    l_7: false,
    l_8: false,
    d_9: false,
    d_10: false,
    d_11: false,
    d_12: false,
    d_13: false,
    d_14: false,
    p_15: false,
    p_16: false,
    p_17: false,
    p_18: false,
    s_19: false,
    s_20: false,
    s_21: false,
    s_22: false,
    s_23: false,
    uc: false
}

var pId = null;

function removeNewlines(str) {
    //remove line breaks from str
    str = str.replace(/\s{2,}/g, ' ');
    str = str.replace(/\t/g, ' ');
    str = str.toString().trim().replace(/(\r\n|\n|\r)/g, "");
    return str;
}

function comNum(x) {
    if (!isNaN(Number(x))) {
        x = x.split('.');
        if (x.length == 2) {
            return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + x[1];
        }
        return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
}

function numToComma(x) {
    if (!isNaN(Number(x))) {
        x = x.toString().split('.');
        if (x.length == 2) {
            return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + x[1];
        }
        return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
}

// Commanum to Number
function commaToNum(x) {
    return Number(x.split(",").join(""));
}
// CommaNumMaker
function commaNumMaker(event) {
    // skip for arrow keys
    if ((event.which >= 37 && event.which <= 40) || event.which == 190) return;

    if (event.target.value.includes(".")) {
        let str = event.target.value.split('.');
        event.target.value = str[0].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + str[1].replace(/\D/g, "");
        return;
    }
    // format number
    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
}

// Comma with Minus Value
function commaNumMakerMinus(event) {
    // skip for arrow keys dot and minus
    if ((event.which >= 37 && event.which <= 40) || event.which == 190) return;
    if (event.which == 173 && !event.target.value.includes("-")) return;
    let min = false;
    if (event.target.value.includes("-")) {
        min = true;
    }
    if (event.target.value.includes(".")) {
        let str = event.target.value.split('.');
        if (min) {
            event.target.value = '-' + str[0].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + str[1].replace(/\D/g, "");
            return;
        } else {
            event.target.value = str[0].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + str[1].replace(/\D/g, "");
            return;
        }
    }
    // format number
    $(this).val(function (index, value) {
        if (min) {
            return "-" + value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    });
}