package main

import (
	"encoding/json"
	"net/http"

	"github.com/sethvargo/go-password/password"
)

func generatePassword(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	pass, _ := password.Generate(12, 3, 2, false, false)
	response := map[string]string{
		"password": pass,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/password", generatePassword)
	http.ListenAndServe(":8080", nil)
}
