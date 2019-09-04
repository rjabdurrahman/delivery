var app = angular.module('myApp', ['firebase', 'ngRoute', 'angular.filter']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/login.html',
      controller: 'LoginCntlr',
      activetab: 'home'
    })
    .when('/account', {
      templateUrl: 'pages/account.html',
      controller: 'AccountCntlr',
      activetab: 'chart'
    })
    .when('/receivable', {
      templateUrl: 'pages/receivable.html',
      controller: 'ReceivableCntlr',
      activetab: 'chart'
    })
    .when('/payable', {
      templateUrl: 'pages/payable.html',
      controller: 'PayableCntlr',
      activetab: 'chart'
    })
    .when('/companyheads', {
      templateUrl: 'pages/company_heads.html',
      controller: 'CompanyHeadsCntlr',
      activetab: 'chart'
    })
    .when('/costcenter', {
      templateUrl: 'pages/cost_center.html',
      controller: 'CostCenterCntlr',
      activetab: 'centers'
    })
    .when('/trucktractor', {
      templateUrl: 'pages/truck_tractor.html',
      controller: 'TruckTractorCntlr',
      activetab: 'chart'
    })
    .when('/employees', {
      templateUrl: 'pages/employees.html',
      controller: 'EmployeesCntlr',
      activetab: 'chart'
    })
    .when('/bank', {
      templateUrl: 'pages/bank.html',
      controller: 'BankCntlr',
      activetab: 'chart'
    })
    .when('/contractors', {
      templateUrl: 'pages/contractors.html',
      controller: 'ContractorsCntlr',
      activetab: 'chart'
    })
    .when('/paddyraw', {
      templateUrl: 'pages/paddy_raw.html',
      controller: 'PaddyRawCntlr',
      activetab: 'chart'
    })
    .when('/paddydry', {
      templateUrl: 'pages/paddy_dry.html',
      controller: 'PaddyDryCntlr',
      activetab: 'chart'
    })
    .when('/rice', {
      templateUrl: 'pages/rice.html',
      controller: 'RiceCntlr',
      activetab: 'chart'
    })
    .when('/buyproducts', {
      templateUrl: 'pages/by_products.html',
      controller: 'ByProductsCntlr',
      activetab: 'chart'
    })
    .when('/byprod', {
      templateUrl: 'pages/forms/by_productlist.html',
      controller: 'ByProdCntlr',
      activetab: 'formentry'
    })
    .when('/journalform', {
      templateUrl: 'pages/forms/journal_form.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/purchase', {
      templateUrl: 'pages/forms/purchase.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/purchasereturn', {
      templateUrl: 'pages/forms/purchase_return.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/sales', {
      templateUrl: 'pages/forms/sales.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/salesreturn', {
      templateUrl: 'pages/forms/sales_return.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/prdoutput', {
      templateUrl: 'pages/forms/prd_output.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/prdoutput2', {
      templateUrl: 'pages/forms/prd_output2.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/prdinput', {
      templateUrl: 'pages/forms/prd_input.html',
      controller: 'JournalFormCntlr',
      activetab: 'formentry'
    })
    .when('/journal', {
      templateUrl: 'pages/database/journal.html',
      controller: 'JournalCntlr',
      activetab: 'database'
    })

    .when('/ByPPrc', {
      templateUrl: 'pages/database/by_productDB.html',
      controller: 'ByProdCntlr',
      activetab: 'database'
    })
    .when('/TotProducRprt', {
      templateUrl: 'pages/production/productionReport.html',
      controller: 'productionReportCntlr',
      activetab: 'productions'
    })
    .when('/assetRegister', {
      templateUrl: 'pages/statements/assetRegister.html',
      controller: 'assetRegisterCntlr',
      activetab: 'statements'
    })
    .when('/trialbalance', {
      templateUrl: 'pages/statements/trialbalance.html',
      controller: 'trialbalanceCntlr',
      activetab: 'statements'
    })
    .when('/IncomeStatmnt', {
      templateUrl: 'pages/statements/incomeStatement.html',
      controller: 'incomeStatementCntlr',
      activetab: 'statements'
    })
    .when('/balancesheet', {
      templateUrl: 'pages/statements/balanceSheet.html',
      controller: 'balanceSheetCntlr',
      activetab: 'statements'
    })
    .when('/productperrep', {
      templateUrl: 'pages/ledger/pro_perform.html',
      controller: 'ProPerLedgerCntlr',
      activetab: 'statements'
    })
    .when('/debitledger', {
      templateUrl: 'pages/ledger/debit.html',
      controller: 'DebitLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/creditledger', {
      templateUrl: 'pages/ledger/credit.html',
      controller: 'CreditLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/expenseledger', {
      templateUrl: 'pages/ledger/expense.html',
      controller: 'ExLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/revledger', {
      templateUrl: 'pages/ledger/revenue.html',
      controller: 'CreditLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/debitorledger', {
      templateUrl: 'pages/ledger/debitor.html',
      controller: 'DebitorLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/creditorledger', {
      templateUrl: 'pages/ledger/creditor.html',
      controller: 'CreditorLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/opld', {
      templateUrl: 'pages/ledger/opld.html',
      controller: 'DebitorLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/oplc', {
      templateUrl: 'pages/ledger/oplc.html',
      controller: 'CreditorLedgerCntlr',
      activetab: 'ledger'
    })
    .when('/dcash', {
      templateUrl: 'pages/ledger/daily/cash.html',
      controller: 'CashCntlr',
      activetab: 'dailyReports'
    })
    .when('/dbank', {
      templateUrl: 'pages/ledger/daily/bank.html',
      controller: 'CashCntlr',
      activetab: 'dailyReports'
    })
    .when('/dexpense', {
      templateUrl: 'pages/ledger/daily/expense.html',
      controller: 'DailyExpCntlr',
      activetab: 'dailyReports'
    })
    .when('/drev', {
      templateUrl: 'pages/ledger/daily/revenue.html',
      controller: 'DailyRevCntlr',
      activetab: 'dailyReports'
    })
    .when('/dpurchase', {
      templateUrl: 'pages/ledger/daily/purchase.html',
      controller: 'CashCntlr',
      activetab: 'dailyReports'
    })
    .when('/invoice', {
      templateUrl: 'pages/ledger/invoice.html',
      controller: 'InvoiceCntlr',
      activetab: 'dailyReports'
    })
    .when('/newjournal', {
      templateUrl: 'pages/forms/nj.html',
      controller: 'NewJournalCntlr',
      activetab: 'user'
    })
    .when('/rawmaterials', {
      templateUrl: 'pages/ledger/raw_materials.html',
      controller: 'RawMaterialLedgerCntlr',
      activetab: 'productions'
    })
    .when('/finishedandby', {
      templateUrl: 'pages/ledger/finished_by.html',
      controller: 'RawMaterialLedgerCntlr',
      activetab: 'productions'
    })

    .when('/proledger', {
      templateUrl: 'pages/ledger/production.html',
      controller: 'ProductionLedgerCntlr',
      activetab: 'productions'
    })

    .when('/reg', {
      templateUrl: 'pages/reg.html',
      controller: 'RegCntlr',
      activetab: 'user'
    })
    .when('/exportchat', {
      templateUrl: 'pages/export_chart.html',
      controller: 'ChatExpoCntlr',
      activetab: 'chart'
    })

    .when('/myjournal', {
      templateUrl: 'pages/journals/my_journal.html',
      controller: 'MyJournalCntlr',
      activetab: 'user'
    })
    .otherwise({ redirectTo: '/' });
});
app.run(function ($rootScope, $location, $route, $firebaseObject) {
  $rootScope.$route = $route;
  $rootScope.companay = {
    name: 'Compnay Name',
    primaryIcon: 'http://testing.afsanajasi.com/Rahman/img/logo3.png',
    secondIcon: 'http://testing.afsanajasi.com/Rahman/img/logo32.png'
  }
  $rootScope.clogged = function () {
    if (lsGet('mushfic')) return true;   //Set as company name
    else return false;
  }
  $rootScope.logged = function () {
    if (lsGet('user')) return true;
    else return false;
  }
  $rootScope.$on('$routeChangeStart', function ($event, next, current) {
    let locURL = window.location.href.substring(window.location.href.indexOf('#'), window.location.href.length);
    if (!$rootScope.logged() && lsGet('reload')) {
      return;
    }
    else if (!$rootScope.logged() && locURL != '#/') {
      window.location.href = '#/';
    }
  });
  $rootScope.userInfo = userInfo;
  $print($rootScope.userInfo);
  $rootScope.begBalPer = $firebaseObject(getRef('begBalPer'));
  $rootScope.comNum = function (x) {
    if (!isNaN(Number(x))) {
      x = x.toString().split('.');
      if (x.length == 2) {
        return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + x[1].substring(-1, 2);
      }
      return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
  };
});

app.controller('LoginCntlr', function ($scope, $firebaseObject) {
  $scope.message = "Login Cntl";
  com = $scope.mushfic = $firebaseObject(getRef('mushfic')); //you need to change if it want to change company username
});
app.controller('PayableCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Creditor";
  var ref = firebase.database().ref().child('payables');
  dbPayables = $scope.comPayables = $firebaseArray(ref);
  $scope.comPayables.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comPayables.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('CompanyHeadsCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Company Head";
  var ref = firebase.database().ref().child('companyHeads');
  dbCh = $scope.comCh = $firebaseArray(ref);
  $scope.comCh.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comCh.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('CostCenterCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Cost Center";
  var ref = firebase.database().ref().child('costCenters');
  dbCostCenters = $scope.comCostCenters = $firebaseArray(ref);
  $scope.comCostCenters.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comCostCenters.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('TruckTractorCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Vehicle";
  var ref = firebase.database().ref().child('truckTrackors');
  dbTrs = $scope.comTrs = $firebaseArray(ref);
  $scope.comTrs.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comTrs.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('EmployeesCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Employee";
  var ref = firebase.database().ref().child('employees');
  dbEmps = $scope.comEmps = $firebaseArray(ref);
  $scope.comEmps.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comEmps.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('BankCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Bank";
  var ref = firebase.database().ref().child('banks');
  dbBanks = $scope.comBanks = $firebaseArray(ref);
  $scope.comBanks.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comBanks.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('ContractorsCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Contractor";
  var ref = firebase.database().ref().child('contractors');
  dbContractors = $scope.comContractors = $firebaseArray(ref);
  $scope.comContractors.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comContractors.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('PaddyRawCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Raw Material";
  var ref = firebase.database().ref().child('paddyRaw');
  dbPaddyRaws = $scope.comPaddyRaws = $firebaseArray(ref);
  $scope.comPaddyRaws.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comPaddyRaws.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('PaddyDryCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Loan";
  $scope.comPaddyDrys = lsExGJInit('comPaddyDrys', []);
  var ref = firebase.database().ref().child('paddyDry');
  dbPaddyDrys = $scope.comPaddyDrys = $firebaseArray(ref);
  $scope.comPaddyDrys.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comPaddyDrys.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('RiceCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Finished Good";
  var ref = firebase.database().ref().child('rice');
  dbRices = $scope.comRices = $firebaseArray(ref);
  $scope.comRices.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comRices.length == 0) {
      $scope.nodata = true;
    }
  });
});
app.controller('ByProductsCntlr', function ($scope, $firebaseArray) {
  $scope.title = "By Product";
  var ref = firebase.database().ref().child('buyProducts');
  dbByProducts = $scope.comByProducts = $firebaseArray(ref);
  $scope.comByProducts.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comByProducts.length == 0) {
      $scope.nodata = true;
    }
  });
});

app.controller('ByProdCntlr', function ($scope, $firebaseArray) {

  fGdataArrayall = $firebaseArray(getRef('byProductCollection'));
  $print(fGdataArrayall);

  $scope.title = "By-Product Price";
  var ref = firebase.database().ref().child('byProductCollection');
  dbByProd = $scope.comByProd = $firebaseArray(ref);
  $scope.comByProd.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comByProd.length == 0) {
      $scope.nodata = true;
    }
    else
      $print("length is " + $scope.comByProd.length);
  });


  var ref2 = firebase.database().ref().child('buyProducts');
  dbByProdlist = $scope.comByProdlist = $firebaseArray(ref2);
  $scope.comByProdlist.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comByProdlist.length == 0) {
      $scope.nodata = true;
    }
    else
      $print("length is " + $scope.comByProdlist.length);
  });

});

app.controller('loanOneCntlr', function ($scope, $firebaseArray) {

  loanOneCntlr = $firebaseArray(getRef('loanOne'));
  $print(loanOneCntlr);

  $scope.title = "Loan";
  var ref = firebase.database().ref().child('loanOne');
  dbloanOne = $scope.comloanOne = $firebaseArray(ref);
  $scope.comloanOne.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comloanOne.length == 0) {
      $scope.nodata = true;
    }
    else
      $print("length is " + $scope.comloanOne.length);
  });

});

app.controller('JournalFormCntlr', function ($scope, $firebaseArray, $firebaseObject) {
  lastEntryNo = $scope.lastEntry = $firebaseObject(getRef('lastFormEntry'));
  // For Product Output form to create Product Output table

  fGArrayFirst = $firebaseArray(getRef('rice'));

  fGArrayAll = $firebaseArray(getRef('byProductCollection'));

  accArray = $firebaseArray(getRef('accounts'));

  rawMaterial = $firebaseArray(getRef('paddyRaw'));


  partyArray = [$firebaseArray(getRef('banks'))];
  partyArray.push($firebaseArray(getRef('buyProducts')));
  partyArray.push($firebaseArray(getRef('companyHeads')));
  partyArray.push($firebaseArray(getRef('contractors')));
  partyArray.push($firebaseArray(getRef('employees')));
  partyArray.push($firebaseArray(getRef('paddyDry')));
  partyArray.push($firebaseArray(getRef('paddyRaw')));
  partyArray.push($firebaseArray(getRef('payables')));
  partyArray.push($firebaseArray(getRef('receivables')));
  partyArray.push($firebaseArray(getRef('rice')));
  partyArray.push($firebaseArray(getRef('truckTrackors')));
  $scope.records = [];
  fsDb.collection("JournalForm").get()
    .then(function (snapshot) {
      if (snapshot.size == 0) {
        $scope.$applyAsync();
      }
      else {
        snapshot.docs.forEach(element => {
          let obj = element.data();
          //$print(obj);
          $scope.records.push(obj);
          $scope.$applyAsync();
          //$print($scope.records);
        });
      }
    })
    .catch(function (err) {
      $print(err);
    });

  newvariable = $scope.records;


});

app.controller('JournalCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Journal";
  // All Juournals
  $scope.noData = false;
  $scope.journal = [];
  fsDb.collection("JournalForm").orderBy("entryNo", "desc").limit(100).get()
    .then(function (snapshot) {

      //Added Line Start
      if (snapshot.docs.length == 0) {
        $scope.noData = true;
        $scope.$applyAsync();
        return;
      }
      //Added Line End
      snapshot.docs.forEach(element => {
        $scope.journal.push(element.data());
        $scope.$applyAsync();
      });
    })
    .catch(function (err) {
      $print(err);
    });
  // Pre Journal
  $scope.pNoData = false;
  $scope.pJournal = [];
  fsDb.collection("JournalForm").where('flagPrejournal', '==', 1).orderBy("date", "desc").limit(10).get()
    .then(function (snapshot) {
      //Added Line Start
      if (snapshot.docs.length == 0) {
        $scope.pNoData = true;
        $scope.$applyAsync();
        return;
      }
      //Added Line End
      snapshot.docs.forEach(element => {
        $scope.pJournal.push(element.data());
        $scope.$applyAsync();
      });
    })
    .catch(function (err) {
      $print(err);
    });
  // Post Journal
  $scope.poNoData = false;
  $scope.poJournal = [];
  fsDb.collection("JournalForm").where('flagPrejournal', '==', 0).orderBy("date", "desc").limit(100).get()
    .then(function (snapshot) {
      //Added Line Start
      if (snapshot.docs.length == 0) {
        $scope.poNoData = true;
        $scope.$applyAsync();
        return;
      }
      //Added Line End
      snapshot.docs.forEach(element => {
        $scope.poJournal.push(element.data());
        $scope.$applyAsync();
      });
    })
    .catch(function (err) {
      $print(err);
    });
  // Pagination
  $scope.dataPartLoad = function (e) {
    if (e.keyCode == 13) {
      if ($scope.show == undefined || $scope.show == 'prejournal') {
        $scope.pJournal = [];
        let lim = parseInt(e.target.value);
        fsDb.collection("JournalForm").orderBy("entryNo").where("entryNo", ">=", lim).limit(10).where('flagPrejournal', '==', 0).get()
          .then(function (snapshot) {

            //Added Line Start
            if (snapshot.docs.length == 0) {
              $scope.pNoData = true;
              $scope.$applyAsync();
              return;
            }
            //Added Line End
            snapshot.docs.forEach(element => {
              $scope.pJournal.push(element.data());
              $scope.$applyAsync();
            });
          })
          .catch(function (err) {
            $print(err);
          });
      }
      // Post
      if ($scope.show == 'postjournal') {
        $scope.poJournal = [];
        let lim = parseInt(e.target.value);
        fsDb.collection("JournalForm").orderBy("entryNo").where("entryNo", ">=", lim).limit(100).where('flagPrejournal', '==', 1).get()
          .then(function (snapshot) {
            //Added Line Start
            if (snapshot.docs.length == 0) {
              $scope.poNoData = true;
              $scope.$applyAsync();
              return;
            }
            //Added Line End
            snapshot.docs.forEach(element => {
              $scope.poJournal.push(element.data());
              $scope.$applyAsync();
            });
          })
          .catch(function (err) {
            $print(err);
          });
      }
      // All
      if ($scope.show == 'alljournal') {
        $scope.journal = [];
        let lim = parseInt(e.target.value);
        fsDb.collection("JournalForm").orderBy("entryNo").where("entryNo", ">=", lim).limit(100).get()
          .then(function (snapshot) {
            //Added Line Start
            if (snapshot.docs.length == 0) {
              $scope.noData = true;
              $scope.$applyAsync();
              return;
            }
            //Added Line End
            snapshot.docs.forEach(element => {
              $scope.journal.push(element.data());
              $scope.$applyAsync();
            });
          })
          .catch(function (err) {
            $print(err);
          });
      }
      // End If of journal show
    }
  }
  // Serial
  $scope.pageLoad = function (e) {
    let lastData = '';
    let firstData = '';
    if ($scope.show == 'alljournal') {
      lastData = $scope.journal.pop();
      firstData = $scope.journal.shift();
      $scope.journal = [];
    }
    else if ($scope.show == 'postjournal') {
      lastData = $scope.poJournal.pop();
      firstData = $scope.poJournal.shift();
      $scope.poJournal = [];
    }
    else {
      lastData = $scope.pJournal.pop();
      firstData = $scope.pJournal.shift();
      $scope.pJournal = [];
    }
    if (e.target.name == 'next') {
      fsDb.collection("JournalForm").where('flagPrejournal', '==', 1).orderBy("date", "desc").startAfter(lastData.date).limit(100).get()
        .then(function (snapshot) {
          //Added Line Start
          if (snapshot.docs.length == 0) {
            if ($scope.show == 'alljournal')
              $scope.noData = true;
            else if ($scope.show == 'postjournal')
              $scope.poNoData = true;
            else
              $scope.pNoData = true;

            $scope.$applyAsync();
            return;
          }
          //Added Line End
          snapshot.docs.forEach(element => {
            if ($scope.show == 'alljournal')
              $scope.journal.push(element.data());
            else if ($scope.show == 'postjournal')
              $scope.poJournal.push(element.data());
            else
              $scope.pJournal.push(element.data());
            $scope.$applyAsync();
          });
        })
        .catch(function (err) {
          $print(err);
        });
    }
    if (e.target.name == 'pre') {
      fsDb.collection("JournalForm").where('flagPrejournal', '==', 1).orderBy("date", "desc").endAt(firstData.date).limit(100).get()
        .then(function (snapshot) {
          //Added Line Start
          if (snapshot.docs.length == 0) {
            $scope.pNoData = true;
            $scope.$applyAsync();
            return;
          }
          //Added Line End
          snapshot.docs.forEach(element => {
            $scope.pJournal.push(element.data());
            $scope.$applyAsync();
          });
        })
        .catch(function (err) {
          $print(err);
        });
    }
  }
  // Pagination End
  $scope.vData = [];
  $scope.viewData = function (e) {
    let allJour = [...$scope.journal, ...$scope.pJournal, ...$scope.poJournal];
    let vId = parseInt(e.target.id.slice(0, -1));
    let vName = e.target.name;
    $scope.firstData = null;
    $scope.secData = null;
    if(vName == 'Sales (Sales)' || vName == 'Sales Return (Sales)'){
      $scope.firstData = allJour.find(function (el) {
        return el.entryNo == vId;
      });
      $scope.secData = allJour.find(function (el) {
        return el.entryNo == vId + 1;
      });
    }
    else if(vName == 'Sales (Cost of Good Sold)' || vName == 'Sales Return (Cost of Good Sold)'){
      $scope.firstData = allJour.find(function (el) {
        return el.entryNo == vId - 1;
      });
      $scope.secData = allJour.find(function (el) {
        return el.entryNo == vId;
      });
    }
    else{
      $scope.vData = allJour.find(function (el) {
        return el.entryNo == vId;
      });
    }
    $scope.$applyAsync();
  }
  $scope.changerDC = function (code) {
    if (code == 'Dr') return 'Debit';
    if (code == 'Cr') return 'Credit';
  }
  $scope.numToDate = numToDateConv;
  $scope.totalDrCr = function (arr, type) {
    var dailyTotal = 0;
    for (i = 0; i < arr.length; i++) {
      if (type == 1) {
        dailyTotal += arr[i].debitCredit[0].drAmount;
      }
      if (type == 2) {
        dailyTotal += arr[i].debitCredit[1].crAmount;
      }
    }
    return dailyTotal;
  }
  $scope.intMk = function (date) {
    return parseInt(date);
  }

  $scope.users = $firebaseArray(getRef('users'));
  $scope.idToUsername = function (uId) {
    let tUsr = $scope.users.find(function (user) {
      return user.id == uId;
    })
    return tUsr.email;
  }
});

app.controller('MyJournalCntlr', function ($scope) {
  $scope.title = getQueryVariable('n') ? getQueryVariable('n') + "'s Journals" : "My Journal";
  $scope.title += getQueryVariable('t') == 1 ? ' (Entry)' : ' (Accepted)';
  $scope.noData = false;
  $scope.journal = [];
  let uId = getQueryVariable('id') ? getQueryVariable('id') : lsGetJ('user').id;
  let sKey = getQueryVariable('t') == 1 ? 'uId' : 'acceptedBy';
  let fDate = getQueryVariable('fdate') ? getQueryVariable('fdate') : 'no';
  let lDate = getQueryVariable('ldate') ? getQueryVariable('fdate') : 'no';
  if (fDate == 'no' && lDate == 'no') {
    fsDb.collection("JournalForm").where(sKey, "==", uId).get()
      .then(function (snapshot) {
        //Added Line Start
        if (snapshot.docs.length == 0) {
          $scope.noData = true;
          $scope.$applyAsync();
          return;
        }
        //Added Line End
        snapshot.docs.forEach(element => {
          $scope.journal.push(element.data());
          $scope.$applyAsync();
        });
      })
      .catch(function (err) {
        $print(err);
      });
  }
  else {
    fsDb.collection("JournalForm").where(sKey, "==", uId).where("date", ">=", Number(fDate)).where("date", "<=", Number(lDate)).get()
      .then(function (snapshot) {
        //Added Line Start
        if (snapshot.docs.length == 0) {
          $scope.noData = true;
          $scope.$applyAsync();
          return;
        }
        //Added Line End
        snapshot.docs.forEach(element => {
          $scope.journal.push(element.data());
          $scope.$applyAsync();
        });
      })
      .catch(function (err) {
        $print(err);
      });
  }

  $scope.changerDC = function (code) {
    if (code == 'Dr') return 'Debit';
    if (code == 'Cr') return 'Credit';
  }
  $scope.numToDate = numToDateConv;
  $scope.totalDrCr = function (arr, type) {
    var dailyTotal = 0;
    for (i = 0; i < arr.length; i++) {
      if (type == 1) {
        dailyTotal += arr[i].debitCredit[0].drAmount;
      }
      if (type == 2) {
        dailyTotal += arr[i].debitCredit[1].crAmount;
      }
    }
    return dailyTotal;
  }
  $scope.intMk = function (date) {
    return parseInt(date);
  }
});

app.controller('by_productDBCntlr', function ($scope, $firebaseArray) {
  $scope.title = "By Product Price List";
  var ref = firebase.database().ref().child('byProductCollection');
  dbByProducts = $scope.comByProducts = $firebaseArray(ref);
  $scope.comByProducts.$loaded().then(function () {
    $scope.load = true;
    if ($scope.comByProducts.length == 0) {
      $scope.nodata = true;
    }
  });
});


app.controller('RegCntlr', function ($scope, $firebaseArray) {
  var ref = getRef('users');
  $scope.title = "Register";
  $scope.load = false;
  $scope.nodata = false;
  $scope.users = $firebaseArray(ref);
  $scope.users.$loaded().then(function () {
    $scope.load = true;
    if ($scope.users.length == 0) {
      $scope.nodata = true;
    }
  });
  $scope.per = [];
  $scope.getPer = function (e) {
    $scope.per = $firebaseArray(getRef('users/' + pId));
  }
  $scope.getCheck = function (id) {
    if ($scope.per.length == 0) return false;
    else {
      for (i = 0; i < $scope.per.length; i++) {
        if ($scope.per[i].$id == id) {
          return $scope.per[i].$value;
        }
      }
    }
  }
  $scope.getUsername = function (email) {
    return email.replace('@gmail.com', '');
  }
  $scope.journal = [];
  fsDb.collection("JournalForm").get()
    .then(function (snapshot) {
      snapshot.docs.forEach(element => {
        $scope.journal.push(element.data());
        $scope.$applyAsync();
      });
    })
    .catch(function (err) {
      $print(err);
    });
  $scope.fQDate = 'no';
  $scope.lQDate = 'no';
  let regEx = /^\d{1,2}-(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-\d{2}$/i;
  $scope.reCal = function (e) {
    let lDate = e.target.parentElement.previousElementSibling.firstElementChild;
    let fDate = lDate.parentElement.previousElementSibling.firstElementChild;
    if (fDate.value == "" || !(fDate.value).match(regEx)) {
      notify('From Date Format Wrong or Enpty!', 2);
      fDate.focus();
      return;
    }
    else if (lDate.value == "" || !(lDate.value).match(regEx)) {
      notify('To Date Format Wrong or Enpty!', 2);
      lDate.focus();
      return;
    }
    e.target.disabled = true;
    e.target.textContent = 'Loading...';
    $scope.fQDate = dateToNum(fDate.value);
    $scope.lQDate = dateToNum(lDate.value);
    $scope.journal = [];
    fsDb.collection("JournalForm").where("date", ">=", dateToNum(fDate.value)).where("date", "<=", dateToNum(lDate.value)).get()
      .then(function (snapshot) {
        snapshot.docs.forEach(element => {
          $scope.journal.push(element.data());
          $scope.$applyAsync();
        });
        e.target.disabled = false;
        e.target.textContent = 'Check';
        notify('Calculated Successfully!', 1);
      })
      .catch(function (err) {
        $print(err);
      });
  }
  $scope.$applyAsync();
  $scope.getLen = function (jou, id) {
    let uJou = jou.filter(function (el) {
      return el.uId == id;
    });
    return uJou.length;
  }
  $scope.getAbLen = function (jou, id) {
    let uJou = jou.filter(function (el) {
      if (el.hasOwnProperty('acceptedBy') && el.acceptedBy == id)
        return true;
      else return false;
      // return el.acceptedBy == id;
    });
    return uJou.length;
  }
});
// Chart Export Controller
app.controller('ChatExpoCntlr', function ($scope, $firebaseArray) {
  $scope.title = "Export in Excel";
  $scope.debitors = $firebaseArray(getRef('receivables'));
  $scope.creditors = $firebaseArray(getRef('payables'));
  $scope.companyHeads = $firebaseArray(getRef('companyHeads'));
  $scope.vechicles = $firebaseArray(getRef('truckTrackors'));
  $scope.employees = $firebaseArray(getRef('employees'));
  $scope.banks = $firebaseArray(getRef('banks'));
  $scope.contractors = $firebaseArray(getRef('contractors'));
  $scope.rawMaterials = $firebaseArray(getRef('paddyRaw'));
  $scope.finGoods = $firebaseArray(getRef('rice'));
  $scope.byProducts = $firebaseArray(getRef('buyProducts'));
  $scope.loans = $firebaseArray(getRef('paddyDry'));
  $scope.costCenters = $firebaseArray(getRef('costCenters'));
  $scope.comAccounts = $firebaseArray(getRef('accounts'));
  $scope.getAccArr = function (fl) {
    return $scope.comAccounts.filter(function (el) {
      return el.flag == fl;
    });
  }
  $scope.load = false;
  $scope.comAccounts.$loaded().then(function () {
    $scope.load = true;
  });
});
