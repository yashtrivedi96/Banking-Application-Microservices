package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
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
var mongodb_server = "mongodb+srv://nivali:Niv12345@agrifund-fqagq.mongodb.net/Agrifund?retryWrites=true&w=majority"
var mongodb_database = "Agrifund"
var mongodb_collection = "accounts"

func main(){
	router := mux.NewRouter()
	router.HandleFunc("/transfer",transferPut).Methods("PUT")
	_ = http.ListenAndServe(":80", router)
}

func transferPut(w http.ResponseWriter,r *http.Request,){

	var req transferRequest
	var Check check
	//var result string
	err:=json.NewDecoder(r.Body).Decode(&req)
	if(err!=nil){
		log.Fatal(err)
	}
	Check.EmailID=req.EmailID





//	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://nivali:Niv12345@agrifund-fqagq.mongodb.net/Agrifund?retryWrites=true&w=majority"))
//
//	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
//	err = client.Connect(ctx)
//
//	if(err!=nil){
//		log.Fatal(err)
//	}
//
//	// Check the connection
//	err = client.Ping(context.TODO(), nil)
//
//	if err != nil {
//		log.Fatal(err)
//		fmt.Println("error")
//	}
//
//	fmt.Println("Connected to MongoDB!")
//	collection := client.Database("Agrifund").Collection("issues")
//	fmt.Println("after connection")
//
//
//
//
//
//	err = collection.FindOne(context.TODO(), bson.D{{"email", req.EmailID}}).Decode(&result)
//if(err!=nil){
//	log.Fatal(err)
//}
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