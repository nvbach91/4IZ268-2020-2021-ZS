$(function () {
    const $key = '6fc892aab7ec41f0b37bebfea17df91f';
    var curValue;
    var curName;
    var rates;
    var D;
    var letToSave;
    if (localStorage.getItem('selected')) {
        var o = localStorage.getItem('selected');
        $('.leftBlock select option').eq(o).attr('selected', true);
        selectCur($('.leftBlock select'));
    }
    $('.leftBlock select').change(function () {
        selectCur($(this));
    });

    function selectCur(Obj) {
        $('#list > div').hide();
        var i = Obj.find('option:selected').index();
        $(".ExchangeRates").fadeOut();
        if (i < 1) {
            $('.rightBlock').fadeOut();
            return false;
        } else {
            $('.rightBlock').fadeIn();
            curName = Obj.val();
            checkCur();
        }
        $.ajax({
            url: 'https://api.currencyfreaks.com/latest?apikey=' + $key + '&format=json&symbols=' + curName,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $('.rightBlock button').fadeOut();
            },
            success: function (d) {
                letToSave = true;
                D = d.date;
                curValue = (1 / d.rates[curName]).toFixed(3);
                rates = d.rates[curName];
                display(curName, curValue, D, rates);
              if (!document.getElementById(curName)) {
                $('.rightBlock button').fadeIn();
              }
                $('.rightBlock button').click(function (e) {
                    e.stopImmediatePropagation();
                    if (letToSave) {
                        saveCur();
                    }
                        
                    else {
                        alert('Už jste zaznamenal!');
                    }
                        
                    letToSave = false;
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404)
                    alert('Nepodařilo se získat data!');
            }
        });
        localStorage.setItem('selected', i);
    }

    function saveCur() {
        var now = new Date();
        var U = now.getTime();
        var A = [];
        var curObj = {name: curName, val: curValue, date: D, uniq: U};
        var isSavedCurrency = false;
        if (localStorage.getItem('currrency')) {
            A = localStorage.getItem('currrency');
            A = JSON.parse(A);
            for (i = 0; i < A.length; i++) {
                if (A[i]['name'] == curName)
                    isSavedCurrency = true;
            }
        }
        A.push(curObj);
        localStorage.setItem('currrency', JSON.stringify(A));
        if (isSavedCurrency) {
           if (!document.getElementById(curName)) {

           var button=document.createElement('button');
            button.id = curName;
            button.addEventListener('click', display(curName, curValue, D), false);

            /*button.addEventListener("click", function(){
                display(curName , curValue, D, rates);
            });*/
            /*button.onclick = function() {                     
                var node = document.createElement("div");
                var textnode = document.createTextNode(curName + ' ' + curValue + ' ' + D);
                node.appendChild(textnode);
                document.getElementById("list").appendChild(node);
            };*/

            button.appendChild(document.createTextNode(curName));
            document.getElementById("list").appendChild(button);
        }
        } else {
            if (!document.getElementById(curName)) {

            var button=document.createElement('button');
                button.id = curName;
                button.addEventListener('click', display(curName, curValue, D), false);
               /* button.addEventListener("click", function(){
                    display(curName , curValue, D, rates);
                });*/// setAttribute("onclick", "display('" + curName + "','"+ curValue + "','"+ D + "','" + rates + "');");
                /*button.onclick = function() { 
                    var node = document.createElement("div");
                    var textnode = document.createTextNode(curName + ' ' + curValue + ' ' + D);
                    node.appendChild(textnode);
                    document.getElementById("list").appendChild(node);
                 };*/
            button.appendChild(document.createTextNode(curName));
            document.getElementById("list").appendChild(button);
                }
        }
    }

    function checkCur() {
        if (localStorage.getItem('currrency')) {
            var Cur = localStorage.getItem('currrency');
            Cur = JSON.parse(Cur);
            for (i = 0; i < Cur.length; i++) {
                if (!document.getElementById(Cur[i]['name'])) {
            var button=document.createElement('button');
            button.id = Cur[i]['name'];
            var name = Cur[i]['name'];
            var val = Cur[i]['val'];
            var uniq = Cur[i]['uniq'];
            button.addEventListener('click', display(Cur[i]['name'],Cur[i]['val'],Cur[i]['uniq']), false);
            /*button.addEventListener("click", function(){
                display(name, val, uniq);
            });*/// setAttribute("onclick", "display('" + Cur[i]['name'] + "','"+ Cur[i]['val'] + "','"+ Cur[i]['uniq'] + "');");
            /*button.onclick = function() { 
                var node = document.createElement("div");
                var textnode = document.createTextNode(curName + ' ' + curValue + ' ' + D);
                node.appendChild(textnode);
                document.getElementById("list").appendChild(node);
             };*/
        button.appendChild(document.createTextNode(Cur[i]['name']));
        document.getElementById("list").appendChild(button);
            }
            }
        }
    }


    function delCur(Obj) {
        Obj.click(function () {
            var delUniq = $(this).attr('data');
            var Cur = localStorage.getItem('currrency');
            Cur = JSON.parse(Cur);//try catch
            for (i = 0; i < Cur.length; i++) {
                if (Cur[i]['uniq'] == delUniq)
                    Cur.splice(i, 1);
            }
            localStorage.setItem('currrency', JSON.stringify(Cur));
            $(this).closest('tr').remove();
        });
    }



});

function display(curName, curValue, D) {
    $.ajax({
        url: 'https://api.currencyfreaks.com/latest?apikey=6fc892aab7ec41f0b37bebfea17df91f&format=json&symbols=' + curName,
        type: 'get',
        dataType: 'json',
        beforeSend: function () {
            $('.rightBlock button').fadeOut();
        },
        success: function (d) {
            letToSave = true;
            D = d.date;
            curValue = (1 / d.rates[curName]).toFixed(3);
          $(".ExchangeRates").fadeIn();
          $(".ExchangeRates").text('Aktualni kurz na burze 1 ' + curName + ' - ' + curValue + ' USD | 1 USD = ' + d.rates[curName]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404)
                alert('Nepodařilo se získat data!');
        }
    });
}
