package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"time"
)

type transferRequest struct {
	EmailID string `json:"email"`
	TransferAmount string `json:"transferAmount"`
}
type check struct{
	EmailID string `bson:"email"`
}
type error struct{
	Message string `json:"message"`
}

func main(){
	router := mux.NewRouter()
	router.HandleFunc("/transfer",transferGet).Methods("GET")
	router.HandleFunc("/transfer",transferPut).Methods("PUT")
	log.Fatal(http.ListenAndServe(":80", router))
}

func transferGet(w http.ResponseWriter,r *http.Request,) {
	var client *mongo.Client
	fmt.Println("Starting the application...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//clientOptions := options.Client().ApplyURI("mongodb+srv://kowshhal:gopi123@devconnector-kskyr.mongodb.net/test?retryWrites=true&w=majority")
	clientOptions := options.Client().ApplyURI("mongodb+srv://nivali:Niv12345@agrifund-fqagq.mongodb.net/Agrifund?retryWrites=true&w=majority")
	fmt.Println("Client Options set...")
	client, err := mongo.Connect(ctx, clientOptions)
	fmt.Println("Mongo Connected...")
	//var mongodb_database = "Agrifund"
	//var mongodb_collection = "accounts"
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
		fmt.Println("error")
	}
	collection := client.Database("test").Collection("account")
	var result transferRequest
	locationId := mux.Vars(r)["EmailID"]
	err = collection.FindOne(context.TODO(), bson.D{{"EmailID", locationId}}).Decode(&result)
	if err != nil {
		//log.Fatal(err)
		fmt.Println("accounts document error")
		return
	}

	fmt.Printf("Found a document: %+v\n", result)

}

func transferPut(w http.ResponseWriter,r *http.Request,){

	var client *mongo.Client
	fmt.Println("Starting the application...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//clientOptions := options.Client().ApplyURI("mongodb://cmpe281:cmpe281@3.89.47.220:27017")
	clientOptions := options.Client().ApplyURI("mongodb+srv://nivali:Niv12345@agrifund-fqagq.mongodb.net/Agrifund?retryWrites=true&w=majority")
	fmt.Println("Client Options set...")
	client, err := mongo.Connect(ctx, clientOptions)
	fmt.Println("Mongo Connected...")
	//var mongodb_database = "Agrifund"
	//var mongodb_collection = "accounts"
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
		fmt.Println("error")
	}
	var req transferRequest
	var Check check
	//var result string
	err2:=json.NewDecoder(r.Body).Decode(&req)
	if(err2!=nil){
		log.Fatal(err2)
	}
	Check.EmailID=req.EmailID

	obj,err:=json.Marshal(map[string]string{
		"email":req.EmailID,
		"type":"savings",
		"operation":"debit",
		"amount":req.TransferAmount,
	})
	requestBody,err:=json.Marshal(map[string]json.RawMessage{
		"MessageBody":obj,
	})
	fmt.Println(requestBody)
	if(err!=nil){
		log.Fatal(err)
	}
	resp,err:=http.Post("https://4l0u135eh3.execute-api.us-east-1.amazonaws.com/test/api/send","application/json",bytes.NewBuffer(requestBody))
	if(err!=nil){
		log.Fatal(err)
	}
	fmt.Println(resp.Body)
}