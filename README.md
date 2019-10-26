# brazilian-cars-classifier


Project just for fun, using the fast.ai library.
Idea inspired through the classes :)


The project has some modules:

 1) Classifier
 2) Api
 3) Web
 4) Mobile.

## 1) Classifier

fast.ai library was used.

The dataset used was made by myself, it used over 20,000 images from the internet. 
Vehicle names and automakers were taken from informational tables.
  
The model can classify over 250 different vehicles.
  
More about can be seen in the "notebooks" folder.

<center><img src="https://raw.githubusercontent.com/pstwh/brazilian-cars-classifier/master/images/1.png"/></center>

## 2) Api

Developed using flask. Just load the model, make predictions and maintain the web page.

**@POST**
request: form-data

images: [etios1.jpeg, fusca1.jpg, lancer1.jpg]

response: json
```json
{
  "predictions": [
    {
      "brand:": "TOYOTA", 
      "car": "ETIOS", 
      "file": "etios1.jpeg"
    }, 
    {
      "brand:": "VOLKSWAGEN", 
      "car": "FUSCA", 
      "file": "fusca1.jpg"
    }, 
    {
      "brand:": "MITSUBISHI", 
      "car": "LANCER", 
      "file": "lancer1.jpg"
    }
  ], 
  "status": true
}
```

## 3) Web

Simple application just for using the api route. 

<center><img src="https://raw.githubusercontent.com/pstwh/brazilian-cars-classifier/master/images/2.gif"></center>


## 4) Mobile

React native application, just to use device camera and the api route.

<center><img src="https://raw.githubusercontent.com/pstwh/brazilian-cars-classifier/master/images/3.gif"/></center>

## Build With

 - fastai/pytorch
 - flask
 - react
 - react native

