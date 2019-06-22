import serial
from lib import lib
import pyAesCrypt
from firebase import firebase
import datetime

firebase = firebase.FirebaseApplication('https://airwisedata.firebaseio.com/',None)
threshold = 5000
ser =serial.Serial(port='\\.\COM5', baudrate=9600)
##sms = lib.utils.sms["@1.0.11"]

a=open("CO2.txt", 'a')
b = open("TVOC.txt",'a')
c = open("TEMP.txt",'a')

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
##    if(c02 > threshold):
##        pyAesCrypt.decryptFile("top secret.txt.aes", "top secret.txt", "big oof security", bufferSize)
##        read = open("top secret.txt", 'r')
##        for i in read:
##            
##            result = sms(
##      to=i, # (required)
##      body="Hello. This is a public CO2 concentration warning triggered at your area: Waterloo. Level reached:"+ co2+"ppm. Please exercise extra caution when going outdoors. \nThanks, \nAirWize" # (required)
##)
##        pyAesCrypt.encryptFile("top secret.txt.aes", "top secret.txt", "big oof security", bufferSize)

        
