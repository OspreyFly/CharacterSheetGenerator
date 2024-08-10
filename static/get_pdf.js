const makePdfBtn = document.getElementById("accept-pdf");
const charForPdf = document.getElementById("character-pdf");
console.log("1: ",charForPdf.value);


makePdfBtn.addEventListener('mousedown', function() {
    fetch('/makepdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: charForPdf.value })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // Convert the response to a Blob object
    })
    .then(blob => {
        const url = URL.createObjectURL(blob); // Create a URL representing the Blob object
        const blobLink = document.createElement('a');
        blobLink.href = url;
        blobLink.setAttribute('download', 'DND5e_CharacterSheet.pdf');
        document.body.appendChild(blobLink);
        blobLink.click(); // Trigger the download
        document.body.removeChild(blobLink); // Clean up
        URL.revokeObjectURL(url); // Release the memory
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});
