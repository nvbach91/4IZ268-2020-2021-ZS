$(document).ready(() => {


  const desktopPdfButton = $("#desktop-pdf");
  const mobilePdfButton = $("#mobile-pdf");
  const inputField = $("#input-field");


  function spaceToUnderscore (text) {
    text = text.replace(" ", "_");
    return text;
  }

  //from https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
  function downloadFile(filePath){
    var link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
}

  $(mobilePdfButton).click(function(){
    let input = inputField.val();
    input = spaceToUnderscore(input);
    downloadFile(`https://en.wikipedia.org/api/rest_v1/page/pdf/${input}/a4/mobile`);
  });

  $(desktopPdfButton).click(function(){
    let input = inputField.val();
    input = spaceToUnderscore(input);
    downloadFile(`https://en.wikipedia.org/api/rest_v1/page/pdf/${input}/a4`);
  });
});

