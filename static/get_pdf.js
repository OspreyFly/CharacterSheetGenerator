const makePdfBtn = document.getElementById("accept-pdf");
const charForPdf = document.getElementById("character-pdf");

makePdfBtn.addEventListener('mousedown', function(){
    console.log("Trying to make a PDF");
    axios({
        url: '/makepdf',
        method: 'POST',
        data: { data: charForPdf.value },
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob'
    }).then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'DND5e_CharacterSheet.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }).catch((error) => {
        console.error('Error:', error);
    });    
});