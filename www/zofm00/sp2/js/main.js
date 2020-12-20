$('#findName').click(function(){

    var inputName = $('#name').val();
    $('#outputName').text(inputName+' má svátek ');

});

   $('#month').click(function(){ 
       var month = $(this).val();

    if(month==4||month==6||month==9||month==11){
        $('#31').hide();
    }
    });

$('#findDate').click(function(){



    $('#outputDate').text(inputDate+' má svátek ');

});