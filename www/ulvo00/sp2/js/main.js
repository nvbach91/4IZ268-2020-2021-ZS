const App = {};
const apiKey = '189ee7df2eaf496195d36cc3d619c11b';
const filterMenuTitle = $('#filter-menu-title');

$(() => {
    $("#date-from").datepicker();
});

$(() => {
    $("#date-to").datepicker();
});

$(document).ready(() => {
    $('#filter-menu').hide();
});

filterMenuTitle.click(() => {
    $('#filter-menu').toggle("blind");
});

/*
TO DO:
-> hlavní logika volání API s články (výběr inputů z formulářů, logika volání, zpracování příchozích dat v JSON a vytvoření článků, stránkování)
-> logika volání API pro počasí (umožnění geolokace, logika volání aktuálního počasí v daném místě, zpracování příchozích dat, zobrazení dat v containeru)
*/