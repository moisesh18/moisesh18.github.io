/*
	Kailash Nadh (http://nadh.in)

	localStorageDB v 2.3.2
	A simple database layer for localStorage

	v 2.3.2 Mar 2018 Contribution: Ken Kohler
	v 2.3.1 Mar 2015
	v 2.3 Feb 2014 Contribution: Christian Kellner (http://orange-coding.net)
	v 2.2 Jan 2014 Contribution: Andy Hawkins (http://a904guy.com) 
	v 2.1 Nov 2013
	v 2.0 June 2013
	v 1.9 Nov 2012

	License	:	MIT License
*/

!function(t,e){function n(t,n){var r,a="db_"+t,i=!1,o=null;try{r=n===sessionStorage?sessionStorage:localStorage}catch(t){r=n}function f(t){!function(t,e){try{r.setItem(t,e)}catch(t){return!1}}(a,t)}function u(t){return!!o.tables[t]}function l(t){u(t)||m("The table '"+t+"' does not exist")}function s(t,e,n){if(o.tables[t].fields=o.tables[t].fields.concat(e),void 0!==n)for(var r in o.data[t])if(o.data[t].hasOwnProperty(r))for(var a in e)o.data[t][r][e[a]]="object"==typeof n?n[e[a]]:n}function c(t,e){return e.ID=o.tables[t].auto_increment,o.data[t][o.tables[t].auto_increment]=e,o.tables[t].auto_increment++,e.ID}function d(t,e){return function(n,r){var a="string"==typeof n[t]?n[t].toLowerCase():n[t],i="string"==typeof r[t]?r[t].toLowerCase():r[t];return"DESC"===e?a===i?0:a<i?1:-1:a===i?0:a>i?1:-1}}function h(t,e){var n=[],r=!1,a=null;for(var i in o.data[t])if(o.data[t].hasOwnProperty(i)){for(var f in a=o.data[t][i],r=!0,e)if(e.hasOwnProperty(f))if("string"==typeof e[f]){if(null===a[f]||a[f].toString().toLowerCase()!==e[f].toString().toLowerCase()){r=!1;break}}else if(a[f]!==e[f]){r=!1;break}r&&n.push(i)}return n}function p(t,e){var n=[];for(var r in o.data[t])o.data[t].hasOwnProperty(r)&&!0===e(g(o.data[t][r]))&&n.push(r);return n}function v(t){var e=[];for(var n in o.data[t])o.data[t].hasOwnProperty(n)&&e.push(n);return e}function y(t,e,n){for(var r="",a=0,i=0;i<e.length;i++){r=e[i];var f=n(g(o.data[t][r]));if(f){delete f.ID;var u=o.data[t][r];for(var l in f)f.hasOwnProperty(l)&&(u[l]=f[l]);o.data[t][r]=O(t,u),a++}}return a}function b(){try{return r.setItem(a,JSON.stringify(o)),!0}catch(t){return!1}}function m(t){throw new Error(t)}function g(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function w(t){return!t.toString().match(/[^a-z_0-9]/gi)}function O(t,e){var n="",r={};for(n in e){-1===o.tables[t].fields.indexOf(n)&&m("Invalid query parameter: "+n),r[n]=e[n]}return r}function P(t,n){for(var r="",a={},i=0;i<o.tables[t].fields.length;i++)a[r=o.tables[t].fields[i]]=null===n[r]||n[r]===e?null:n[r];return a}return(o=r[a])&&(o=JSON.parse(o))&&o.tables&&o.data||(w(t)?(o={tables:{},data:{}},b(),i=!0):m("The name '"+t+"' contains invalid characters")),{commit:function(){return b()},isNew:function(){return i},drop:function(){r.hasOwnProperty(a)&&delete r[a],o=null},getItem:function(t){return function(t){try{return r.storage[t]}catch(t){return null}}(t)},replace:function(t){f(t)},serialize:function(){return JSON.stringify(o)},tableExists:function(t){return u(t)},tableFields:function(t){return function(t){return o.tables[t].fields}(t)},tableCount:function(){return function(){var t=0;for(var e in o.tables)o.tables.hasOwnProperty(e)&&t++;return t}()},columnExists:function(t,e){return function(t,e){var n=!1,r=o.tables[t].fields;for(var a in r)if(r[a]===e){n=!0;break}return n}(t,e)},createTable:function(t,e){var n=!1;if(w(t))if(this.tableExists(t))m("The table name '"+t+"' already exists.");else{var r,a=!0;for(r=0;r<e.length;r++)if(!w(e[r])){a=!1;break}if(a){var i={};for(r=0;r<e.length;r++)i[e[r]]=!0;for(var f in delete i.ID,e=["ID"],i)i.hasOwnProperty(f)&&e.push(f);!function(t,e){o.tables[t]={fields:e,auto_increment:1},o.data[t]={}}(t,e),n=!0}else m("One or more field names in the table definition contains invalid characters")}else m("The database name '"+t+"' contains invalid characters.");return n},createTableWithData:function(t,e){("object"!=typeof e||!e.length||e.length<1)&&m("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]");var n=Object.keys(e[0]);if(this.createTable(t,n)){this.commit();for(var r=0;r<e.length;r++)c(t,e[r])||m("Failed to insert record: ["+JSON.stringify(e[r])+"]");this.commit()}return!0},dropTable:function(t){l(t),function(t){delete o.tables[t],delete o.data[t]}(t)},truncate:function(t){l(t),function(t){o.tables[t].auto_increment=1,o.data[t]={}}(t)},alterTable:function(t,e,n){var r=!1;if(w(t)){if("object"==typeof e){var a,i=!0;for(a=0;a<e.length;a++)if(!w(e[a])){i=!1;break}if(i){var o={};for(a=0;a<e.length;a++)o[e[a]]=!0;for(var f in delete o.ID,e=[],o)o.hasOwnProperty(f)&&e.push(f);s(t,e,n),r=!0}else m("One or more field names in the table definition contains invalid characters")}else if("string"==typeof e)if(w(e)){var u=[];u.push(e),s(t,u,n),r=!0}else m("One or more field names in the table definition contains invalid characters")}else m("The database name '"+t+"' contains invalid characters");return r},rowCount:function(t){return l(t),function(t){var e=0;for(var n in o.data[t])o.data[t].hasOwnProperty(n)&&e++;return e}(t)},insert:function(t,e){return l(t),c(t,P(t,e))},insertOrUpdate:function(t,e,n){l(t);var r=[];if(e?"object"==typeof e?r=h(t,O(t,e)):"function"==typeof e&&(r=p(t,e)):r=v(t),0===r.length)return c(t,P(t,n));var a=[];return y(t,r,function(t){return a.push(t.ID),n}),a},update:function(t,e,n){l(t);var r=[];return e?"object"==typeof e?r=h(t,O(t,e)):"function"==typeof e&&(r=p(t,e)):r=v(t),y(t,r,n)},query:function(t,n,r,a,i,f){l(t);var u=[];return n?"object"==typeof n?u=h(t,O(t,n)):"function"==typeof n&&(u=p(t,n)):u=v(t),function(t,n,r,a,i,f){var u,l=null,s=[],c=null;for(u=0;u<n.length;u++)l=n[u],c=o.data[t][l],s.push(g(c));if(i&&i instanceof Array)for(u=0;u<i.length;u++)s.sort(d(i[u][0],i[u].length>1?i[u][1]:null));if(f&&f instanceof Array){for(var h=0;h<f.length;h++){var p={},v=f[h];for(u=0;u<s.length;u++)s[u]!==e&&(s[u].hasOwnProperty(v)&&p.hasOwnProperty(s[u][v])?delete s[u]:p[s[u][v]]=1)}var y=[];for(u=0;u<s.length;u++)s[u]!==e&&y.push(s[u]);s=y}return a=a&&"number"==typeof a?a:null,(r=r&&"number"==typeof r?r:null)&&a?s=s.slice(r,r+a):r?s=s.slice(r):a&&(s=s.slice(r,a)),s}(t,u,a,r,i,f)},queryAll:function(t,e){return e?this.query(t,e.hasOwnProperty("query")?e.query:null,e.hasOwnProperty("limit")?e.limit:null,e.hasOwnProperty("start")?e.start:null,e.hasOwnProperty("sort")?e.sort:null,e.hasOwnProperty("distinct")?e.distinct:null):this.query(t)},deleteRows:function(t,e){l(t);var n=[];return e?"object"==typeof e?n=h(t,O(t,e)):"function"==typeof e&&(n=p(t,e)):n=v(t),function(t,e){for(var n=0;n<e.length;n++)o.data[t].hasOwnProperty(e[n])&&delete o.data[t][e[n]];return e.length}(t,n)}}}"undefined"!=typeof module&&module.exports?module.exports=n:"function"==typeof define&&define.amd?define(function(){return n}):t.localStorageDB=n}("undefined"!=typeof window?window:this);

alert("Injeccion cargada");

var columns = [ //no espacios
    "ID"
    , "producto"
    , "precio"
    , "rfc"
    , "procesado"
    , "facturado"
]

var databaseName = "didec";
var tableName = "facturas";

$(document).ready(function(){
    var mainDiv = $("."+databaseName+tableName);
    db = new localStorageDB(databaseName, localStorage);
    
    if (mainDiv.length){
        $.each(columns, function(i, item){
            var type = 'text'
            if (['ID', 'procesado', 'facturado'].includes(item)) type = 'hidden';
            if (!(type == 'hidden')){
                mainDiv.append($('<p>').text(item));
            }
            mainDiv.append($('<input>').attr('id',item).attr('name', item).attr('type', type));
        });
        mainDiv.append('<br> <br>')
        mainDiv.append($('<button>').attr('id', 'insert').text("Insertar"))
        mainDiv.append($('<button>').text("Exportar").attr('id', 'export'));
        mainDiv.append($('<button>').text("Importar").attr('id', 'import'));
        var clipboard = new ClipboardJS('#export');
    }

    var table = $('<table>').attr("id", tableName).html($('<thead><tbody>')); //, <tbody>
    $("body").append(table);
    $('#'+tableName + ' thead').append($('<tr>').append(generateTableHeaders(columns)));
    
    if (!db.tableExists(tableName))
    {
        db.createTable(tableName, columns);
    } else {
        var actualColumns = db.tableFields(tableName);
        var actualColumns = columns.filter(function(value, index, arr){
            return !columns.includes(value);
        });
        db.alterTable(tableName, actualColumns);
        var rows = db.queryAll(tableName);
        insertHTMLrow(rows);
    }
    
    //Facturador
    window.getInvoice = function getInvoice(){
        return db.queryAll(tableName, {
            query: {procesado: "", facturado: ""}
            , limit: 1
        });
    }

    window.setInvoice = function setInvoice(id){
        db.update(tableName, {ID: id}, function(row) {
            row.procesado = "1";
            row.facturado = (row.procesado == '1') ? "1" : '';
            return row;
        });
        db.commit();
        var rows = db.queryAll(tableName);
        insertHTMLrow(rows, true);
    }


    //CRUD
    $('#insert').click(function(e){
        e.preventDefault();
        var row = Object();
        row[0] = mainDiv.serializeArray().reduce(function(a, x) { a[x.name] = String(x.value); return a; }, {});
        var id = db.insert(tableName, row[0]);
        db.commit();
        row[0]["ID"] = id;
        insertHTMLrow(row, true);
    });

    $('#export').click(function(e){
        e.preventDefault();
        $(this).attr("data-clipboard-text", JSON.stringify(db.queryAll(tableName)));
        alert("Copiado jefa");
    });

    $('#import').click(function(e){
        e.preventDefault();
        var json = prompt("Pega el texto", "{}");
        var rows = JSON.parse(json);
        if ($.isEmptyObject({rows})){
            insertHTMLrow(rows);
            $.each(rows, function (i, item){
                db.insertOrUpdate(tableName, null, item);
            });
            db.commit();
        }
    });


    //Helpers functions
    function insertHTMLrow(data, deleteActualRows){
        if(deleteActualRows){
            $("#"+tableName+ " tbody tr").remove();
        }
        $.each(data, function( index, value ) {
            var rowContent = $("<tr>");
            $.each(columns, function(i, item){
                $("<td>").text(data[index][item]).appendTo(rowContent);
            });
            $("<a>").attr('href', '#').attr('onClick','deleteRow(this); return false;').text("Eliminar").appendTo(rowContent);
    
            $("#" + tableName).append(rowContent);
        });  
        mainDiv.trigger("reset");
    }
    
    window.deleteRow = function deleteRow(elem) {
        var textContainer =  elem.parentNode.firstChild;
        var textValue = $(textContainer).text();
        db.deleteRows(tableName, {ID: String(textValue)});
        db.commit();
        elem.parentNode.remove();
    }
    
    function generateTableHeaders(myColumns){
        var headers = '';
        $.each(myColumns, function(i, item){
            headers += $("<th>").text(item).prop('outerHTML');
        });
        return headers;
    }
});  
