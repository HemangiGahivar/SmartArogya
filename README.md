
# IBM Cloud / Google Cloud / Dialogflow  - Smart Arogya

A best practice for streaming audio from a browser microphone to Dialogflow or Google Cloud STT by using websockets.

Smart Arogya, uses the microphone streaming to GCP from a web application and all the APIs are in IBM Cloud which connects IBM Cloudant

It makes use of the following GCP resources:

* Dialogflow & Knowledge Bases
* Speech to Text
* Text to Speech
* Translate API
* Google Map
* (optionally) App Engine Flex

& IBM resources:

* IBM API Gateway
* IBM Cloud Functions
* IBM Cloudant


In this demo, you can book the doctor appointment with your voice, it will display answers on a screen and synthesize the speech and we are applying the filters in Google Maps as and when the user gives the input. We also support the native languages so that this website can be used for layman too.

![alt text](https://github.com/RajPrabhaShanthaKumar/SmartArogya/blob/master/docs/Use%20case.png "Use Case")

![alt text](https://github.com/RajPrabhaShanthaKumar/SmartArogya/blob/master/docs/Architecture.png "Architecture")

![alt text](https://github.com/RajPrabhaShanthaKumar/SmartArogya/blob/master/docs/Screenshot.png "Screenshot")


# Live demo

A working demo can be found here: [https://witech-women-hackathon.uc.r.appspot.com/](https://witech-women-hackathon.uc.r.appspot.com/)


# Setup Local Environment

## Get a Node.js environment

1. `apt-get install nodejs -y`

1. `apt-get npm`

## Get an Angular environment

1. `sudo npm install -g @angular/cli`

## Clone Repo

1. `git clone https://github.com/RajPrabhaShanthaKumar/SmartArogya`

2. Set the PROJECT_ID variable: export PROJECT_ID=[gcp-project-id]

3. Set the project: `gcloud config set project $PROJECT_ID`

4. Download the service account key.

5. Assign the key to environment var: **GOOGLE_APPLICATION_CREDENTIALS**

 LINUX/MAC
 `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account.json`
 WIN
 `set GOOGLE_APPLICATION_CREDENTIALS=c:\path\to\service_account.json`

6. Login: `gcloud auth login`

7. Open **server/env.txt**, change the environment variables and rename the file to **server/.env**

8. Enable APIs:

 ```
  gcloud services enable \
  appengineflex.googleapis.com \
  containerregistry.googleapis.com \
  cloudbuild.googleapis.com \
  cloudtrace.googleapis.com \
  dialogflow.googleapis.com \
  logging.googleapis.com \
  monitoring.googleapis.com \
  sourcerepo.googleapis.com \
  speech.googleapis.com \
  mediatranslation.googleapis.com \
  texttospeech.googleapis.com \
  translate.googleapis.com
```

9. Build the client-side Angular app:
    
    ```
    cd client && sudo npm install
    npm run-script build
    ```

10. Start the server Typescript app, which is exposed on port 8080:

    ```
    cd ../server && sudo npm install
    npm run-script watch
    ```

3. Browse to http://localhost:8080

## Setup Dialogflow

1. Create a Dialogflow agent at: http://console.dialogflow.com

1. Zip the contents of the *dialogflow* folder, from this repo.

1. Click **settings** > **Import**, and upload the Dialogflow agent zip, you just created.

## Setup IBM Cloudant

Create the below docs in Cloudant. Sample collection has been provided at cloudant folder

1. Doctor

1. Ambulance

1. Labs

1. Pharmacy

1. Appointment
  
## Setup IBM Cloud Functions

1. Create APIs to get all 
    /doc => Doctor
    /ambulance => Ambulance
    /pharma => Pharmacy
    /lab => Labs
    /hospital => Hospitals
    /get-appointment

1. Create a POST API
    /set-appointment

    Update client's environment.prod file with the base url

## Setup IBM API Gateway

Create an API_KEY and update the same in client's environment.prod file. 

# Deploy with App Engine Flex

This demo makes heavy use of websockets and
the microphone `getUserMedia()` HTML5 API requires
to run over HTTPS. Therefore, I deploy this demo
with a custom runtime, so I can include my own **Dockerfile**.

1. Edit the **app.yaml** to tweak the environment variables.
Set the correct Project ID.

1. Deploy with: `gcloud app deploy`

1. Browse: `gcloud app browse`


