  #include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

const int colorR = 255;
const int colorG = 0;
const int colorB = 0;

#include "SparkFunCCS811.h"

#define CCS811_ADDR 0x5B
//#define CCS811_ADDR 0x5A

CCS811 mySensor(CCS811_ADDR);

const int B = 4275;               
const int R0 = 100000;            
const int pinTempSensor = A0;


void setup()
{
  lcd.begin(16, 2);   
  lcd.setRGB(colorR, colorG, colorB);
  Serial.begin(9600);

  Wire.begin();
  CCS811Core::status returnCode = mySensor.begin();
  if (returnCode != CCS811Core::SENSOR_SUCCESS)
  {
    Serial.println(".begin() returned with an error.");
    while (1);
  }
}

void loop()
{
  if (mySensor.dataAvailable())
  {
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

    if (mySensor.getTVOC() >= 0 && mySensor.getTVOC() <= 325)
      lcd.setRGB(0,255,0);
    else if (mySensor.getTVOC() > 325 && mySensor.getTVOC() <=500)
      lcd.setRGB(255,255,0);
    else 
      lcd.setRGB(255,0,0);
  delay(3000);
  }
  //delay(10);
}
