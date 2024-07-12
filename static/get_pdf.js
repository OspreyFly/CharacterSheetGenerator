const makePdfBtn = document.getElementById("accept-pdf");
const charForPdf = document.getElementById("character-pdf");

makePdfBtn.addEventListener('mousedown', function(){
    axios({
        url: '/makepdf',
        method: 'POST',
        data: { data: charForPdf.value },
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob'
    }).then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const blob = document.createElement('a');
        blob.style.display = 'none';
        blob.href = url;
        blob.download = 'DND5e_CharacterSheet.pdf';
        document.body.appendChild(blob);
        blob.click();
        window.URL.revokeObjectURL(url);
    }).catch((error) => {
        console.error('Error:', error);
    });    
});