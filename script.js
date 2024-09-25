document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file);

    // Upload to S3 using the pre-signed URL (or direct upload)
    fetch(`https://veelishaimages.s3.amazonaws.com/${file.name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type  // Set the content type based on the file type
        },
        body: file  // Directly sending the file
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Response from S3 (can be JSON or plain text)
        }
        throw new Error('Upload failed');
    })
    .then(data => {
        console.log('Upload successful:', data);
        document.getElementById('result').innerText = 'Upload successful!';
        // Optionally display results from DynamoDB or Rekognition
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error uploading image.';
    });
});
// Function to get pre-signed URL from the backend
function getPresignedUrl(fileName) {
    return fetch('https://your-api-endpoint/presigned-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_name: fileName })
    }).then(response => response.json());
}

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    // Get pre-signed URL first
    getPresignedUrl(file.name).then(presignedUrl => {
        return fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type  // Set the content type based on the file type
            },
            body: file
        });
    }).then(response => {
        if (response.ok) {
            console.log('Upload successful');
            document.getElementById('result').innerText = 'Upload successful!';
        } else {
            throw new Error('Upload failed');
        }
    }).catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error uploading image.';
    });
});

