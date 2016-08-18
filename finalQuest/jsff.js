$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});
// Прелоадер

$(function(){
    $.getJSON('echo.json', function(data) {
        for(var i=0;i<data.values.length;i++){
            $('#users').append('<tr><td>' + data.values[i].name.v + '</td>' +
                '<td>' + data.values[i].firstName.v + '</td>' +
                '<td>' + data.values[i].birthDate.v + '</td>' +
                '<td><a href="tel:'+ data.values[i].tel.v + '" class="ng-binding">' + data.values[i].tel.v + '</a></td>' +
                '<td><a target="_blank"  href="http://maps.google.com/?q=' + data.values[i].address.v + '">'  + data.values[i].address.v + '</a></td></tr>');
            $('.spc').append('<caption>' + data.values.length + '</caption>')
        }
    });
});

// Формирование таблицы из файла json

function sort(el) {
    var col_sort = el.innerHTML;
    var tr = el.parentNode;
    var table = tr.parentNode;
    var td, arrow, col_sort_num;

    for (var i=0; (td = tr.getElementsByTagName("td").item(i)); i++) {
        if (td.innerHTML == col_sort) {
            col_sort_num = i;
            if (td.prevsort == "y"){
                arrow = td.firstChild;
                el.up = Number(!el.up);
            }else{
                td.prevsort = "y";
                arrow = td.insertBefore(document.createElement("span"),td.firstChild);
                el.up = 0;
            }
            arrow.innerHTML = el.up?"↑ ":"↓ ";
        }else{
            if (td.prevsort == "y"){
                td.prevsort = "n";
                if (td.firstChild) td.removeChild(td.firstChild);
            }
        }
    }

    var a = new Array();

    for(i=1; i < table.rows.length; i++) {
        a[i-1] = new Array();
        a[i-1][0]=table.rows[i].getElementsByTagName("td").item(col_sort_num).innerHTML;
        a[i-1][1]=table.rows[i];
    }

    a.sort();
    if(el.up) a.reverse();

    for(i=0; i < a.length; i++)
        table.appendChild(a[i][1]);
}

//Сортировка элементов таблицы