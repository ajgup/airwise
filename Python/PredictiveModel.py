def main():

    filename= (input("File name?"))
    print(filename)
    file = open(filename,"r")

    filter_upperbound = eval(input("Upper bound?"))
    filter_lowerbound = eval(input("Lower bound?"))

    y_intercept = eval(input("Starting point(y-intercept?)"))
    
    Filtering(filter_upperbound,filter_lowerbound,y_intercept,file)

def Filtering(filter_upperbound,filter_lowerbound,y_intercept,file):
    InitialDataPoints=[]
    InitialTimeValues= []

    FilteredDataPoints=[]
    FilteredTimeValues=[]

    for i in file:
        InitialDataPoints.append(int(i))

    for i in range(1,len(InitialDataPoints)+1):
        InitialTimeValues.append(int(i)) 

    for i in range(len(InitialDataPoints)):
        if (InitialDataPoints[i]>filter_lowerbound and InitialDataPoints[i] <=filter_upperbound):
            FilteredDataPoints.append(InitialDataPoints[i])
            FilteredTimeValues.append(InitialTimeValues[i])        
            
    GetError(FilteredDataPoints,FilteredTimeValues,y_intercept)

def GetError(FilteredDataPoints,FilteredTimeValues,y_intercept):
    consecutive_gaps=[]

    for i in range(len(FilteredDataPoints)-1):
        Datapoint_dif = FilteredDataPoints[i+1]-FilteredDataPoints[i]
        Time_dif=FilteredTimeValues[i+1]-FilteredTimeValues[i]
        slope=float(Datapoint_dif/Time_dif)
        consecutive_gaps.append(slope)

    Total = 0
    for i in range(len(consecutive_gaps)):
        Total+=consecutive_gaps[i]

    Average_slope = Total/len(consecutive_gaps)

    TotalError=0

    for i in range(len(FilteredDataPoints)):
        BestFit_approx = (Average_slope * FilteredTimeValues[i]) + y_intercept
        real_point = FilteredDataPoints[i]
        TotalError+=real_point-BestFit_approx

    FinalError = TotalError/len(FilteredDataPoints)

    print(FinalError)

main()


