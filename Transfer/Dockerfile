FROM golang:latest
EXPOSE 3000
RUN mkdir /app
ADD . /app/
WORKDIR /app
ENV GOPATH /app
RUN go get -u	"github.com/gorilla/mux"
RUN go get -u "go.mongodb.org/mongo-driver/bson"
RUN go get -u "go.mongodb.org/mongo-driver/mongo"
RUN go get -u	"go.mongodb.org/mongo-driver/mongo/options"
RUN cd /app ; go install Transactions
CMD ["/app/bin/Transactions"]
