To build this container:
docker build -t flask-server .
To run this container:
docker run -p 5000:5000 -env-file:.env flask-server