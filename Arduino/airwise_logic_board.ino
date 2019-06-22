/******************************************************************************
  Read basic CO2 and TVOCs

  Marshall Taylor @ SparkFun Electronics
  Nathan Seidle @ SparkFun Electronics

  April 4, 2017

  https://github.com/sparkfun/CCS811_Air_Quality_Breakout
  https://github.com/sparkfun/SparkFun_CCS811_Arduino_Library

  Read the TVOC and CO2 values from the SparkFun CSS811 breakout board

  This is the simplest example.  It throws away most error information and
  runs at the default 1 sample per second.

  A new sensor requires at 48-burn in. Once burned in a sensor requires
  20 minutes of run in before readings are considered good.

  Hardware Connections (Breakoutboard to Arduino):
  3.3V to 3.3V pin
  GND to GND pin
  SDA to A4
  SCL to A5

  Resources:
  Uses Wire.h for i2c operation

  Development environment specifics:
  Arduino IDE 1.8.1

  This code is released under the [MIT License](http://opensource.org/licenses/MIT).

  Please review the LICENSE.md file included with this example. If you have any questions
  or concerns with licensing, please contact techsupport@sparkfun.com.

  Distributed as-is; no warranty is given.
******************************************************************************/
#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

const int colorR = 255;
const int colorG = 0;
const int colorB = 0;

#include "SparkFunCCS811.h" //Click here to get the library: http://librarymanager/All#SparkFun_CCS811

#define CCS811_ADDR 0x5B //Default I2C Address
//#define CCS811_ADDR 0x5A //Alternate I2C Address

CCS811 mySensor(CCS811_ADDR);

const int B = 4275;               
const int R0 = 100000;            
const int pinTempSensor = A0;


void setup()
{
  lcd.begin(16, 2);
    
  lcd.setRGB(colorR, colorG, colorB);
  Serial.begin(9600);
  
  //output = createWriter("CO2.txt");
  //output2 = createWriter("TVOC.txt");

  Wire.begin(); //Inialize I2C Harware

  //It is recommended to check return status on .begin(), but it is not
  //required.
  CCS811Core::status returnCode = mySensor.begin();
  if (returnCode != CCS811Core::SENSOR_SUCCESS)
  {
    Serial.println(".begin() returned with an error.");
    while (1); //Hang if there was a problem.
  }
}

void loop()
{
  //Check to see if data is ready with .dataAvailable()
  if (mySensor.dataAvailable())
  {
    //If so, have the sensor read and calculate the results.
    //Get them later
    mySensor.readAlgorithmResults();
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("CO2:");
    lcd.print(mySensor.getCO2());
    Serial.println(mySensor.getCO2());
    
    lcd.setCursor(0, 1);
    lcd.print("TVOC:");
    lcd.print(mySensor.getTVOC());
    Serial.println(mySensor.getTVOC());
       
    int a = analogRead(pinTempSensor);
    float R = 1023.0/a-1.0;
    R = R0*R;
    float temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15;
    
    lcd.setCursor(9, 1);
    lcd.print("T:");
    lcd.print(temperature);
    Serial.println(temperature);

    if (mySensor.getCO2() > 250 && mySensor.getCO2() <= 1000)
      lcd.setRGB(0,255,0);
    else if (mySensor.getCO2() > 1000 && mySensor.getCO2() <=5000)
      lcd.setRGB(255,255,0);
    else 
      lcd.setRGB(255,0,0);
  delay(500);
  }

  delay(10); //Don't spam the I2C bus
  //lcd.println("");
}
