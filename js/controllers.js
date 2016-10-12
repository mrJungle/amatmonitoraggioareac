angular.module('areacapp')

.controller('AppCtrl', function ($scope, $state, $document,  $rootScope) {



})

.controller('ApiCtrl', function ($scope, $http) {

    $('html, body').animate({scrollTop : 0},800);

    //console.log('Bundle');

})


.controller('CreditsCtrl', function ($scope, $http) {

    $('html, body').animate({scrollTop : 0},800);

    //console.log('Crediti');

})


.controller('ReportCtrl', function ($scope, $http,$location, $anchorScroll, $q, reportService, $window) {

    $('html, body').animate({scrollTop : 0},800);

    //console.log('Crediti');

    $scope.boxClass = true;
    $scope.toolsClass = false;

    $scope.spalmaNC = function(a, b, c, d, e){
        if (e == 1){ return parseFloat(a)+(parseFloat(d)*(parseFloat(a)/(parseFloat(a)+parseFloat(b)+parseFloat(c))))
            }
        return parseFloat(b)+parseFloat(c)+(parseFloat(d)*((parseFloat(b)+parseFloat(c))/(parseFloat(a)+parseFloat(b)+parseFloat(c))))
    }

    $scope.spalmaNCperc = function(a, b, c, d, e){
        if (e == 1){ return (parseFloat(a)+(parseFloat(d)*(parseFloat(a)/(parseFloat(a)+parseFloat(b)+parseFloat(c)))))/(parseFloat(a)+parseFloat(b)+parseFloat(c)+parseFloat(d))*100
            }
        return (parseFloat(b)+parseFloat(c)+(parseFloat(d)*((parseFloat(b)+parseFloat(c))/(parseFloat(a)+parseFloat(b)+parseFloat(c)))))/(parseFloat(a)+parseFloat(b)+parseFloat(c)+parseFloat(d))*100
    }

    $scope.caricoVeicoli = function(a) {
        var a_aut = (a[1].veicoli_autorizzati/a[0].veicoli*100)-(a[0].veicoli_autorizzati/a[0].veicoli*100)
        var a_eco = (a[1].veicoli_ecologici/a[0].veicoli*100)-(a[0].veicoli_ecologici/a[0].veicoli*100)
        var a_res = (a[1].veicoli_residenti/a[0].veicoli*100)-(a[0].veicoli_residenti/a[0].veicoli*100)        
        var a_vds = (a[1].veicoli_vds/a[0].veicoli*100)-(a[0].veicoli_vds/a[0].veicoli*100)                
        var a_pag = (a[1].veicoli_paganti/a[0].veicoli*100)-(a[0].veicoli_paganti/a[0].veicoli*100)                
        console.log(a_aut, a_eco)
        if(
            (a_aut)<5 && (a_aut)>-5 
            ||
            (a_eco)<5 && (a_eco)>-5 
        ){return 'non presenta variazioni consistenti'}
        return 'presenta variazioni consistenti'
    }    

    $scope.caricoTransiti = function(a) {
        var a_aut = (a[1].transiti_autorizzati/a[1].transiti_tot_classi*100)-(a[0].transiti_autorizzati/a[0].transiti_tot_classi*100)
        var a_eco = (a[1].transiti_ecologici/a[1].transiti_tot_classi*100)-(a[0].transiti_ecologici/a[0].transiti_tot_classi*100)
        var a_res = (a[1].transiti_residenti/a[1].transiti_tot_classi*100)-(a[0].transiti_residenti/a[0].transiti_tot_classi*100)        
        var a_vds = (a[1].transiti_vds/a[1].transiti_tot_classi*100)-(a[0].transiti_vds/a[0].transiti_tot_classi*100)                
        var a_pag = (a[1].transiti_paganti/a[1].transiti_tot_classi*100)-(a[0].transiti_paganti/a[0].transiti_tot_classi*100)        
        console.log(a_aut, a_eco)        
        if(
            (a_aut)<5 && (a_aut)>-5 
            ||
            (a_eco)<5 && (a_eco)>-5 
        ){return 'non'}
        return ''
    }    

    $scope.diffTransitiVeicoli = function(a) {
        var a_aut = (a[0].transiti_autorizzati/a[0].transiti_tot_classi*100)-(a[0].veicoli_autorizzati/a[0].veicoli*100)
        var a_pag = (a[0].transiti_paganti/a[0].transiti_tot_classi*100)-(a[0].veicoli_paganti/a[0].veicoli*100)                
        console.log(a_aut, a_pag)
        if(
            (a_aut)>0 
            &&
            (a_pag)<0
        ){return ''}
        return 'non'
    }


    $scope.IndiceOpen = function(){ $scope.toolsClass = !$scope.toolsClass;}

    $scope.goto = function(x) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(x);

      // call $anchorScroll()
      $anchorScroll();
    };


    $scope.getDati = function() {
        var deferred = $q.defer();
        var dati = reportService.getReport()
        $q.all([dati])
            .then(function(data){
                $scope.web_0Promise = data[0].web_0Promise;
                $scope.web_2settPromise = data[0].web_2settPromise 
                $scope.web_2mensPromise = data[0].web_2mensPromise
                $scope.web_3MacroclassiLastPromise = data[0].web_3MacroclassiLastPromise
                $scope.web_3MacroclassiAnnoPromise = data[0].web_3MacroclassiAnnoPromise
                $scope.web_3MacroclassiMesePromise = data[0].web_3MacroclassiMesePromise
                $scope.dataSetGraph_1 = reportService.GraphReport_1($scope.web_0Promise)
                $scope.dataSetGraph_2 = reportService.GraphReport_2($scope.web_0Promise)
                $scope.dataSetGraph_3 = reportService.GraphReport_3($scope.web_2settPromise)
                $scope.dataSetGraph_4 = reportService.GraphReport_4($scope.web_2mensPromise)
                $scope.dataSetGraph_5 = reportService.GraphReport_5($scope.web_3MacroclassiLastPromise[0])
                $scope.dataSetGraph_6 = reportService.GraphReport_6($scope.web_3MacroclassiLastPromise[0])
                $scope.dataSetGraph_7 = reportService.GraphReport_7($scope.web_3MacroclassiAnnoPromise) //transiti
                $scope.dataSetGraph_8 = reportService.GraphReport_8(_.filter($scope.web_3MacroclassiMesePromise, function(num) { return num.anno == '2016'}))
                //transiti
                //$scope.dataSetGraph_4 = reportService.GraphReport_1($scope.web_0Promise)
                $scope.out_deltaVeicoli = $scope.caricoVeicoli($scope.web_3MacroclassiLastPromise)
                $scope.out_deltaTransiti = $scope.caricoTransiti($scope.web_3MacroclassiLastPromise)
                $scope.out_deltaTransitiVeicoli = $scope.diffTransitiVeicoli($scope.web_3MacroclassiLastPromise)


            })
            .catch(function(err){
                deferred.resolve(false);
            });
    }  

    $scope.getDati();



})


