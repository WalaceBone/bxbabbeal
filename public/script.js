document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    let fileInput = document.getElementById('file-input');
    let file = fileInput.files[0];  // Get the file from the input

    let formData = new FormData();
    formData.append('file', file);  // Append the file to the form data

    // Use fetch to send the form data to your serverless function
    fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Handle the response from the server
    })
    .catch(error => {
        console.error('Error:', error);  // Handle any errors
    });
});