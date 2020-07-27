# Participatory frontend

Build docker image
```
docker build --tag participatory-frontend:latest .
```

Run docker image with console (development in Windows)
```
docker run -it --rm -v ${pwd}:/app -p 8080:8080 participatory-frontend:latest sh
```

Run docker image with console (development in Linux/MacOS)
```
docker run -it --rm -v $(pwd):/app -p 8080:8080 participatory-frontend:latest sh
```
