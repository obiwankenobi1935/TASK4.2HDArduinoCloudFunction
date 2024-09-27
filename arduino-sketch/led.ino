#include <WiFiNINA.h>  // For Arduino Nano 33 IoT WiFi functionality
#include <ArduinoJson.h>  // Firebase uses JSON format for communication
#include <Firebase_Arduino_WiFiNINA.h>  // Firebase library for WiFiNINA boards

// Define pin numbers for the LEDs
const int redPin = 3;
const int greenPin = 4;
const int bluePin = 5;

// Firebase settings
FirebaseData firebaseData;
String firebaseHost = "task210-hd-default-rtdb.firebaseio.com";  // Your Firebase URL
String firebaseAuth = "68MQKzvjULnZJ7TiF8gZyXaFd7Mjox3mZT92AysT";  // Replace with your Firebase Auth Key

// Wi-Fi credentials
char ssid[] = "Airtel_k19vandana";  // Replace with your Wi-Fi SSID
char pass[] = "OmShiv193";  // Replace with your Wi-Fi password

void setup() {
  Serial.begin(9600);

  // Initialize Wi-Fi
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize Firebase
  Firebase.begin(firebaseHost, firebaseAuth, ssid, pass);
  Firebase.reconnectWiFi(true);

  // Set pin modes for the LEDs
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  // Turn off all LEDs initially
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, LOW);
}

void loop() {
  // Fetch the status for each LED from Firebase
  if (Firebase.getInt(firebaseData, "/lights/red")) {  // Getting value for red LED
    int redStatus = firebaseData.intData();
    Serial.print("Red LED value: ");
    Serial.println(redStatus);
    digitalWrite(redPin, redStatus);  // Set the red LED based on the value
  } else {
    Serial.println("Failed to get data for Red LED: " + firebaseData.errorReason());
  }

  if (Firebase.getInt(firebaseData, "/lights/green")) {  // Getting value for green LED
    int greenStatus = firebaseData.intData();
    Serial.print("Green LED value: ");
    Serial.println(greenStatus);
    digitalWrite(greenPin, greenStatus);  // Set the green LED based on the value
  } else {
    Serial.println("Failed to get data for Green LED: " + firebaseData.errorReason());
  }

  if (Firebase.getInt(firebaseData, "/lights/blue")) {  // Getting value for blue LED
    int blueStatus = firebaseData.intData();
    Serial.print("Blue LED value: ");
    Serial.println(blueStatus);
    digitalWrite(bluePin, blueStatus);  // Set the blue LED based on the value
  } else {
    Serial.println("Failed to get data for Blue LED: " + firebaseData.errorReason());
  }

  delay(1000);  // Poll every 1 second
}