.controller('HomeCtrl', function ($scope, $http, areacappService, $q, $uibModal, $log, utilsDataSetService, $rootScope) {

    $('html, body').animate({scrollTop : 0},800);


    $scope.pos = 0;



    //console.log('Home')


    $scope.nomevarco = function(idVarco){
        return utilsDataSetService.fromId2NomeVarco(idVarco, $scope.cart_varchi)
    };

    $scope.oggiAndamentiGiornoFunzionamento = function(data){
        var oggi = _.find($scope.andamenti_giorno_funzionamento, function(num) { 
            return num.giorno == data})
        if (oggi != undefined ) {return oggi}
        return {"malfunzionamenti": "Error", "giorno": "Error","guasti": "Error","transiti": "Error", "varchi_funzionanti": "Error", }
    }

    $scope.oggiAndamentoClassi = function(data){
        var oggi = _.find($scope.AndamentoGiornoClassi, function(num) { 
            return num.giorno == data})
        if (oggi != undefined ) {return oggi}
        return {"malfunzionamenti": "Error", "giorno": "Error","guasti": "Error","transiti": "Error", "varchi_funzionanti": "Error", }
    }

    Date.prototype.yyyymmdd = function() {
       var yyyy = this.getFullYear().toString();
       var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
       var dd  = this.getDate().toString();
       return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+  dd[0]); // padding
    };


    $scope.cambiaDataIntervallo = function(d, i){
        //console.log(d)
        var giorno = new Date(d); 
        giorno.setDate(giorno.getDate()+i)
        //console.log(giorno)
        return giorno
    }

    $scope.initialData = 0

    $scope.giornoAreac = false;

    $scope.variaData = function(i){
        $scope.giornoSelezionato.setDate($scope.giornoSelezionato.getDate()+i)
        $scope.DataFineIntervallo.setDate($scope.DataFineIntervallo.getDate()+i)       
        $scope.giornoAreac = false;
        if (utilsDataSetService.giorniAreaC($scope.giornoSelezionato.yyyymmdd(), $scope.DataSet.funzionamenti)){ $scope.giornoAreac = true;}        
        $scope.dataSetDelGiorno = utilsDataSetService.dataseDelGiorno($scope.DataSet, $scope.giornoSelezionato.yyyymmdd());
        $scope.dataSetDelPeriodo = utilsDataSetService.dataseDelPeriodo($scope.DataSet, $scope.giornoSelezionato.yyyymmdd(), $scope.DataFineIntervallo.yyyymmdd())
        $scope.dataSetGraph = utilsDataSetService.dataSetGraph($scope.dataSetDelGiorno, $scope.dataSetDelPeriodo)
        //}
        //else {console.log('giorno non areac');  }
    }

    $scope.cambiaData = function(i){
        $scope.giornoSelezionato = i
        $scope.DataFineIntervallo = $scope.cambiaDataIntervallo($scope.giornoSelezionato, -31)       
        $scope.giornoAreac = false;
        if (utilsDataSetService.giorniAreaC($scope.giornoSelezionato.yyyymmdd(), $scope.DataSet.funzionamenti)){ $scope.giornoAreac = true;}        
        $scope.dataSetDelGiorno = utilsDataSetService.dataseDelGiorno($scope.DataSet, $scope.giornoSelezionato.yyyymmdd());
        $scope.dataSetDelPeriodo = utilsDataSetService.dataseDelPeriodo($scope.DataSet, $scope.giornoSelezionato.yyyymmdd(), $scope.DataFineIntervallo.yyyymmdd())
        $scope.dataSetGraph = utilsDataSetService.dataSetGraph($scope.dataSetDelGiorno, $scope.dataSetDelPeriodo)
        //}
        //else {console.log('giorno non areac');  }
    }



    // var iniziali 

    $scope.giornoSelezionato = null;

    $scope.DataSet = { 'varchi' :{},
                        'funzionamenti' : {},  // andamento dei funzionamenti
                        'andamentoPerVarco': {} ,
                        'andamentoOrario': {},
                        'andamentoClassi': {}
                    }

    $scope.dataSetDelGiorno = {};

    $scope.dataSetDelPeriodo = {};

    $scope.dataSetGraph = {};


    $scope.controlloDati = function() {
        var deferred = $q.defer();
        var dati = areacappService.getBase()
        $q.all([dati])
            .then(function(data){
                //console.log(data);
                // Dataset ////////////////
                $scope.cart_varchi = data[0].cart_varchi;
                $scope.calendario = data[0].calendario;
                $scope.giorno_varchi = data[0].andamenti_areac_last;
                $scope.andamento_giorno_varchi = data[0].andamento_giorno_varchi;
                $scope.andamenti_giorno_funzionamento = data[0].andamenti_giorno_funzionamento;
                $scope.AndamentoGiornoClassi = data[0].andamento_giorno_classi;
                $scope.AndamentoOrarioGiornaliero = data[0].andamento_orario_giornaliero;
                //////////////////////////////




                // Dataset ricreati per test////////////////
                $scope.DataSet.varchi = data[0].cart_varchi;
                $scope.DataSet.funzionamenti = data[0].andamenti_giorno_funzionamento; 
                $scope.DataSet.andamentoPerVarco = data[0].andamento_giorno_varchi;
                $scope.DataSet.andamentoClassi = data[0].andamento_giorno_classi;
                $scope.DataSet.andamentoOrario = data[0].andamento_orario_giornaliero;
                $scope.DataSet.calendario = data[0].calendario;
                $scope.DataSet.andamentoOrarioUltimoPeriodo = data[0].andamento_orario_last;



                // setting Giorno ///////////
                $scope.giorno_last = (utilsDataSetService.ultimoGiornoDisponibile($scope.giorno_varchi)).data
                $scope.ultimoGiornoSelezionabile = (utilsDataSetService.ultimoGiornoDisponibile($scope.giorno_varchi)).data
                $scope.giorno_last_stringa = (utilsDataSetService.ultimoGiornoDisponibile($scope.giorno_varchi)).stringa
                $scope.giornoSelezionato = $scope.giorno_last
                $scope.DataFineIntervallo = $scope.cambiaDataIntervallo($scope.giorno_last, -31)
                $scope.DataFineIntervallo_stringa = $scope.DataFineIntervallo.yyyymmdd()
                ////////////////////////////////



/////////////////////////////////////////////////////
                $scope.dataSetDelGiorno = utilsDataSetService.dataseDelGiorno($scope.DataSet, $scope.giorno_last_stringa);
                $scope.dataSetDelPeriodo = utilsDataSetService.dataseDelPeriodo($scope.DataSet, $scope.giorno_last_stringa, $scope.DataFineIntervallo_stringa)
                $scope.dataSetGraph = utilsDataSetService.dataSetGraph($scope.dataSetDelGiorno, $scope.dataSetDelPeriodo)
                console.log($scope.dataSetDelGiorno);
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// TODO ------- creare un dizionatrio per i dati dei grafici e poi il service che ritorna il dizionario compilato. 
// MANCA andamento orario e andamento ingressi ultimi 30 giorni
// chiamare il serivce al primo giro e ogni volta che una data viene cambiata

/////// levare roba vvecchia
                

                // dettaglio Giornaliero dei DataSet
                //$scope.OggiFunzionamenti = $scope.oggiAndamentiGiornoFunzionamento($scope.giorno_last_stringa)                
                

                //$scope.OggiClassi = $scope.oggiAndamentoClassi($scope.giorno_last_stringa)

                

                // Bootstrap dei Grafici
                //$scope.graphAndamentiGiorno($scope.giorno_last_stringa);
                //$scope.GraphRipartizioneVeicoli();
                //$scope.GraphRipartizioneTransiti();
                //$scope.GraphStatoVarchi();
                //$scope.graphAndamentoOrario($scope.giorno_last_stringa);
                //$scope.graphTransitiGiorno($scope.giorno_last, $scope.DataFineIntervallo);

                // altro per il calendario                
                $scope.dt = $scope.giorno_last;
                $scope.items = [$scope.giorno_last_stringa, '2015-05-16', '2016-01-01'];
            })
            .catch(function(err){

                deferred.resolve(false);
            });
        //return deferred.promise;              
    }     





    $scope.controlloDati();
    
    $scope.pp = true;

    $scope.colorariga = function(p){ 
        if (parseInt(p)==100) {return 'danger'}
        if (parseInt(p)>=70) {return 'danger'}
        if (parseInt(p)>=10) {return 'warning'}
        if (parseInt(p)>0) {return 'info'}
        return 'success'
    }


//$scope.items = [$scope.giorno_last, $scope.giorno_last, new Date('2016-01-01')];


  $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'html/modalDatepicker.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        giorno: function () {
          //console.log($scope.items);
          return [$scope.giornoSelezionato, $scope.ultimoGiornoSelezionabile];
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
        //console.log(selectedItem);
        //console.log(new Date(selectedItem));
        console.log('ciaociaoao')
        console.log(selectedItem)
      //$scope.selected = selectedItem;
      $scope.cambiaData(selectedItem);
    }, function () {
      console.log('ksmalsnakjsnakj')

//      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  })

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, giorno) {

  $scope.giornoSelezionato = giorno[0];

  $scope.ok = function () {
    $uibModalInstance.close($scope.giornoSelezionato);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


  $scope.options = {
//    customClass: getDayClass,
    minDate: new Date('2016-01-01'),
    maxDate: giorno[1],
    showWeeks: true
  };

  $scope.setDate = function(year, month, day) {
    //$scope.dt = new Date(year, month, day);
    console.log('tolta')
  };

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }


  });