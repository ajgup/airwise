import serial
from lib import lib
import pyAesCrypt
from firebase import firebase
import datetime
import time
firebase = firebase.FirebaseApplication('https://airwisedata.firebaseio.com/',None)
threshold = 5000
v = str(input("What COM port? \nENTER 5 OR 6:"))
if (int(v) == 6):
    ser =serial.Serial(port='\\.\COM6', baudrate=9600)
else:
    ser =serial.Serial(port='\\.\COM5', baudrate=9600)

a=open("CO2.txt", 'a')
b = open("TVOC.txt",'a')
c = open("TEMP.txt",'a')
i=0
while (1):
    stamp = str(datetime.datetime.now())
    co2 =str(ser.readline())[2:-5]
    tvoc = str(ser.readline())[2:-5]
    temp = str(ser.readline())[2:-5]
    print("CO2:" +co2)
    print("TVOC:"+tvoc)
    print("TEMP:"+temp)
    if(int(co2) >=400):
        
        firebase.post('/CO2/',data = {
        'Time' : stamp,
        'CO2' : co2})
        firebase.post('/TVOC/', data = {
        'Time': stamp,
        'TVOC': tvoc})
        firebase.post('/TEMP/',data = {
        'Time': stamp,
        'TEMP': temp})
    a.write(co2+ "\n")
    b.write(tvoc+ "\n")
    c.write(temp+ "\n")
    a.flush()
    b.flush()
    c.flush()
    time.sleep(2)

