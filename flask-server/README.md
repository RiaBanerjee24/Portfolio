To build this container:
docker build -t flask-server .
To run this container:
docker run -p 5002:5002 -env-file:.env flask-server