<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name='robots' content='noindex,nofollow' />
	<!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script><![endif]-->
	<title>API</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<link href="style.css" rel="stylesheet">
	<script type='text/javascript' src='JS/jquery-1.7.1.min.js'></script>	
	<script type='text/javascript' src='JS/js.js'></script>
</head>

<body>

<div class="wrapper">

	<header class="header">
		<div class='leftBlock'>
			<select>
				<option>Vyberte měnu</option>
				<option value='EUR'>Euro</option>
				<option value='CZK'>Česká koruna</option>
				<option value='RUB'>Rubl</option>
				<option value='GBP'>Funt</option>
				<option value='CNY'>Juang</option>
			</select>
			<div class='ExchangeRates'>Aktuální kurz na burze: <span></span></div>
		</div>
		<div class='rightBlock'>
			<button>Udělat zaznam</button>
			<div class='savedCur'>
			<p>Seznam zaznamů</p>
			<ul>				
				<li>...</li>
				<li>...</li>
				<li>...</li>
				<li>...</li>
			</ul>
			</div>
		</div>
	</header><!-- .header-->

	<main class="content">
		<div id='graph'>
			<!--<img src='getAPI.php?getImage=123' />-->
		</div>
		
	</main><!-- .content -->

</div><!-- .wrapper -->
</body>
</html>