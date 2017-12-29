import json
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client['survaider']

finalList = []
def read():
    with open('adult.train.txt', 'r') as f:
        for lines in f.readlines():
            linesSplit = lines.split(",")
            if(len(linesSplit) == 15):
                obj = {}
                obj['age']=linesSplit[0].strip(" ")
                obj['workclass']=linesSplit[1].strip(" ")
                obj['fnlwgt']=linesSplit[2].strip(" ")
                obj['education']=linesSplit[3].strip(" ")
                obj['education-num']=linesSplit[4].strip(" ")
                obj['marital-status']=linesSplit[5].strip(" ")
                obj['occupation']=linesSplit[6].strip(" ")
                obj['relationship']=linesSplit[7].strip(" ")
                obj['race']=linesSplit[8].strip(" ")
                obj['sex']=linesSplit[9].strip(" ")
                obj['capital-gain']=linesSplit[10].strip(" ")
                obj['capital-loss']=linesSplit[11].strip(" ")
                obj['hours-per-week']=linesSplit[12].strip(" ")
                obj['native-country']=linesSplit[13].strip(" ")
                obj['incom']=linesSplit[14].strip(" ")
                finalList.append(obj)
        coll = db.adult;
        coll.insert(finalList)
read()
