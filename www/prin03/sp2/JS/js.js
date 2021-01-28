$(function(){
	var saveData;
	var pH=$('.savedCur p').html();
	var wasChange=false;
	$('.leftBlock select').change(function(){
		var i=$(this).find('option:selected').index();
		if(i>0){
			$('.ExchangeRates').fadeIn();
			$('.ExchangeRates span').html('');
			$('.ExchangeRates span').html(getCur($(this).val()));
			$('.savedCur p').html(pH+' ('+$(this).val()+')');
			$.ajax({
				url: 'getAPI.php',
				type: 'get',
				data: {checkCur:$(this).val()},
				beforeSend: function(){
					$('.savedCur p').addClass('ajax-load_2');	
					$('#graph').addClass('loadGraph');	
				},
				success: function(d){					
					if(d!=-1){
						if(d.indexOf('~')!=-1){
							d=d.split('~',2);
							$('#graph').html(d[0]);
							d=d[1];
						}
						else
							$('#graph img').fadeOut();
						$('.rightBlock .savedCur').show(333);
						$('.rightBlock ul').html(d);
					}
					else {
						$('.rightBlock .savedCur').fadeOut();
						$('#graph img').fadeOut();
					}
					$('.savedCur p').removeClass('ajax-load_2');
					$('#graph').removeClass('loadGraph');						
				}
			});
			$('.rightBlock button').click(function(e){
				e.stopImmediatePropagation();
				save();				
			})	
		}
		else{
			$('.ExchangeRates').fadeOut();
			$('.rightBlock button').fadeOut();
			$('.rightBlock .savedCur').fadeOut();
			$('#graph img').fadeOut();
		}
		wasChange=true;
	});
		function getCur(Cur){
			$.ajax({
			url: 'getAPI.php',
			type: 'get',
			data: {currency:Cur},
			beforeSend: function(){
				$('.ExchangeRates span').addClass('ajax-load');
				$('.rightBlock button').fadeOut();
			},
			success: function(d){
				$('.ExchangeRates span').removeClass('ajax-load').html(d+' USD');
				$('.rightBlock button').fadeIn();
				saveData={currency:Cur, curValue:d};
			}
			});
		}
		function save(){
			if(!wasChange){
				alert('Уже сохранено!');
				return false;
			}
			var B=$('.rightBlock button');
			var H=B.html();
			$.ajax({
				url: 'getAPI.php',
				type: 'post',
				data: saveData,
				beforeSend: function(){
					B.html('Подождите...');
					$('#graph').addClass('loadGraph');
				},
				success: function(d){
					if(d==-1){
						alert('Что-то не так при записи в файл...');
						return false;
					}
					if(d.indexOf('~')!=-1){
						d=d.split('~',2);
						$('#graph').html(d[0]);
						d=d[1];
					}
					$('.rightBlock .savedCur').show(333);
					B.html(H);
					$('.rightBlock ul').html(d);
					wasChange=false;
					$('#graph').removeClass('loadGraph');
				}
			});
		}

	
});