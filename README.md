# imageupload
Overview :<br>
You will create a web application where users can upload images. The uploaded images will be stored in an Amazon S3 bucket. A Lambda function will be triggered upon the upload to analyze the images using Amazon Rekognition and store the results in a DynamoDB database.<br>
<br>
Step 1 : Set-up the front-end<br>
Create a simple web application with HTML and JavaScript<br>
Create an index.html file and set up a basic HTML form that includes input for file uploads and a button to submit the image. You can also include a div to display the result or status messages. Use the HTML file above<br>
Next, create a script.js file that will handle the file upload process. You’ll need to configure AWS SDK for JavaScript to upload images to your S3 bucket. Use the script file above.<br>
<br>
Step 2 : Set-up the S3 Bucket<br>
Create an S3 bucket where the images will be store.<br>
Configure bucket permissions to allow public access for uploads (if needed) and set up CORS if your front end is hosted on a different domain.<br>
CORS Code in CORS file.<br>
<br>
Step 3 : Set-up the Lambda Function<br>
Create a Lambda function that will be triggered when a new image is uploaded to the S3 bucket.<br>
Attach an IAM role to it, create the IAM role and give it Lambda access.<br>
This function should read the image, analyze it using Amazon Rekognition, and save the results to DynamoDB.<br>
Code in the Lambda Function file.<br>
<br>
Step 4 : Configure S3 Event Notification<br>
Set up an event notification on the S3 bucket to trigger the Lambda function whenever a new image is uploaded.<br>
Navigate to the Properties tab.<br>
Scroll down to the Event Notifications section.<br>
Create a new event notification, Event name: Enter a descriptive name Prefix (optional), Only trigger the function for images in a specific folder. Event types: Select “All object create events”. Destination, Select AWS Lambda Function. Choose the Lambda function you created earlier.<br>
This way the Lambda function will be invoked.<br>
<br>
Step 5 : Set-up Amazon Rekognition<br>
Ensure that the AWS Rekognition service is enabled in your AWS account.<br>
Give the IAM role Full Access to Rekognition.<br>
Ensure that the same IAM role is also attached to the Lambda Function.<br>
<br>
Step 6 : Set-up DynamoDB<br>
If you want to store the analysis results, create a DynamoDB table, and create the Dynamodb table from the import from S3 section in the Dynamodb console.<br>
Table Name: ImageAnalysis.<br>
Partition Key: imageId (or a unique identifier for each image).<br>
Attributes: labels (the labels detected by Rekognition), uploadTime, etc.<br>
<br>
Step 7 : Set-up Amplify for the web app front-end.<br>
To do this you need to create a GitHub repository with the project’s name.<br>
Then on your terminal call the project folder where you stored all the project files together.<br>
Then type the code given below.<br>
git init<br>
git add README.md<br>
git commit -m "first commit"<br>
git remote add origin git@github.com:<your-username>/ai-recipe-generator.git<br>
git branch -M main<br>
git push -u origin main<br>
This will push the files to GitHub and will connect Github to your machine.<br>
Now open a new terminal and type.<br>
npm create amplify@latest -y<br>
This will install amplify packages into your project folder.<br>
Then add again in the terminal write the code given below, which will push all your files to the AWS Amplify.<br>
git add .<br>
git commit -m "installing amplify"<br>
git push origin main<br>
Sign in to the AWS Management console in a new browser window, and open the AWS Amplify console.<br>
Choose Create new app.<br>
On the Start building with Amplify page, for Deploy your app, select GitHub, and select Next.<br>
When prompted, authenticatewith GitHub. You will be automatically redirected back to the Amplify console. Choose the repository and main branch you created earlier. Then select Next.<br>
Leave the default build settings, and select Next.<br>
Review the inputs selected, and choose Save and deploy.<br>
<br>
AWS Amplify will now build your source code and deploy your app at https://...amplifyapp.com, and on every git push your deployment instance will update. It may take up to 5 minutes to deploy your app.<br>
Once the build completes, select the Visit deployed URL button to see your web app up and running live.<br>
Then you get the Output of the final project, where you can see the image is uploaded successfully to the S3 bucket and after triggering the Lambda function it goes into the DynamoDB database.<br>
