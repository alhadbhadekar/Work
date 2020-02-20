"""
Creating Python API to handle bank transactins
Developed usign Python, MongoDB, Docket, Rest API and AWS
"""
#Import Libraries
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from pymongo import MongoClient
import bcrypt

app=Flask(__name__)
api = Api(app) #Initializa this app to be an API

#Connecting to mongoDB db over port 27017
client = MongoClient("mongodb://db:27017")
db = client.BankAPI #Create a DB by name bank API
users = db["Users"] #Create a collection by name Users

#Function to check if username exists
def UserExists(username):
    #Check in MongoDB Database if username exists
    if users.find({"Username":username}).count() == 0:
        return False
    else:
        return True

#Class to Register new users
class Register(Resource):
    def post(self):
        #Get posted Data
        postedData = request.get_json()

        #Getting username and password
        username = postedData["username"]
        password = postedData["password"]

        #If user does not exist, return 301
        if UserExists(username):
            retJson = {
                "status": "301",
                "msg": "Invalid Username/ User exixts"
            }
            return jsonify(retJson)

        #hash password using bcrypt before storing to database
        hashed_pw = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

        #Insert in MongoDB
        users.insert({
            "Username": username,
            "Password": hashed_pw,
            "Own": 0,
            "Debt": 0
        })

        #Creatr and reture json that you have scuuessfully created new user
        retJson = {
            "status": 200,
            "msg" : "You successfully signed up for the API"
        }
        return jsonify(retJson)

#Helper functions

#Funciton to verify password
def verifyPw(username, password):
    #Check if user exists
    if not UserExists(username):
        return False

    #Get hashed_pw from database and check if password is correct
    hashed_pw = users.find({
        "Username":username
    })[0]["Password"]

    #Check if password is correct
    if bcrypt.hashpw(password.encode('utf8'), hashed_pw) == hashed_pw:
        return True
    else:
        return False

#Function to check cash with user
def cashWithUser(username):
    #Query User DB to get user cash
    cash = users.find({
        "Username": username
    })[0]["Own"]
    return cash

#Function to check user debt
def debtWithUser(username):
    #Query User DB to get user debt
    debt= users.find({
        "Username": username
    })[0]["Debt"]
    return debt

#Fucntion to generate return json message
def generateReturnDictionary(status, msg):
    retJson = {
        "status": status,
        "msg" : msg
    }
    return retJson

# ErrorDictonary (status 303, message), True/False

#Function to verify credentialss
def verifyCredentials(username, password):
    #Check if username exists
    if not UserExists(username):
        return generateReturnDictionary(301, "Invailid Username"), True

    correct_pw = verifyPw(username, password)

    #Check if password is correct
    if not correct_pw:
        return generateReturnDictionary(302, "Incorrect Password"), True
    return None, False

#Function to update user account balance
def updateAccount(username, balance):
    #Query to update
    users.update({
        "Username" : username
    },{
        "$set":{
            "Own": balance
        }
    })

#Function to update user debt
def updateDebt(username, balance):
    #Query to update
    users.update({
        "Username": username
    },{
        "$set":{
            "Debt": balance
        }
    })

#Class to Add money to account
class Add(Resource):
    def post(self):
        #Get posted Data
        postedData = request.get_json()

        #Getting username and password and money
        username = postedData["username"]
        password = postedData["password"]
        money = postedData["amount"]

        #Verify user credentials and return json if error or money < 0
        retJson, error = verifyCredentials(username, password)
        if error:
            return jsonify(retJson)
        if money <= 0:
            return jsonify(generateReturnDictionary(304, "The amount entered must be greater than 0"))


        cash = cashWithUser(username)
        money-=1 #Charge 1$ for each transaction
        bank_cash = cashWithUser("BANK")

        #Update useraccount and bank account
        updateAccount("BANK", bank_cash + 1)
        updateAccount("username", cash + money)

        #Return json with 200 and result
        return jsonify(generateReturnDictionary(200, "Amount added successfully to the Account"))

#Class to transfer money
class Transfer(Resource):
    def post(self):
        #Get posted Data
        postedData = request.get_json()

        #Getting username, password, to ==> persn whom you want to  send money to, money
        username = postedData["username"]
        password = postedData["password"]
        to = postedData["to"]
        money = postedData["amount"]

        #Verify user credentials and return json if error
        retJson, error = verifyCredentials(username, password)

        if error:
            return jsonify(retJson)

        #Verify cash with user and send 304 in cash cash <=0
        cash = cashWithUser(username)
        if cash <=0:
            return jsonify(generateReturnDictionary(304, "You're are out of money"))

        #Verify if to user exists and send 301 if does not
        if not UserExists(to):
            return jsonify(generateReturnDictionary(301, "Receiver username is invalid"))

        #Get values accordingly from helper functions
        cash_from = cashWithUser(username)
        cash_to   = cashWithUser(to)
        bank_cash = cashWithUser("BANK")

        #Update accounts
        updateAccount("BANK", bank_cash + 1) #1$ as transaction fee
        updateAccount(to, cash_to + money - 1)
        updateAccount(username, cash_from-money)

        #Return json with 200 and result
        return jsonify(generateReturnDictionary(200, "Amount Transferred successfully"))


class Balance(Resource):
    def post(self):
        #Get posted Data
        postedData = request.get_json()

        #Getting username, password
        username = postedData["username"]
        password = postedData["password"]

        #Verify if to user exists and send 301 if does not
        retJson, error = verifyCredentials(username, password)
        if error:
            return jsonify(retJson)

        #Query username and get balance
        retJson = users.find({
            "Username": username
        },{
            "Password":0, #Using MongoDB projetions to hide password and id
            "_id":0       #So this will putput json with only username ,Own and debt
        })[0]

        #Return json result
        return(retJson)

class TakeLoan(Resource):
    def post(self):
        #Get posted Data
        postedData = request.get_json()

        #Getting username and password and money
        username = postedData["username"]
        password = postedData["password"]
        money = postedData["amount"]

        #Verify if user exists and send 301 if does not
        retJson, error = verifyCredentials(username, password)
        if error:
            return jsonify(retJson)

        #Get cash and debt values from helper functions
        cash = cashWithUser(username)
        debt = debtWithUser(username)

        updateAccount(username, cash + money) #Updating user account with previou cash in account + debt money

        updateAccount(username, debt + money) #Updating debt account

        #Return json with 200 and result
        return jsonify(generateReturnDictionary(200, "Loan added to your account"))

class PayLoan(Resource):
    def post(self):
        #Get posted Data
        postedData = request.get_json()

        #Getting username and password and money
        username = postedData["username"]
        password = postedData["password"]
        money    = postedData["amount"]

        #Verify if to user exists and send 301 if does not or money < 0
        retJson, error = verifyCredentials(username, password)
        if error:
            return jsonify(retJson)
        cash = cashWithUser(username)
        if cash < money:
            return jsonify(generateReturnDictionary(303, "Not Enough Cash in your account"))

        #Get Below values from helper functions
        debt = debtWithUser(username)
        updateAccount(username, cash-money)
        updateDebt(username, debt - money)

        #Return json with 200 and result
        return jsonify(generateReturnDictionary(200, "Loan Paid"))

#Adding API Resource
api.add_resource(Register, '/register')
api.add_resource(Add, '/add')
api.add_resource(Transfer, '/transfer')
api.add_resource(Balance, '/balance')
api.add_resource(TakeLoan, '/takeloan')
api.add_resource(PayLoan, '/payloan')


if __name__=="__main__":
    app.run(host='0.0.0.0')
