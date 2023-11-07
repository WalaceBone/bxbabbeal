package handler

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
)

func Upload(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")

	if r.Method == "POST" {
		http.Error(w, "Only Post", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "File To Large", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("uploadFile")
	if err != nil {
		http.Error(w, "Invalid File", http.StatusBadRequest)
		return
	}

	defer file.Close()

	sftpClient, err := connectToSFTP()
	if err != nil {
		http.Error(w, "Failed to connect", http.StatusInternalServerError)
		return
	}

	defer sftpClient.Close()

	remoteFilePath := "/abbeal/"
	remoteFile, err := sftpClient.Create(remoteFilePath)
	if err != nil {
		http.Error(w, "Failed to create file", http.StatusInternalServerError)
		return
	}
	defer remoteFile.Close()

	_, err = io.Copy(remoteFile, file)
	if err != nil {
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
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		//HostKeyCallback: ssh.FixedHostKey(hostKey),
	}

	addr := fmt.Sprintf("%s:%s", host, port)
	conn, err := ssh.Dial("tcp", addr, config)

	if err != nil {
		return nil, err
	}

	client, err := sftp.NewClient(conn)
	if err != nil {
		return nil, err
	}
	return client, nil
}
