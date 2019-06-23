def main():
    Filename=input("File name?")
    file=open(Filename,"r")
    
    Values=[]
    for i in file:
        Values.append(int(i))
    
    Total=0
    for i in range(len(Values)):
        Total+=Values[i]
    
    Average = Total/len(Values)
    
    print(Average)
        
        
main()