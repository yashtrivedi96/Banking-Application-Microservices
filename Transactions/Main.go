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

type error struct{
	Message string `json:"message"`
}

func main(){
	router := mux.NewRouter()
	router.HandleFunc("/transfer",transferPut).Methods("PUT")
	http.ListenAndServe(":80",router)
}

func transferPut(w http.ResponseWriter,r *http.Request,){

	var req transferRequest
	json.NewDecoder(r.Body).Decode(&req)
	requestBody,err:=json.Marshal(map[string]string{
			"emailId":req.EmailID,
			"type":"savings",
			"operation":"debit",
			"amount":req.TransferAmount,
	})
	if(err!=nil){
		log.Fatal(err)
	}
	resp,err:=http.Post("https://i1vv52cmq1.execute-api.us-east-1.amazonaws.com/test","application/json",bytes.NewBuffer(requestBody))
	if(err!=nil){
		log.Fatal(err)
	}
	fmt.Println(resp.Body)
}