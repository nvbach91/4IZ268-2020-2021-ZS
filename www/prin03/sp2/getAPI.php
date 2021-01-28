<?php
/* Ziskání data přes API */

function get($Cur){
$key='6fc892aab7ec41f0b37bebfea17df91f';
$Url='https://api.currencyfreaks.com/latest?apikey='.$key;
$C=@file_get_contents($Url);
$C=json_decode($C,true);
$Rate=$C['rates'][$Cur];
$Rate=round(1/$Rate,3);
echo $Rate;
}

function save($Cur,$curValue){
	$file=$Cur.'.txt';
	$С=['Value'=>$curValue,'Date'=>date('j.n.Y, G:i')];
	if(file_exists($file)){
		$F=file_get_contents($file);
		$F=$F."\n".json_encode($С);
		$makeFile=file_put_contents($file,$F);
	}
	else
		$makeFile=file_put_contents($file,json_encode($С));
	if($makeFile){
		$A=file($file);
		$A=array_reverse($A);
		foreach($A as $val){
			$jV=json_decode($val,true);
			$Li=$Li.'<li>'.$jV['Date'].' - '.$jV['Value'].' USD</li>';			
		}
		if(count($A)>1){
			$curV=array();	
			$curD=array();
			foreach($A as $val){
				$jV=json_decode($val,true);
				$curV[]=$jV['Value'];
				$curD[]=strtotime($jV['Date']);
			}
			$curD=implode('@',$curD);
			$curV=implode('@',$curV);
			$img='<img alt="График" src="getAPI.php?getImage=1&x='.$curD.'&y='.$curV.'&t='.time().'" width="666" />';
		}
		if($img)
			echo $img.'~'.$Li;
		else
			echo $Li;
	}
	else
		echo '-1';
}

function checkCur($Cur){
	$file=$Cur.'.txt';
	if(file_exists($file)){
		$A=file($file);
		$A=array_reverse($A);
		foreach($A as $val){
			$jV=json_decode($val,true);
			$Li=$Li.'<li>'.$jV['Date'].' - '.$jV['Value'].' USD</li>';			
		}
		if(count($A)>1){
			$curV=array();	
			$curD=array();
			foreach($A as $val){
				$jV=json_decode($val,true);
				$curV[]=$jV['Value'];
				$curD[]=strtotime($jV['Date']);
			}
			$curD=implode('@',$curD);
			$curV=implode('@',$curV);
			$img='<img alt="График" src="getAPI.php?getImage=1&x='.$curD.'&y='.$curV.'&t='.time().'" width="666" />';
		}
		if($img)
			echo $img.'~'.$Li;
		else
			echo $Li;
	}
	else
		echo -1;
		
}

/*Grafy*/
function makeGraph($X,$Y){

require_once(dirname(__FILE__).'/JPGraph/jpgraph.php');

require_once(dirname(__FILE__).'/JPGraph/jpgraph_line.php');

require_once(dirname(__FILE__).'/JPGraph/jpgraph_date.php');


$ydata=explode('@',$Y);

$xdata=explode('@',$X);



$graph = new Graph(666, 670, 'auto', 10, true);


$graph->SetScale('datlin');
$graph->xaxis->SetLabelAngle(30);


$lineplot = new LinePlot($ydata, $xdata);

$lineplot->SetColor('forestgreen');

$graph->Add($lineplot);

$graph->title->Set('График изменения курса валют');

$graph->xaxis->title->Set('Даты');
$graph->yaxis->title->Set('Курс');

$graph->xaxis->SetColor('#СС0000');
$graph->yaxis->SetColor('#СС0000');

$lineplot->SetWeight(3);

$lineplot->mark->SetType(MARK_FILLEDCIRCLE);

$lineplot->value->Show();

$graph->SetBackgroundGradient('ivory', 'orange');

$graph->SetShadow(4);

$graph->Stroke();	
}

if($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest'){
	if(isset($_GET['currency']))
		get($Cur=$_GET['currency']);
	
	if(isset($_POST['currency']) && isset($_POST['curValue']))
		save($Cur=$_POST['currency'],$curValue=$_POST['curValue']);
		
	if(isset($_GET['checkCur']))
		checkCur($Cur=$_GET['checkCur']);
}

if(isset($_GET['getImage']))
	makeGraph($x=$_GET['x'],$y=$_GET['y']);
?>