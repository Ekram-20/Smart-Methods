
#include <Servo.h>   // library for servo motor

#define SERVO_PIN 10 // The pin will servo attached to it
#define DELAY 10     // delay of motion is 10 ms

Servo servoMotor;    // Servo Object to control the servo motor
int angle = 0;       // The direction of motion
int change = 2;      // how much the angle changes each time through the loop


void setup() {  
  servoMotor.attach(SERVO_PIN);  // attach the servo on pin defined above
  Serial.begin(115200);          // connect arduino with web
}

// make servo move left or right
void moveLeft() { 
  // from 180 to 0
  while (angle > 180) {
    angle -= change;
    servoMotor.write(angle);   
    delay(DELAY);    
  }
}

void moveRight() { 
  // from 0 to 180
  while (angle < 180) {
    angle += change;
    servoMotor.write(angle);   
    delay(DELAY);    
  }
}

void loop() {

  String action = Serial.readStringUntil('@');  // read the action from web
  Serial.println(action);                       // show the type of action
  
  if (action.equals("يمين")) 
    moveRight();
  
  else if (action.equals("يسار")) 
    moveLeft();

  else
    Serial.println("الرجاء اختيار نوع الحركة يمين أو يسار");
}
