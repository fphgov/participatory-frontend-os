# Participatory frontend

Build docker image
```
docker build --tag participatory-frontend:latest .
```

Run docker image with console
```
docker run -it --rm -v $(pwd):/app -p 8081:8081 participatory-frontend:latest sh
```
