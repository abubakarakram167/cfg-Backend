const admin = require('firebase-admin');

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

const credentialsConfig = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": privateKey,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URL,
  "token_uri": process.env.FIREBASE_TOKEN_URL,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
} 


admin.initializeApp({
  credential: admin.credential.cert(credentialsConfig),
  //databaseURL: 'your-database-url-here'
});

const messaging = admin.messaging();

module.exports = {
    messaging,
}