package handler

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
)

func Upload(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	if r.Method != "POST" {
		
		http.Error(w, "Only Post", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		log.Println("An error occurred:", err)
		http.Error(w, "File To Large", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		log.Println("An error occurred:", err)
		http.Error(w, "Invalid File", http.StatusBadRequest)
		return
	}

	defer file.Close()

	sftpClient, err := connectToSFTP()
	if err != nil {
		log.Println("An error occurred:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer sftpClient.Close()

	remoteFilePath := "/abbeal/"
	remoteFile, err := sftpClient.Create(remoteFilePath)
	if err != nil {
		log.Println("An error occurred:", err)
		http.Error(w, "Failed to create file", http.StatusInternalServerError)
		return
	}
	defer remoteFile.Close()

	_, err = io.Copy(remoteFile, file)
	if err != nil {
		log.Println("An error occurred:", err)
		http.Error(w, "Fail to upload file", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "File uploaded")

}

func connectToSFTP() (*sftp.Client, error) {
	host := os.Getenv("SFTP_HOST")
	port := os.Getenv("SFTP_PORT")
	user := os.Getenv("SFTP_USER")
	password := os.Getenv("SFTP_PASSWORD")
	config := &ssh.ClientConfig{
		User: user,
		Auth: []ssh.AuthMethod{
			ssh.Password(password),
		},
		//HostKeyCallback: ssh.HostKeyCallback(func(string, net.Addr, ssh.PublicKey) error { return nil }),

		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		// HostKeyCallback: ssh.FixedHostKey(hostKey),
		// HostKeyCallback: ssh.HostKeyCallback(func(hostname string, remote net.Addr, key ssh.PublicKey) error {
        //     fmt.Printf("Host key fingerprint is: %s\n", ssh.FingerprintSHA256(key))
        //     fmt.Printf("Host key type is: %s\n", key.Type())
        //     return nil
        // }),
        // User: "known_user",
	}
	log.Println("Config :", host)
	addr := fmt.Sprintf("%s:%s", host, port)
	log.Println("addr :", addr)

	conn, err := ssh.Dial("tcp", addr, config)

	if err != nil {
		log.Println("Dial fail:", err)
		return nil, err
	}

	client, err := sftp.NewClient(conn)
	if err != nil {
		log.Println("New Client Fails:", err)
		return nil, err
	}
	return client, nil
}
