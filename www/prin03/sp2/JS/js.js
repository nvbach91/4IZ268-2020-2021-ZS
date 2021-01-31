$(function(){
	const $key='6fc892aab7ec41f0b37bebfea17df91f';
	var curValue;
	var curName;
	var D;
	var letToSave;
	const Table=$('.forTable table');
	if(localStorage.getItem('selected')){
		var o=localStorage.getItem('selected');
		$('.leftBlock select option').eq(o).attr('selected',true);
		selectCur($('.leftBlock select'));
	}
	$('.leftBlock select').change(function(){
		selectCur($(this));
	});	
	/*функция для обработки выбора валюты*/
	function selectCur(Obj){
		var i=Obj.find('option:selected').index();
		if(i<1){
			$('.rightBlock').fadeOut();
			$('.ExchangeRates').fadeOut();
			return false;
		}
		else{
			$('.rightBlock').fadeIn();
			$('.ExchangeRates').fadeIn();			
			curName=Obj.val();
			checkCur();
		}
		$.ajax({
			url: 'https://api.currencyfreaks.com/latest?apikey='+$key+'&format=xml&symbols='+curName,
			type: 'get',
			dataType: 'xml',
			beforeSend: function(){
				$('.ExchangeRates span').addClass('ajax-load');
				$('.rightBlock button').fadeOut();
			},
			success: function(d){
				letToSave=true;
				curValue=$(d).find('rates').children().html();
				curValue=(1/curValue).toFixed(3);
				D=$(d).find('date').html();
				$('.ExchangeRates span').html(curValue).parent().fadeIn();
				$('.ExchangeRates span').removeClass('ajax-load');				
				$('.rightBlock button').fadeIn();
				$('.rightBlock button').click(function(e){
					e.stopImmediatePropagation();
					if(letToSave)
						saveCur();
					else
						alert('Už jste zaznamenal!');
					letToSave=false;					
				});				
			},
			error: function(jqXHR,textStatus,errorThrown){
				if(jqXHR.status==404)
					alert('Nepodařilo se získat data!');
			}
		});
		localStorage.setItem('selected',i);
	}
	/*фунция для сохранения значения*/
	function saveCur(){	
		var now = new Date();
		var U=now.getTime();
		var A=[];
		var curObj={name:curName,val:curValue,date:D,uniq:U};
		var isSavedCurrency=false;
		if(localStorage.getItem('currrency')){
			A=localStorage.getItem('currrency');
			A=JSON.parse(A);
			for(i=0;i<A.length;i++){
				if(A[i]['name']==curName)
					isSavedCurrency=true;
			}
		}
		A.push(curObj);
		localStorage.setItem('currrency',JSON.stringify(A));
		if(isSavedCurrency)
			Table.find('tbody').append('<tr><td>'+curName+'</td><td>'+curValue+'</td><td>'+D+'</td><td><span data="'+U+'" title="Smazat záznam">Удалить</span></td></tr>');
		else
			Table.find('tbody').html('<tr><td>'+curName+'</td><td>'+curValue+'</td><td>'+D+'</td><td><span data="'+U+'" title="Smazat záznam">Удалить</span></td></tr>');
		$('.forTable').fadeIn();
		delCur(Table.find('span'));
	}


	function checkCur(){
		if(localStorage.getItem('currrency')){
			var Cur=localStorage.getItem('currrency');
			Cur=JSON.parse(Cur);						//получили из строки массив объектов
			var T='';	//тут будем хранить строки таблицы
			for(i=0;i<Cur.length;i++){
				if(Cur[i]['name']==curName)	//если в сохранениях есть выбранная валюта
					T=T+'<tr><td>'+curName+'</td><td>'+Cur[i]['val']+'</td><td>'+Cur[i]['date']+'</td><td><span data="'+Cur[i]['uniq']+'" title="Smazat záznam">Smazat</span></td></tr>';
			}
			if(T){
				Table.find('tbody').html(T);	//создали таблицу из сохранений для текущей валюты..
				$('.forTable').fadeIn();		//..и показали её
			}
			else
				$('.forTable').fadeOut();		//если для данной валюты сохранений нет - скроем таблицу
		}
		delCur(Table.find('span'));		//вызов обработки кликов на удаление
	}



	function delCur(Obj){
		Obj.click(function(){
			//var delName=$(this).closest('tr').find('td:first').html();	//není nutné
			//alert($(this).closest('tr').index());
			var delUniq=$(this).attr('data');
			var Cur=localStorage.getItem('currrency');
			Cur=JSON.parse(Cur);
			for(i=0;i<Cur.length;i++){
				if(Cur[i]['uniq']==delUniq)
					Cur.splice(i,1);
			}
			localStorage.setItem('currrency',JSON.stringify(Cur));
			$(this).closest('tr').remove();
			if(Table.find('tbody').find('tr').size()<1)
				$('.forTable').fadeOut();
		});		
	}
	

	//doubleclick v libovolném místě - pro test, není nutné
	/*$('body').dblclick(function(){
		localStorage.clear();
	});
	*/
	
	
	
});