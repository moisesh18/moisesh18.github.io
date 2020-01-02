console.log("Injected");

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
