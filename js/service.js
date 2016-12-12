angular.module("areacapp")

    .factory("reportService", function($http, $q) {

    var getReport = function() {
        //console.log('service')
        var deferred = $q.defer();
        var web_0Promise = $http.get('dati/web_report_0_introduzione.json')
        var web_2settPromise = $http.get('dati/web_report_2_transiti_settimanali.json')
        var web_2mensPromise = $http.get('dati/web_report_2_transiti_mensili.json')
        var web_3MacroclassiLastPromise = $http.get('dati/web_report_3_macroclassi_last.json')
        var web_3MacroclassiAnnoPromise = $http.get('dati/web_report_3_macroclassi_anno.json')
        var web_3MacroclassiMesePromise = $http.get('dati/web_report_3_macroclassi_mese.json')
        var web_4AndamentoOrarioStoricoPromise = $http.get('dati/web_report_4_andamento_orario_storico.json')
        //var AndamentiVeicoliPromise = $http.get('dati/andamento_veicoli.json')
        $q.all([web_0Promise, web_2settPromise, web_2mensPromise, web_3MacroclassiLastPromise,  web_3MacroclassiAnnoPromise,  web_3MacroclassiMesePromise, web_4AndamentoOrarioStoricoPromise])
            .then(function(data){
                //console.log(data)
                var stream = { 'web_0Promise':data[0].data.dati,
                               'web_2settPromise':data[1].data.dati,
                               'web_2mensPromise':data[2].data.dati,
                               'web_3MacroclassiLastPromise':data[3].data.dati,
                               'web_3MacroclassiAnnoPromise':data[4].data.dati,
                               'web_3MacroclassiMesePromise':data[5].data.dati,
                               'web_4AndamentoOrarioStoricoPromise':data[6].data.dati,
                          };
                deferred.resolve(stream);                
            })
            .catch(function(err){
                deferred.resolve(false);
            });
        return deferred.promise;              
    } 


    var GraphReport_7 = function(nDataSet) {

        var opzioni = {
            chart: {
                type: 'multiBarChart',
                //type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 10,
                    right: 40,
                    bottom: 150,
                    left: 40
                },
                reduceXTicks: false,
                focusEnable: true,
                focusHeight: 50,
                focusShowAxisX: true,
                focusShowAxisY: false,
                
                //focusMargin: {...} + ~ -,
                //clipEdge: false,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                labelSunbeamLayout: true,
                tooltip:{ distance: 21, },
                //useInteractiveGuideline: true,                
                x: function(d){ return d.anno; },
                y: function(d){ return d.transiti; },
                //useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Anno',
                    rotateLabels: -80,
                    tickFormat: function(d){
                        return (d);
                        //return d3.time.format('%x')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'Transiti Rilevati',
                    tickFormat: function(d){
                        return d3.format('.1f')(d);
                    },
                //axisLabelDistance: 7
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

        if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}
        var sommaParziale = function(num){return parseFloat(num.ecologici_merci)+parseFloat(num.ecologici_nc)+parseFloat(num.ecologici_bus)+parseFloat(num.ecologici_persone)+parseFloat(num.residenti_bus)+parseFloat(num.residenti_merci)+parseFloat(num.residenti_nc)+parseFloat(num.residenti_persone)+parseFloat(num.altripaganti_merci)+parseFloat(num.altripaganti_bus)+parseFloat(num.altripaganti_persone)+parseFloat(num.altripaganti_nc)+parseFloat(num.vds_persone)+parseFloat(num.vds_merci)+parseFloat(num.vds_bus)+parseFloat(num.vds_nc)+parseFloat(num.autorizzati_persone)+parseFloat(num.autorizzati_merci)+parseFloat(num.autorizzati_nc)+parseFloat(num.autorizzati_bus)}
        var dati = [
                {
                    key: 'Transiti Autorizzati',
                    color: 'orange',
                    values: _.map(_.sortBy(nDataSet, 'anno'), function(num) { 
                        var tot = sommaParziale(num)
                        var a = _.pick( num, 'anno', 'autorizzati_merci', 'autorizzati_persone','autorizzati_bus', 'autorizzati_nc'); 
                        a.anno = parseInt(a.anno); 
                        a.transiti = Math.round((parseFloat(a.autorizzati_merci)+parseFloat(a.autorizzati_persone)+parseFloat(a.autorizzati_bus)+parseFloat(a.autorizzati_nc))/tot*10000)/100; 
                        return _.pick(a, 'anno', 'transiti')})
                },
                {
                    key: 'Transiti ecologici ',
                    color: 'green',
                    values: _.map(_.sortBy(nDataSet, 'anno'), function(num) {
                        var tot = sommaParziale(num)
                        var a = _.pick( num, 'anno', 'ecologici_merci', 'ecologici_persone','ecologici_bus', 'ecologici_nc'); 
                        a.anno = parseInt(a.anno); 
                        a.transiti = Math.round((parseFloat(a.ecologici_merci)+parseFloat(a.ecologici_persone)+parseFloat(a.ecologici_bus)+parseFloat(a.ecologici_nc))/tot*10000)/100; 
                        return _.pick(a, 'anno', 'transiti')})
                },
                {
                    key: 'Transiti residenti ',
                    color: 'yellow',
                    values: _.map(_.sortBy(nDataSet, 'anno'), function(num) { 
                        var tot = sommaParziale(num)
                        var a = _.pick(num, 'anno', 'residenti_merci', 'residenti_persone','residenti_bus', 'residenti_nc'); 
                        a.anno = parseInt(a.anno);  
                        a.transiti = Math.round((parseFloat(a.residenti_merci)+parseFloat(a.residenti_persone)+parseFloat(a.residenti_bus)+parseFloat(a.residenti_nc))/tot*10000)/100; 
                        return _.pick(a, 'anno', 'transiti')})
                },
                {
                    key: 'Transiti vds ',
                    color: 'purple',
                    values: _.map(_.sortBy(nDataSet, 'anno'), function(num) { 
                        var tot = sommaParziale(num)
                        var eco_t =  Math.round((parseFloat(num.ecologici_merci)+
                                    parseFloat(num.ecologici_nc)+
                                    parseFloat(num.ecologici_bus)+
                                    parseFloat(num.ecologici_persone))/tot*10000)/100;

                        var res_t =  Math.round((parseFloat(num.residenti_bus)+
                                    parseFloat(num.residenti_merci)+
                                    parseFloat(num.residenti_nc)+
                                    parseFloat(num.residenti_persone))/tot*10000)/100;
                                    
                        var alp_t =  Math.round((parseFloat(num.altripaganti_merci)+
                                    parseFloat(num.altripaganti_bus)+
                                    parseFloat(num.altripaganti_persone)+
                                    parseFloat(num.altripaganti_nc))/tot*10000)/100;

                        var vds_t =  Math.round((parseFloat(num.vds_persone)+
                                    parseFloat(num.vds_merci)+
                                    parseFloat(num.vds_bus)+
                                    parseFloat(num.vds_nc))/tot*10000)/100;
                                    
                        var aut_t =  Math.round((parseFloat(num.autorizzati_persone)+
                                    parseFloat(num.autorizzati_merci)+
                                    parseFloat(num.autorizzati_nc)+
                                    parseFloat(num.autorizzati_bus))/tot*10000)/100;                             
                        var delta = 0;
//                        console.log('val', eco_t, res_t, alp_t, vds_t, aut_t)
                        if ((eco_t + res_t + alp_t + vds_t + aut_t) != 100) {delta = 100 - (eco_t + res_t + alp_t + vds_t + aut_t)}
//                        console.log('delta', delta, (eco_t + res_t + alp_t + vds_t + aut_t))
                        var a = _.pick(num, 'anno', 'vds_merci', 'vds_persone','vds_bus', 'vds_nc'); 
                        a.anno = parseInt(a.anno);  
                        a.transiti = delta + (Math.round((parseFloat(a.vds_merci)+parseFloat(a.vds_persone)+parseFloat(a.vds_bus)+parseFloat(a.vds_nc))/tot*10000)/100); 
                        return _.pick(a, 'anno', 'transiti')})
                },
                {
                    key: 'Transiti altri paganti ',
                    color: 'gray', 
                    values: _.map(_.sortBy(nDataSet, 'anno'), function(num) { 
                        var tot = sommaParziale(num)
                        var a = _.pick(num, 'anno', 'altripaganti_merci', 'altripaganti_persone','altripaganti_bus', 'altripaganti_nc'); 
                        a.anno = parseInt(a.anno); 
                        a.transiti = Math.round((parseFloat(a.altripaganti_merci)+parseFloat(a.altripaganti_persone)+parseFloat(a.altripaganti_bus)+parseFloat(a.altripaganti_nc))/tot*10000)/100; 
                        //console.log(a.transiti)
                        return _.pick(a, 'anno', 'transiti')})
                }

                ];

        return { opzioni : opzioni, dati : dati }
    };


    var GraphReport_8 = function(nDataSet) {


        var mesi = ['GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO', 'LUGLIO', 
        'AGOSTO', 'SETTEMBRE', 'OTTOBRE',  'NOVEMBRE', 'DICEMBRE']

        var opzioni = {
            chart: {
                type: 'multiBarChart',
                //type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 10,
                    right: 40,
                    bottom: 180,
                    left: 40
                },
                reduceXTicks: false,
                focusEnable: true,
                focusHeight: 50,
                focusShowAxisX: true,
                focusShowAxisY: false,
                
                //focusMargin: {...} + ~ -,
                //clipEdge: false,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                labelSunbeamLayout: true,
                tooltip:{ distance: 21, },
                //useInteractiveGuideline: true,                
                x: function(d){ return d.mese; },
                y: function(d){ return d.transiti; },
                //useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Anno',
                    rotateLabels: -80,
                    tickFormat: function(d){
                        return mesi[parseInt(d)-1];
                    //return d
                }
                },
                yAxis: {
                    axisLabel: 'Transiti Rilevati',
                    tickFormat: function(d){
                        return d3.format('.1f')(d);
                    },
                //axisLabelDistance: 7
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

        if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}
        var sommaParziale = function(num){return parseFloat(num.ecologici_merci)+parseFloat(num.ecologici_nc)+parseFloat(num.ecologici_bus)+parseFloat(num.ecologici_persone)+parseFloat(num.residenti_bus)+parseFloat(num.residenti_merci)+parseFloat(num.residenti_nc)+parseFloat(num.residenti_persone)+parseFloat(num.altripaganti_merci)+parseFloat(num.altripaganti_bus)+parseFloat(num.altripaganti_persone)+parseFloat(num.altripaganti_nc)+parseFloat(num.vds_persone)+parseFloat(num.vds_merci)+parseFloat(num.vds_bus)+parseFloat(num.vds_nc)+parseFloat(num.autorizzati_persone)+parseFloat(num.autorizzati_merci)+parseFloat(num.autorizzati_nc)+parseFloat(num.autorizzati_bus)}
        var dati = [
                {
                    key: 'Transiti Autorizzati',
                    color: 'orange',
                    values: _.map(_.sortBy(nDataSet, 'mese'), function(num) { 
                        var tot = sommaParziale(num)
                        var a = _.pick( num, 'mese', 'autorizzati_merci', 'autorizzati_persone','autorizzati_bus', 'autorizzati_nc'); 
                        a.mese = parseInt(a.mese); 
                        a.transiti = Math.round((parseFloat(a.autorizzati_merci)+parseFloat(a.autorizzati_persone)+parseFloat(a.autorizzati_bus)+parseFloat(a.autorizzati_nc))/tot*10000)/100; 
                        return _.pick(a, 'mese', 'transiti')})
                },
                {
                    key: 'Transiti ecologici ',
                    color: 'green',
                    values: _.map(_.sortBy(nDataSet, 'mese'), function(num) {
                        var tot = sommaParziale(num)
                        var a = _.pick( num, 'mese', 'ecologici_merci', 'ecologici_persone','ecologici_bus', 'ecologici_nc'); 
                        a.mese = parseInt(a.mese); 
                        a.transiti = Math.round((parseFloat(a.ecologici_merci)+parseFloat(a.ecologici_persone)+parseFloat(a.ecologici_bus)+parseFloat(a.ecologici_nc))/tot*10000)/100; 
                        return _.pick(a, 'mese', 'transiti')})
                },
                {
                    key: 'Transiti residenti ',
                    color: 'yellow',
                    values: _.map(_.sortBy(nDataSet, 'mese'), function(num) { 
                        var tot = sommaParziale(num)
                        var a = _.pick(num, 'mese', 'residenti_merci', 'residenti_persone','residenti_bus', 'residenti_nc'); 
                        a.mese = parseInt(a.mese);  
                        a.transiti = Math.round((parseFloat(a.residenti_merci)+parseFloat(a.residenti_persone)+parseFloat(a.residenti_bus)+parseFloat(a.residenti_nc))/tot*10000)/100; 
                        return _.pick(a, 'mese', 'transiti')})
                },
                {
                    key: 'Transiti vds ',
                    color: 'purple',
                    values: _.map(_.sortBy(nDataSet, 'mese'), function(num) { 
                        var tot = sommaParziale(num)
                        var eco_t =  Math.round((parseFloat(num.ecologici_merci)+
                                    parseFloat(num.ecologici_nc)+
                                    parseFloat(num.ecologici_bus)+
                                    parseFloat(num.ecologici_persone))/tot*10000)/100;

                        var res_t =  Math.round((parseFloat(num.residenti_bus)+
                                    parseFloat(num.residenti_merci)+
                                    parseFloat(num.residenti_nc)+
                                    parseFloat(num.residenti_persone))/tot*10000)/100;
                                    
                        var alp_t =  Math.round((parseFloat(num.altripaganti_merci)+
                                    parseFloat(num.altripaganti_bus)+
                                    parseFloat(num.altripaganti_persone)+
                                    parseFloat(num.altripaganti_nc))/tot*10000)/100;

                        var vds_t =  Math.round((parseFloat(num.vds_persone)+
                                    parseFloat(num.vds_merci)+
                                    parseFloat(num.vds_bus)+
                                    parseFloat(num.vds_nc))/tot*10000)/100;
                                    
                        var aut_t =  Math.round((parseFloat(num.autorizzati_persone)+
                                    parseFloat(num.autorizzati_merci)+
                                    parseFloat(num.autorizzati_nc)+
                                    parseFloat(num.autorizzati_bus))/tot*10000)/100;                             
                        var delta = 0;
                        if ((eco_t + res_t + alp_t + vds_t + aut_t) != 100) {delta = 100 - (eco_t + res_t + alp_t + vds_t + aut_t)}                        
                        var a = _.pick(num, 'mese', 'vds_merci', 'vds_persone','vds_bus', 'vds_nc'); 
                        a.mese = parseInt(a.mese);  
                        a.transiti = delta + Math.round((parseFloat(a.vds_merci)+parseFloat(a.vds_persone)+parseFloat(a.vds_bus)+parseFloat(a.vds_nc))/tot*10000)/100; 
                        return _.pick(a, 'mese', 'transiti')})
                },
                {
                    key: 'Transiti altri paganti ',
                    color: 'gray', 
                    values: _.map(_.sortBy(nDataSet, 'mese'), function(num) { 
                        var tot = sommaParziale(num)
                        var a = _.pick(num, 'mese', 'altripaganti_merci', 'altripaganti_persone','altripaganti_bus', 'altripaganti_nc'); 
                        a.mese = parseInt(a.mese); 
                        a.transiti = Math.round((parseFloat(a.altripaganti_merci)+parseFloat(a.altripaganti_persone)+parseFloat(a.altripaganti_bus)+parseFloat(a.altripaganti_nc))/tot*10000)/100; 
                        return _.pick(a, 'mese', 'transiti')})
                }

                ];

        return { opzioni : opzioni, dati : dati }
    };



    var GraphReport_5 = function(nDataSet) {

        var diz = nDataSet



        var opzioni = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelSunbeamLayout: false,
                labelThreshold: 0.01,
                //labelSunbeamLayout: false,
                //donut: true,
                showLegend: false,
                tooltip:{ distance: 21, },
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        var dati = [
            {
                key: "% Veicoli Ecologici",
                color: "green",
                y: parseInt(diz.transiti_ecologici)/parseInt(diz.transiti_tot_classi)*100

            },
            {
                key: "% Veicoli di Servizio",
                color: "purple",
                y: parseInt(diz.transiti_vds)/parseInt(diz.transiti_tot_classi)*100
            },
            {
                key: "% Veicoli Autorizzati",
                color: "orange",
                y: parseInt(diz.transiti_autorizzati)/parseInt(diz.transiti_tot_classi)*100
            },
            {
                key: "% Veicoli di Residenti",
                color: "yellow",
                y: parseInt(diz.transiti_residenti)/parseInt(diz.transiti_tot_classi)*100
            },
            {
                key: "% Altri Veicoli Paganti",
                color: "grey",
                y: parseInt(diz.transiti_paganti)/parseInt(diz.transiti_tot_classi)*100
            }
        ];


    return { opzioni : opzioni, dati : dati }
    };

    var GraphReport_6 = function(nDataSet) {

        var diz = nDataSet



        var opzioni = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelSunbeamLayout: false,
                labelThreshold: 0.01,
                //labelSunbeamLayout: false,
                //donut: true,
                showLegend: false,
                tooltip:{ distance: 21, },
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        var dati = [
            {
                key: "% Veicoli Ecologici",
                color: "green",
                y: parseInt(diz.veicoli_ecologici)/parseInt(diz.veicoli_tot_classi)*100

            },
            {
                key: "% Veicoli di Servizio",
                color: "purple",
                y: parseInt(diz.veicoli_vds)/parseInt(diz.veicoli_tot_classi)*100
            },
            {
                key: "% Veicoli Autorizzati",
                color: "orange",
                y: parseInt(diz.veicoli_autorizzati)/parseInt(diz.veicoli_tot_classi)*100
            },
            {
                key: "% Veicoli di Residenti",
                color: "yellow",
                y: parseInt(diz.veicoli_residenti)/parseInt(diz.veicoli_tot_classi)*100
            },
            {
                key: "% Altri Veicoli Paganti",
                color: "grey",
                y: parseInt(diz.veicoli_paganti)/parseInt(diz.veicoli_tot_classi)*100
            }
        ];


    return { opzioni : opzioni, dati : dati }
    };


    var GraphReport_3 = function(nDataSet) {

    var opzioni = {
        chart: {
            //type: 'multiBarChart',
            type: 'multiChart',// 
            height: 450,
            margin : {
                top: 100,
                right: 50,
                bottom: 70,
                left: 150
            },
            reduceXTicks: false,
            //clipEdge: false,
            //staggerLabels: true,
            labelSunbeamLayout: false,
            // false,                
            grouped: false,
            x: function(d){ return d.settimana; },
            y: function(d){ return d.transiti; },
            //useInteractiveGuideline: false,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Settimana',
                rotateLabels: -90,
                tickFormat: function(d){
                    return parseInt(d);
                    //return d
                }
            },
            yAxis: {
                axisLabel: 'Transiti Medi Giornalieri',
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                },
            axisLabelDistance: 7
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };
    var dati = []
    _.each(_.indexBy(nDataSet, 'anno'), function(val_a){
        //console.log(val_a.anno)
        var d = {
                originalKey:''+val_a.anno,
                seriesIndex:0,
                type:"line",
                yAxis:1,
//                tick:false,                
                key: ''+val_a.anno,
                //color: 'rgba(0, 255, 55, 1)',
                values: _.map(_.filter(nDataSet, function(num) { return num.anno == val_a.anno; }), function(num) {
                                 var a = _.pick( num, 'settimana', 'transiti'); 
                                if (parseInt(a.transiti) == '0') { a.transiti=undefined; } 
                                else { a.transiti = parseInt(a.transiti); } a.settimana = parseInt(a.settimana); return _.pick(a, 'settimana', 'transiti')})
        }
        dati.push(d) 
    })
    return { opzioni : opzioni, dati : dati }
    };

    var GraphReport_4 = function(nDataSet) {

    var mesi = ['GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO', 'LUGLIO', 
    'AGOSTO', 'SETTEMBRE', 'OTTOBRE',  'NOVEMBRE', 'DICEMBRE']

    var opzioni = {
        chart: {
            type: 'multiBarChart',
            //type: 'multiChart',// 
            height: 450,
            margin : {
                top: 100,
                right: 50,
                bottom: 100,
                left: 150
            },
            reduceXTicks: false,
            //clipEdge: false,
            //staggerLabels: true,
            labelSunbeamLayout: false,
            // false,                
            grouped: false,
            x: function(d){ return d.mese; },
            y: function(d){ return d.transiti; },
            //useInteractiveGuideline: false,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'mese',
                rotateLabels: -90,
                tickFormat: function(d){
                    return mesi[parseInt(d)-1];
                    //return d
                }
            },
            yAxis: {
                axisLabel: 'Transiti Medi Giornalieri',
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                },
            axisLabelDistance: 7
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };
    var dati = []
    _.each(_.indexBy(nDataSet, 'anno'), function(val_a){
        //console.log(val_a.anno)
        var d = {
                originalKey:''+val_a.anno,
                seriesIndex:0,
                //type:"line",
                yAxis:1,
//                tick:false,                
                key: ''+val_a.anno,
                //color: 'rgba(0, 255, 55, 1)',
                values: _.map(_.filter(nDataSet, function(num) { return num.anno == val_a.anno; }), function(num) {
                                 var a = _.pick( num, 'mese', 'transiti'); 
                                if (parseInt(a.transiti) == '0') { a.transiti=undefined; } 
                                else { a.transiti = parseInt(a.transiti); } a.mese = parseInt(a.mese); return _.pick(a, 'mese', 'transiti')})
        }
        dati.push(d) 
    })
    return { opzioni : opzioni, dati : dati }
    };

    var GraphReport_1 = function(nDataSet) {

    var opzioni = {
        chart: {
            type: 'multiBarChart',
            height: 250,
            margin : {
                top: 100,
                right: 50,
                bottom: 70,
                left: 150
            },
            reduceXTicks: false,
            //clipEdge: false,
            //staggerLabels: true,
            labelSunbeamLayout: false,
            duration: 500,
            //stacked: false,                
            grouped: true,
            x: function(d){ return d.anno; },
            y: function(d){ return d.transiti; },
            //useInteractiveGuideline: false,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Anno',
                rotateLabels: -90,
                tickFormat: function(d){
                    return d;
                    //return d
                }
            },
            yAxis: {
                axisLabel: 'Transiti Medi Giornalieri',
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                },
            axisLabelDistance: 7
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };

    //if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}        
    var dati = [
            {
                key: 'Fasce Area C',
                color: 'rgba(0, 255, 55, 1)',
                values: _.map(nDataSet, function(num) { var a = _.pick( num, 'anno', 'transiti_medi_fasce_areac_sottoperiodo'); a.transiti = parseInt(a.transiti_medi_fasce_areac_sottoperiodo); return _.pick(a, 'anno', 'transiti')})
            },
            {
                key: 'Fasce 07:30 - 19:30',
                color: 'rgba(0, 155, 55, 1)',
                values: _.map(nDataSet, function(num) { var a = _.pick( num, 'anno', 'transiti_medi_730_1930_sottoperiodo'); a.transiti = parseInt(a.transiti_medi_730_1930_sottoperiodo); return _.pick(a, 'anno', 'transiti')})
            }
            ]

    //console.log($scope.data)
    return { opzioni : opzioni, dati : dati }
    };

    var GraphReport_2 = function(nDataSet) {

    var opzioni = {
        chart: {
            type: 'multiBarChart',
            height: 250,
            margin : {
                top: 100,
                right: 50,
                bottom:70,
                left: 150
            },
            reduceXTicks: false,
            //clipEdge: false,
            //staggerLabels: true,
            labelSunbeamLayout: false,
            duration: 500,
            stacked: false,                
            x: function(d){ return d.anno; },
            y: function(d){ return d.transiti; },
            //useInteractiveGuideline: false,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Anno',
                rotateLabels: -90,
                tickFormat: function(d){
                    return d;
                    //return d
                }
            },
            yAxis: {
                axisLabel: 'Transiti Medi Giornalieri',
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                },
            axisLabelDistance: 7
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };

    //if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}        
    var dati = [
            {
                key: 'Fasce Area C',
                color: 'rgba(0, 255, 55, 1)',
                values: _.map(nDataSet, function(num) { var a = _.pick( num, 'anno', 'transiti_fasce_areac_sottoperiodo'); a.transiti = parseInt(a.transiti_fasce_areac_sottoperiodo); return _.pick(a, 'anno', 'transiti')})
            },
            {
                key: 'Fasce 07:30 - 19:30',
                color: 'rgba(0, 155, 55, 1)',
                values: _.map(nDataSet, function(num) { var a = _.pick( num, 'anno', 'transiti_730_1930_sottoperiodo'); a.transiti = parseInt(a.transiti_730_1930_sottoperiodo); return _.pick(a, 'anno', 'transiti')})
            }
            ]

    //console.log($scope.data)
    return { opzioni : opzioni, dati : dati }
    };


    var GraphReport_9 = function(nDataSet) {

        var dizOrario = [{ore: "00:00:00", id: 0}, {ore: "00:30:00", id:1}, {ore: "01:00:00", id:2}, {ore: "01:30:00", id:3}, {ore: "02:00:00", id:4}, {ore: "02:30:00", id:5}, {ore: "03:00:00", id:6}, {ore: "03:30:00", id:7}, {ore: "04:00:00", id:8}, {ore: "04:30:00", id:9}, {ore: "05:00:00", id:10}, {ore: "05:30:00", id:11}, {ore: "06:00:00", id:12}, {ore: "06:30:00", id:13}, {ore: "07:00:00", id:14}, {ore: "07:30:00", id:15}, {ore: "08:00:00", id: 16}, {ore: "08:30:00", id: 17}, {ore: "09:00:00", id: 18}, {ore: "09:30:00", id: 19}, {ore: "10:00:00", id: 20}, {ore: "10:30:00", id: 21}, {ore: "11:00:00", id: 22},   
            {ore: "11:30:00", id: 23}, {ore: "12:00:00", id: 24}, {ore: "12:30:00", id: 25}, {ore: "13:00:00", id: 26}, {ore: "13:30:00", id: 27}, {ore: "14:00:00", id: 28}, {ore: "14:30:00", id: 29}, {ore: "15:00:00", id: 30}, {ore: "15:30:00", id: 31}, {ore: "16:00:00", id: 32}, {ore: "16:30:00", id: 33}, {ore: "17:00:00", id: 34}, {ore: "17:30:00", id: 35}, {ore: "18:00:00", id: 36}, {ore: "18:30:00", id: 37}, {ore: "18:00:00", id: 38}, {ore: "18:30:00", id: 39}, {ore: "19:00:00", id: 40}, {ore: "19:30:00", id: 41}, {ore: "20:00:00", id: 42}, {ore: "20:30:00", id: 43}, {ore: "21:00:00", id: 44}, {ore: "21:30:00", id: 45}, {ore: "22:00:00", id: 46}, {ore: "22:30:00", id: 47}, {ore: "23:00:00", id: 48}, {ore: "23:30:00", id: 49}]

        var fasce_orarie = _.uniq(_.map(dizOrario,  function(num){return num.ore;}))
        
        var convertiOrario = function(id) {
            return (_.find(dizOrario, function(num){ return num.id == id; })).ore
        }

    



        //console.log(_.indexBy(nDataSet, 'periodo'));

        var last = _.where(nDataSet, {periodo:'last365'});
        //var last = _.where(nDataSet, {periodo:'dal2013'});
        //console.log(last)
        var serie = _.uniq(_.pluck(last, 'descr'));

        //console.log(last);
        //console.log(serie);


        var opzioni = {
                chart: {
                    type: 'multiChart',
                    height: 650,
                    margin : {
                        top: 100,
                        right: 100,
                        bottom: 150,
                        left: 80
                    },
                legend: {
                    margin: {   
                        top: 30,
                        right: 0,
                        bottom: 30,
                        left: -200
                        },
                },
                //color: d3.scale.category10().range(),
                useInteractiveGuideline: false,
                showValues: true,
                duration: 500,
                reduceXTicks: false,
                                labelSunbeamLayout: true,
//                x: function(d){ return d.ora; },
//                y: function(d){ return d.transiti; },

                xAxis: {axisLabel: 'Orario',
                    rotateLabels: -90,
                    tickFormat: function(d){
                        return (convertiOrario(d))
                    }
                },
                yAxis1: {   
                                    //stacked: true,

                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    }
                }
            }
        };

        var converti = function(p){
            if (p == "00:00:00") {return 0;}
            if (p == "00:30:00") {return 1;}
            if (p == "01:00:00") {return 2;}
            if (p == "01:30:00") {return 3}
            if (p == "02:00:00") {return 4}
            if (p == "02:30:00") {return 5}
            if (p == "03:00:00") {return 6}
            if (p == "03:30:00") {return 7}
            if (p == "04:00:00") {return 8}
            if (p == "04:30:00") {return 9}
            if (p == "05:00:00") {return 10}
            if (p == "05:30:00") {return 11}
            if (p == "06:00:00") {return 12}
            if (p == "06:30:00") {return 13}
            if (p == "07:00:00") {return 14}
            if (p == "07:30:00") {return 15}
            if (p == "08:00:00") {return 16}
            if (p == "08:30:00") {return 17}
            if (p == "09:00:00") {return 18}
            if (p == "09:30:00") {return 19}
            if (p == "10:00:00") {return 20}
            if (p == "10:30:00") {return 21}
            if (p == "11:00:00") {return 22}    
            if (p == "11:30:00") {return 23}
            if (p == "12:00:00") {return 24}
            if (p == "12:30:00") {return 25}
            if (p == "13:00:00") {return 26}
            if (p == "13:30:00") {return 27}
            if (p == "14:00:00") {return 28}
            if (p == "14:30:00") {return 29}
            if (p == "15:00:00") {return 30}
            if (p == "15:30:00") {return 31}
            if (p == "16:00:00") {return 32}
            if (p == "16:30:00") {return 33}
            if (p == "17:00:00") {return 34}
            if (p == "17:30:00") {return 35}
            if (p == "18:00:00") {return 36}
            if (p == "18:30:00") {return 37}
            if (p == "18:00:00") {return 38}
            if (p == "18:30:00") {return 39}
            if (p == "19:00:00") {return 40}
            if (p == "19:30:00") {return 41}
            if (p == "20:00:00") {return 42}
            if (p == "20:30:00") {return 43;}
            if (p == "21:00:00") {return 44;}
            if (p == "21:30:00") {return 45;}
            if (p == "22:00:00") {return 46;}
            if (p == "22:30:00") {return 47;}
            if (p == "23:00:00") {return 48;}
            if (p == "23:30:00") {return 49;}
            }


        var serie = _.map(serie, function(obj){
            //console.log(obj);
            
//            return obj;
             return   {
                    color: 'rgba('+Math.trunc(Math.random()*255)+', '+Math.trunc(Math.random()*255)+', '+Math.trunc(Math.random()*255)+', 1)',
                    key: obj,
                    originalKey:obj,
                    seriesIndex:1,
                    type:"line",
                    yAxis:1,
                    //area:true,
                    values: _.map(_.where(last, {descr:obj}), function(num) { var a = _.pick( num, 'ora', 'transiti_non_areac', 'transiti_areac'); 


                                                                            var aggrega = function(){
                                                                                if (parseInt(a.transiti_non_areac)== 0) {return parseInt(a.transiti_areac)};
                                                                                return  parseInt(a.transiti_non_areac);};
                                                                            //a.x = a.ora;
                                                                            
                                                                            a.y = aggrega()
                                                                            a.x = converti(a.ora)
                                                                            a.series = 1

                                                                            //console.log(a)

                                                                            return _.pick(a, 'series', 'y', 'x')})
                }

        }

            );
//        console.log(serie)

        //var dati = [_.first(serie),];
        //var dati = serie //_.initial(serie, 34);

        var giorni = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

        var dati = (_.map(giorni,  function(g){
            var gg = g;
            return {tipogiorno: gg, dati: _.compact(_.map(serie, function(obj){if (obj.key.includes(gg)){return obj}})) };
        })
        );

        //console.log(dati);
        

        var dati_tipogiorno = []
        _.each(giorni, function(v){
            _.each(serie, function(o){ 
                //console.log(v)
                if (o.key == v)
                    {
                        //console.log(o)
                        dati_tipogiorno.push(o);
                    }

            })
        });

        //console.log(dati_tipogiorno);

       
        //var dati = serie;
        //console.log(dati)
 
        return { opzioni : opzioni, dati : dati, dati_tipogiorno: dati_tipogiorno,  fasce_orarie: fasce_orarie,  }

};





////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///  FINE GRAPHREPORT //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
    return {
        getReport : getReport, 
        GraphReport_1 : GraphReport_1,
        GraphReport_2 : GraphReport_2,
        GraphReport_3 : GraphReport_3,
        GraphReport_4 : GraphReport_4,
        GraphReport_5 : GraphReport_5,
        GraphReport_6 : GraphReport_6,
        GraphReport_7 : GraphReport_7,
        GraphReport_8 : GraphReport_8,
        GraphReport_9 : GraphReport_9
    };
})
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
.factory("areacappService", function($http, $q) {

    var getBase = function() {
        //console.log('service')
        var deferred = $q.defer();
        var CartVarchiPromise = $http.get('dati/varchi.json')
        var AndamentiAreacLastPromise = $http.get('dati/andamenti_areac_last.json')
        var AndamentiGiornoFunzionamentoPromise = $http.get('dati/andamento_giorno_funzionamenti.json')
        var AndamentoGiornoClassiPromise = $http.get('dati/andamento_giorno_classi.json')
        var AndamentiAreacVarchiPromise = $http.get('dati/andamenti_areac.json')
        var AndamentoOrarioGiornalieroPromise = $http.get('dati/andamento_orairo_2016.json')        
        var CalendarioPromise = $http.get('dati/calendario.json')        
        var AndamentoOrarioUltimoPeriodoPromise = $http.get('dati/andamento_orario_last.json')        
        //var AndamentiVeicoliPromise = $http.get('dati/andamento_veicoli.json')
        $q.all([CartVarchiPromise, 
                AndamentiAreacLastPromise, 
                AndamentiGiornoFunzionamentoPromise, 
                AndamentoGiornoClassiPromise, 
                AndamentiAreacVarchiPromise, 
                AndamentoOrarioGiornalieroPromise, 
                CalendarioPromise,
                AndamentoOrarioUltimoPeriodoPromise
                ])
            .then(function(data){
                //console.log(data)
                var stream = { 'cart_varchi':data[0].data.dati, 
                               'andamenti_areac_last':data[1].data.dati,
                               'andamenti_giorno_funzionamento':data[2].data.dati,
                               'andamento_giorno_classi' : data[3].data.dati,
                               'andamento_giorno_varchi' : data[4].data.dati,
                               'andamento_orario_giornaliero' : data[5].data.dati,
                               'calendario': data[6].data.dati,
                               'andamento_orario_last': data[7].data.dati
                          };
                deferred.resolve(stream);                
            })
            .catch(function(err){
                deferred.resolve(false);
            });
        return deferred.promise;              
    }       
    return {
        getBase : getBase, 
    };
})























