// make ESP32 connect to the Internet through WiFi 
// to send Http request with some values

#include "WiFi.h"
//#include <HTTPClient.h>
 
char ssid[] = "yourNetworkName";
const char password[] = "yourNetworkPass";

const String SERVER_NAME = "localhost:8000"; 
Sconst HTTPClient client; 
int valueToSend;


void setup() {
 
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  } 
  Serial.println("Connected to the WiFi network");
}
 
void loop() {    
 
  //Check the current connection status
  if ((WiFi.status() != WL_CONNECTED)) { 
    Serial.println("WiFi Disconnected");
  }
  else {
    
    // updata valueToSend depending on its type to send it to server
    
    String url = "http://" + SERVER_NAME + "/" + String(valueToSend);  
    client.begin(url); 
    int httpCode = client.GET();  //Make the request  
    if (httpCode <= 0) //Check for the returning code
        Serial.println("Error on HTTP request");
      
    client.end(); //Free the resources
  }
 
  delay(10000); // wait 10 min to send another request
}
