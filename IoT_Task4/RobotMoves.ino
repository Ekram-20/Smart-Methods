#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

char ssid[] = "yourNetworkName";
const char password[] = "yourNetworkPass";

const String SERVER_NAME = "localhost:8000";

String readMove;
String movementReadingsArr[3];

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
      readMove = httpGETRequest();
      Serial.println(readMove);
      JSONVar json = JSON.parse(readMove);

      if (JSON.typeof(json) == "undefined") {
        Serial.println("Parsing input failed!");
        return;
      }

      Serial.println("JSON object = " + json);      
      JSONVar keys = json.keys();

      for (int i = 0; i < keys.length(); i++) {      
        movementReadingsArr[i] = json[keys[i]];
      }

      if(movementReadingsArr[0]["Direction"].equals("forward")){ 
        // go forward
      }
      else if(movementReadingsArr[0]["Direction"].equals("backward")){ 
        // go backword
      }
      else if(movementReadingsArr[0]["Direction"].equals("right")){ 
        // go right
      }
      else if(movementReadingsArr[0]["Direction"].equals("left")){ 
        // go left
      }   
  }
  
  delay(10000); // wait 10 min to send another request
}

String httpGETRequest(e) {
  
  WiFiClient client;
  HTTPClient http; 
 
  http.begin(client, SERVER_NAME); 
  int httpResponseCode = http.GET();
  
  String body = "{}"; 
  
  if (httpResponseCode>0) {    
    body = http.getString();
  }
  else {
    Serial.print("Error code: " + httpResponseCode);   
  }
  
  http.end(); // Free resources
  return body;
}