.factory("utilsDataSetService", function() {

    var fromId2NomeVarco = function(idVarco, datasetVarchi){
        var out = _.find(datasetVarchi, function(num) { return parseInt(num.id) == idVarco; })
        if (out != undefined ) { return out.nome; }
        return idVarco;
    };


    var ultimoGiornoDisponibile = function(lastDataSet){
        return { 'data' : new Date(lastDataSet[0].giorno), 'stringa' : lastDataSet[0].giorno };
    }


    var giorniAreaC = function(g, funzionamentiGiorni){
        var out = _.filter(funzionamentiGiorni, function(num) { return num.giorno == g; })
        //console.log(out.length)
        if (out.length == 0 ) { return true; }
        return false;
        // aggiungere controllo che sia primo o ultimo del dataset
    }

    var dataseDelGiorno = function(DataSet, giorno){
        var filtraGiorno = function (nDataSet){
            var oggi = _.filter(nDataSet, function(num) { return num.giorno == giorno})
            if ( oggi != undefined ) { return oggi }
            return [] // da sistemare
            }
        var filtraTipoGiorno = function(nDataSet){            
            var oggi = _.filter(nDataSet, function(num) { return num.descr == ( filtraGiorno(DataSet.calendario)[0].descr)    })
            if ( oggi != undefined ) { return oggi }
            return [] // da sistemare
            }
        var r = { oggiVarchi : DataSet.varchi,  
                  oggiFunzionamenti : filtraGiorno(DataSet.funzionamenti), // dizionario singolo
                  oggiAndamentoVarchi : filtraGiorno(DataSet.andamentoPerVarco), // array
                  oggiAndamentoClassi : filtraGiorno(DataSet.andamentoClassi), // dizionario singolo
                  oggiAndamentoOrario : filtraGiorno(DataSet.andamentoOrario), // array 
                  oggiCalendario : filtraGiorno(DataSet.calendario), // array 
                  oggiOrarioUltimoPeriodo: filtraTipoGiorno(DataSet.andamentoOrarioUltimoPeriodo)// il filtra giorno dobrebbe basarsi sull'oggi
                  ///////////
                  //////////////////
              }
        return r
    }


    var dataseDelPeriodo = function(DataSet, g_f, g_i){
        var filtraPeriodo = function (nDataSet){
            var out = _.filter(nDataSet, function(num) { return (num.giorno >  g_i ) && (num.giorno <= g_f ) });
            if ( out != undefined ) { return out }
            return {"Error": "Error"} // da sistemare
            }

        var periodoAndamentoClassi = filtraPeriodo(DataSet.andamentoClassi)
        var periodoAndamentoFunzionamenti = filtraPeriodo(DataSet.funzionamenti)

        return { periodoAndamentoClassi : periodoAndamentoClassi, 
                 periodoAndamentoFunzionamenti : periodoAndamentoFunzionamenti 
             }

    }




    var dataSetGraph = function(DataSetGiorno, DataSetPeriodo){

        var graphOggiFunzionamenti = function (nDataSet){

            if (nDataSet[0] == undefined) { var diz = nDataSet;  }
            else { var diz = nDataSet[0]; }
            
             var opzioni = {
                chart: {
                    type: 'pieChart',
                    height: 200,
                    margin: {"bottom":-200, "top":-50},
                    donut: true,
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: false,
                    showLegend: false,
                    tooltip:{ distance: 21, },
                    pie: {
                        startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                        endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                    },
                    duration: 500
                }
            };

            var dati = [
                                {
                                    key: "Varchi funzionanti",
                                    color: "green",
                                    y: Math.round(parseInt(diz.varchi_funzionanti))

                                },
                                {
                                    key: "Varchi malfunzionanti",
                                    color: "orange",
                                    y: Math.round(parseInt(diz.malfunzionamenti))
                                },
                                {
                                    key: "Varchi guasti",
                                    color: "red",
                                    y: Math.round(parseInt(diz.guasti))
                                }
                            ];
                        

            


        return { opzioni : opzioni, dati : dati }
        }


    var GraphOggiClassiTransiti = function(nDataSet){

        if (nDataSet[0] == undefined) { var diz = nDataSet;  }
        else { var diz = nDataSet[0]; }

        var opzioni = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelSunbeamLayout: false,
                labelThreshold: 0.01,
                //labelSunbeamLayout: false,
                //donut: true,
                showLegend: false,
                tooltip:{ distance: 21, },
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        var dati = [
            {
                key: "% Veicoli Ecologici",
                color: "green",
                y: parseInt(diz.transiti_ecologici)/parseInt(diz.transiti)*100

            },
            {
                key: "% Veicoli di Servizio",
                color: "purple",
                y: parseInt(diz.transiti_vds)/parseInt(diz.transiti)*100
            },
            {
                key: "% Veicoli Autorizzati",
                color: "orange",
                y: parseInt(diz.transiti_autorizzati)/parseInt(diz.transiti)*100
            },
            {
                key: "% Veicoli di Residenti",
                color: "yellow",
                y: parseInt(diz.transiti_residenti)/parseInt(diz.transiti)*100
            },
            {
                key: "% Altri Veicoli Paganti",
                color: "grey",
                y: parseInt(diz.transiti_paganti)/parseInt(diz.transiti)*100
            }
        ];
        return { opzioni : opzioni, dati : dati }

    }


    var GraphOggiClassiVeicoli = function(nDataSet){

        if (nDataSet[0] == undefined) { var diz = nDataSet;  }
        else { var diz = nDataSet[0]; }

        var opzioni = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelSunbeamLayout: false,
                labelThreshold: 0.01,
                //labelSunbeamLayout: false,
                //donut: true,
                tooltip:{ distance: 21, },
                showLegend: false,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        var dati = [
            {
                key: "% Veicoli Ecologici",
                color: "green",
                y: parseInt(diz.veicoli_ecologici)/parseInt(diz.veicoli)*100

            },
            {
                key: "% Veicoli di Servizio",
                color: "purple",
                y: parseInt(diz.veicoli_vds)/parseInt(diz.veicoli)*100
            },
            {
                key: "% Veicoli Autorizzati",
                color: "orange",
                y: parseInt(diz.veicoli_autorizzati)/parseInt(diz.veicoli)*100
            },
            {
                key: "% Veicoli di Residenti",
                color: "yellow",
                y: parseInt(diz.veicoli_residenti)/parseInt(diz.veicoli)*100
            },
            {
                key: "% Altri Veicoli Paganti",
                color: "grey",
                y: parseInt(diz.veicoli_paganti)/parseInt(diz.veicoli)*100
            }
        ];
        return { opzioni : opzioni, dati : dati }

    }




    var GraphOggiAndamentoVarchi = function(nDataSet) {

        var opzioni = {
            chart: {
                type: 'multiBarChart',                
                height: 450,
                margin : {
                    top: 10,
                    right: 10,
                    bottom: 140,
                    left: 80
                },
                reduceXTicks: false,
                //clipEdge: false,
                //staggerLabels: true,
                labelSunbeamLayout: false,
                tooltip:{ distance: 21, },
                showControls: false,
                duration: 500,
                stacked: true,                
                x: function(d){ return d.id_varco; },
                y: function(d){ return d.transiti; },
                //useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Id Varco',
                    rotateLabels: -90,
                    tickFormat: function(d){
                        return fromId2NomeVarco(d, DataSetGiorno.oggiVarchi);
                        //return d
                    }
                },
                yAxis: {
                    axisLabel: 'Transiti Rilevati',
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    },
                axisLabelDistance: 7
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

        //if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}        
        var dati = [
                {
                    key: 'Correzione Stimata',
                    color: 'red',
                    //area: true,
                    values: _.map(nDataSet, function(num) { var a = _.pick( num, 'id_varco', 'transiti_corretti'); a.transiti = parseInt(a.transiti_corretti); return _.pick(a, 'id_varco', 'transiti')})
                },
                {
                    key: 'Transiti Rilevati ',
                    color: 'blue',
                    //area: true,
                    values: _.map(nDataSet, function(num) { var a = _.pick( num, 'id_varco', 'transiti', 'transiti_corretti'); a.transiti = parseInt(a.transiti)-parseInt(a.transiti_corretti); return _.pick(a, 'id_varco', 'transiti')})
                }
                ]

        //console.log($scope.data)
        return { opzioni : opzioni, dati : dati }
    };



    var GraphOggiAndamentoOrario = function(nDataSet) {
        
        var opzioni  = {
            chart: {
                type: 'multiBarChart',
                //type: 'lineChart',
                height: 450,
                margin : {
                    top: 10,
                    right: 10,
                    bottom: 140,
                    left: 80
                },
                reduceXTicks: false,
                //clipEdge: false,
                //staggerLabels: true,
                showControls: false,
                //labelSunbeamLayout: true,
                tooltip:{ distance: 21, },
                duration: 500,
                stacked: true,                
                x: function(d){ return d.ora; },
                y: function(d){ return d.transiti; },
                //useInteractiveGuideline: false,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Fascia Oraria',
                    rotateLabels: -90,
                    tickFormat: function(d){
                        return (d);
                    }
                },
                yAxis: {
                    axisLabel: 'Transiti',
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    },
                axisLabelDistance: 7
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

        //if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}
        var dati = [
                {
                    key: 'Transiti con provvedimento Attivo',
                    color: 'green',
                    //area:true,
                    values: _.map(nDataSet, function(num) { var a = _.pick( num, 'ora', 'transiti_areac'); a.transiti = parseInt(a.transiti_areac); return _.pick(a, 'ora', 'transiti')})
                },
                {
                    key: 'Transiti non durante Area C',
                    color: 'grey',
                    //area:true,
                    values: _.map(nDataSet, function(num) { var a = _.pick( num, 'ora', 'transiti_non_areec'); a.transiti = parseInt(a.transiti_non_areec); return _.pick(a, 'ora', 'transiti')})
                }
                ];

        return { opzioni : opzioni, dati : dati }
    };




//////////////////////////////////////////

    var graphPeriodoTransitiGiorno = function(nDataSet) {

        var opzioni = {
            chart: {
                type: 'multiBarChart',
                //type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 10,
                    right: 40,
                    bottom: 100,
                    left: 40
                },
                reduceXTicks: false,
                focusEnable: true,
                focusHeight: 50,
                focusShowAxisX: true,
                focusShowAxisY: false,
                
                //focusMargin: {...} + ~ -,
                //clipEdge: false,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                labelSunbeamLayout: true,
                tooltip:{ distance: 21, },
                //useInteractiveGuideline: true,                
                x: function(d){ return d.giorno; },
                y: function(d){ return d.transiti; },
                //useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Giorno',
                    rotateLabels: -80,
                    tickFormat: function(d){
                        return (d);
                        //return d3.time.format('%x')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'Transiti Rilevati',
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    },
                //axisLabelDistance: 7
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

        if (nDataSet == undefined){return { opzioni : opzioni, dati : {} }}
        var dati = [
                {
                    key: 'Transiti Autorizzati',
                    color: 'orange',
                    values: _.map(_.sortBy(nDataSet, 'giorno'), function(num) { var a = _.pick( num, 'giorno', 'transiti_autorizzati'); a.transiti = parseInt(a.transiti_autorizzati); return _.pick(a, 'giorno', 'transiti')})
                },
                {
                    key: 'Transiti ecologici ',
                    color: 'green',
                    values: _.map(_.sortBy(nDataSet, 'giorno'), function(num) { var a = _.pick( num, 'giorno', 'transiti_ecologici'); a.transiti = parseInt(a.transiti_ecologici); return _.pick(a, 'giorno', 'transiti')})
                },
                {
                    key: 'Transiti residenti ',
                    color: 'yellow',
                    values: _.map(_.sortBy(nDataSet, 'giorno'), function(num) { var a = _.pick( num, 'giorno', 'transiti_residenti'); a.transiti = parseInt(a.transiti_residenti); return _.pick(a, 'giorno', 'transiti')})
                },
                {
                    key: 'Transiti vds ',
                    color: 'purple',
                    values: _.map(_.sortBy(nDataSet, 'giorno'), function(num) { var a = _.pick( num, 'giorno', 'transiti_vds'); a.transiti = parseInt(a.transiti_vds); return _.pick(a, 'giorno', 'transiti')})
                },
                {
                    key: 'Transiti altri paganti ',
                    color: 'gray',
                    values: _.map(_.sortBy(nDataSet, 'giorno'), function(num) { var a = _.pick( num, 'giorno', 'transiti_paganti'); a.transiti = parseInt(a.transiti_paganti); return _.pick(a, 'giorno', 'transiti')})
                }

                ];

        return { opzioni : opzioni, dati : dati }
    };

    var dizOrario = [{ore: "00:00:00", id: 0}, {ore: "00:30:00", id:1}, {ore: "01:00:00", id:2}, {ore: "01:30:00", id:3}, {ore: "02:00:00", id:4}, {ore: "02:30:00", id:5}, {ore: "03:00:00", id:6}, {ore: "03:30:00", id:7}, {ore: "04:00:00", id:8}, {ore: "04:30:00", id:9}, {ore: "05:00:00", id:10}, {ore: "05:30:00", id:11}, {ore: "06:00:00", id:12}, {ore: "06:30:00", id:13}, {ore: "07:00:00", id:14}, {ore: "07:30:00", id:15}, {ore: "08:00:00", id: 16}, {ore: "08:30:00", id: 17}, {ore: "09:00:00", id: 18}, {ore: "09:30:00", id: 19}, {ore: "10:00:00", id: 20}, {ore: "10:30:00", id: 21}, {ore: "11:00:00", id: 22},   
        {ore: "11:30:00", id: 23}, {ore: "12:00:00", id: 24}, {ore: "12:30:00", id: 25}, {ore: "13:00:00", id: 26}, {ore: "13:30:00", id: 27}, {ore: "14:00:00", id: 28}, {ore: "14:30:00", id: 29}, {ore: "15:00:00", id: 30}, {ore: "15:30:00", id: 31}, {ore: "16:00:00", id: 32}, {ore: "16:30:00", id: 33}, {ore: "17:00:00", id: 34}, {ore: "17:30:00", id: 35}, {ore: "18:00:00", id: 36}, {ore: "18:30:00", id: 37}, {ore: "18:00:00", id: 38}, {ore: "18:30:00", id: 39}, {ore: "19:00:00", id: 40}, {ore: "19:30:00", id: 41}, {ore: "20:00:00", id: 42}, {ore: "20:30:00", id: 43}, {ore: "21:00:00", id: 44}, {ore: "21:30:00", id: 45}, {ore: "22:00:00", id: 46}, {ore: "22:30:00", id: 47}, {ore: "23:00:00", id: 48}, {ore: "23:30:00", id: 49}]
    
    var convertiOrario = function(id) {
        return (_.find(dizOrario, function(num){ return num.id == id; })).ore
    }
  

    var graphMultiTest = function(nDataSet, oggiOrarioUltimoPeriodo, calendario) {

        //console.log(oggiOrarioUltimoPeriodo)

        var opzioni = {
            chart: {
                type: 'multiChart',
                height: 450,
                margin : {
                    top: 100,
                    right: 100,
                    bottom: 100,
                    left: 80
                },

                //color: d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                duration: 500,
                reduceXTicks: false,
                                labelSunbeamLayout: true,
//                x: function(d){ return d.ora; },
//                y: function(d){ return d.transiti; },

                xAxis: {axisLabel: 'Giorno',
                    rotateLabels: -90,
                    tickFormat: function(d){
                        return (convertiOrario(d))
                    }
                },
                yAxis1: {   
                                    //stacked: true,

                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    }
                }
            }
        };

        var converti = function(p){
            if (p == "00:00:00") {return 0;}
            if (p == "00:30:00") {return 1;}
            if (p == "01:00:00") {return 2;}
            if (p == "01:30:00") {return 3}
            if (p == "02:00:00") {return 4}
            if (p == "02:30:00") {return 5}
            if (p == "03:00:00") {return 6}
            if (p == "03:30:00") {return 7}
            if (p == "04:00:00") {return 8}
            if (p == "04:30:00") {return 9}
            if (p == "05:00:00") {return 10}
            if (p == "05:30:00") {return 11}
            if (p == "06:00:00") {return 12}
            if (p == "06:30:00") {return 13}
            if (p == "07:00:00") {return 14}
            if (p == "07:30:00") {return 15}
            if (p == "08:00:00") {return 16}
            if (p == "08:30:00") {return 17}
            if (p == "09:00:00") {return 18}
            if (p == "09:30:00") {return 19}
            if (p == "10:00:00") {return 20}
            if (p == "10:30:00") {return 21}
            if (p == "11:00:00") {return 22}    
            if (p == "11:30:00") {return 23}
            if (p == "12:00:00") {return 24}
            if (p == "12:30:00") {return 25}
            if (p == "13:00:00") {return 26}
            if (p == "13:30:00") {return 27}
            if (p == "14:00:00") {return 28}
            if (p == "14:30:00") {return 29}
            if (p == "15:00:00") {return 30}
            if (p == "15:30:00") {return 31}
            if (p == "16:00:00") {return 32}
            if (p == "16:30:00") {return 33}
            if (p == "17:00:00") {return 34}
            if (p == "17:30:00") {return 35}
            if (p == "18:00:00") {return 36}
            if (p == "18:30:00") {return 37}
            if (p == "18:00:00") {return 38}
            if (p == "18:30:00") {return 39}
            if (p == "19:00:00") {return 40}
            if (p == "19:30:00") {return 41}
            if (p == "20:00:00") {return 42}
            if (p == "20:30:00") {return 43;}
            if (p == "21:00:00") {return 44;}
            if (p == "21:30:00") {return 45;}
            if (p == "22:00:00") {return 46;}
            if (p == "22:30:00") {return 47;}
            if (p == "23:00:00") {return 48;}
            if (p == "23:30:00") {return 49;}
            }

        var dati = [
                {
                    color: 'green',
                    key: 'Stream0', //nome mostrato
                    originalKey:'Fasce Area C',
                    seriesIndex:0,
                    type:"area",
                    yAxis:1,
                    tick:false,
                    //area:true,
                    values: _.map(nDataSet, function(num) { var a = _.pick( num, 'ora', 'transiti_areac'); 
                                                                            var aggrega = function(){
                                                                                if (parseInt(a.transiti_areac) == 0) {return undefined};
                                                                                return  6000;};

                                                                            a.y = aggrega();
//                                                                            console.log(a.y) 

                                                                            //a.y = aggrega()
                                                                            //a.x = a.ora;

                                                                            a.x = (converti(a.ora))
                                                                            //console.log(a.x)
                                                                            return _.pick(a, 'y', 'x')})
                },
                {
                    color: 'red',
                    key: 'Stream1',
                    originalKey:'Andamento Orario',
                    seriesIndex:1,
                    type:"line",
                    yAxis:1,
                    values: _.map(nDataSet, function(num) { var a = _.pick( num, 'ora', 'transiti_non_areec', 'transiti_areac'); 
                                                                            var aggrega = function(){
                                                                                if (parseInt(a.transiti_non_areec)== 0) {return parseInt(a.transiti_areac)};
                                                                                return  parseInt(a.transiti_non_areec);};
                                                                            //a.x = a.ora;
                                                                            
                                                                            a.y = aggrega()
                                                                            a.x = converti(a.ora)

//                                                                            console.log(a)
                                                                            return _.pick(a, 'y', 'x')})
                },
                {
                    color: 'orange',
                    key: 'Stream2',
                    originalKey:'Andamento Medio tipo-giorno',
                    seriesIndex:2,
                    type:"line",
                    yAxis:1,
                    values: _.map(oggiOrarioUltimoPeriodo, function(num) { var a = _.pick( num, 'ora', 'transiti_non_areac', 'transiti_areac'); 
                                                                            var aggrega = function(){
                                                                                if (parseInt(a.transiti_non_areac)== 0) {return parseInt(a.transiti_areac)};
                                                                                return  parseInt(a.transiti_non_areac);};
                                                                            //a.x = a.ora;
                                                                            
                                                                            a.y = aggrega()
                                                                            a.x = converti(a.ora)

//                                                                            console.log(a)
                                                                            return _.pick(a, 'y', 'x')})
                }                
                ];
//console.log(dati)

        function generateData(){
            var testdata = stream_layers(7,10+Math.random()*100,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data.map(function(a){a.y = a.y * (i <= 1 ? -1 : 1); return a})
                };
            });
            

            testdata[0].type = "area"
            testdata[0].yAxis = 1
            testdata[1].type = "area"
            testdata[1].yAxis = 1
            testdata[2].type = "line"
            testdata[2].yAxis = 1
            testdata[3].type = "line"
            testdata[3].yAxis = 2
            testdata[4].type = "bar"
            testdata[4].yAxis = 2
            testdata[5].type = "bar"
            testdata[5].yAxis = 2
            testdata[6].type = "bar"
            testdata[6].yAxis = 2
//console.log(testdata)
            return testdata;
        }


        /* Inspired by Lee Byron's test data generator. */
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }

 
        return { opzioni : opzioni, dati : dati }

};




        //console.log(DataSetGiorno)
        var oggiFunzionamentiVarchi = graphOggiFunzionamenti(DataSetGiorno.oggiFunzionamenti)
        var oggiClassiTransiti = GraphOggiClassiTransiti(DataSetGiorno.oggiAndamentoClassi)
        var oggiClassiVeicoli = GraphOggiClassiVeicoli(DataSetGiorno.oggiAndamentoClassi)
        var oggiAndamentoVarchi = GraphOggiAndamentoVarchi(DataSetGiorno.oggiAndamentoVarchi)
        var oggiAndamentoOrario = GraphOggiAndamentoOrario(DataSetGiorno.oggiAndamentoOrario)
        var periodoAndamentoClassi = graphPeriodoTransitiGiorno(DataSetPeriodo.periodoAndamentoClassi)
/////////////////////////////////////////////////
        var periodoMultiTest = graphMultiTest(DataSetGiorno.oggiAndamentoOrario, DataSetGiorno.oggiOrarioUltimoPeriodo, DataSetGiorno.oggiCalendario)

    
        
        return { oggiFunzionamentiVarchi : oggiFunzionamentiVarchi,
                 oggiClassiTransiti : oggiClassiTransiti,
                 oggiClassiVeicoli : oggiClassiVeicoli,
                 oggiAndamentoVarchi : oggiAndamentoVarchi,
                 oggiAndamentoOrario : oggiAndamentoOrario,
                 periodoAndamentoClassi : periodoAndamentoClassi,
                 periodoMultiTest : periodoMultiTest
             }

    }










       
    return {
        fromId2NomeVarco : fromId2NomeVarco, 
        ultimoGiornoDisponibile : ultimoGiornoDisponibile,
        giorniAreaC : giorniAreaC,
        dataseDelGiorno : dataseDelGiorno,
        dataseDelPeriodo : dataseDelPeriodo,
        dataSetGraph : dataSetGraph
    };
})


