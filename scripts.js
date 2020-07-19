'use strict';

var productsSection = document.getElementById('allProducts');
var allProducts = [];

var totalClicks = 0;

var leftImageIndex;
var middleImageIndex;
var rightImageIndex;



function Product(name, path){
    this.name = name;
    this.path = path;

    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
    allProducts.push(this);
 }

 new Product('Bag', 'img/bag.jpg');
 new Product('Banana', 'img/banana.jpg');
 new Product('bathroom', 'img/bathroom.jpg');
 new Product('boots', 'img/boots.jpg');
 new Product('breakfast', 'img/breakfast.jpg');
 new Product('bubblegum', 'img/bubblegum.jpg');
 new Product('chair', 'img/chair.jpg');
 new Product('cthulhu', 'img/cthulhu.jpg');
 new Product('dog-duck', 'img/dog-duck.jpg');
 new Product('dragon meat', 'img/dragon.jpg');
 new Product('pen', 'img/pen.jpg');
 new Product('scissors', 'img/scissors.jpg');
 new Product('shark', 'img/shark.jpg');
 new Product('sweep', 'img/sweep.png');
 new Product('tauntaun', 'img/tauntaun.jpg');
 new Product('unicorn meat', 'img/unicorn.jpg');
 new Product(' tale usb ', 'img/usb.gif');
 new Product('water can', 'img/water-can.jpg'); 
 new Product('wine glass', 'img/wine-glass.jpg'); 

 generateRandomImage();

////////////////////
 productsSection.addEventListener('click', productClickHandler)



 ////////////////////
 function generateRandomImage(){
     
     var leftImage = document.getElementById('product1');
     var middleImage = document.getElementById('product2');
     var rightImage = document.getElementById('product3');
 
     leftImageIndex = generateRandomNumber();
     middleImageIndex = generateRandomNumber();
     rightImageIndex = generateRandomNumber();
 
     while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex ){
         rightImageIndex = generateRandomNumber(); 
         middleImageIndex = generateRandomNumber();
         leftImageIndex = generateRandomNumber(); 

     }
     var leftPath = allProducts[leftImageIndex].path;
     var middlePath = allProducts[middleImageIndex].path;
     var rightPath = allProducts[rightImageIndex].path;
 
     allProducts[leftImageIndex].numberOfTimesShown += 1;
     allProducts[rightImageIndex].numberOfTimesShown += 1;
     allProducts[middleImageIndex].numberOfTimesShown += 1;

     
 
     leftImage.setAttribute('src', leftPath);
     middleImage.setAttribute('src', middlePath);
     rightImage.setAttribute('src', rightPath);
 
 }
 ///////////////////
 function generateRandomNumber(){
    return Math.floor(Math.random() * allProducts.length );
 }


 //////////////////////
 var numberOfTrials = 25;
    function productClickHandler(){
        if (totalClicks < numberOfTrials ){
            
            var clickedElement = event.target;

            
            var clickedElementId = clickedElement.id;
            
            if(clickedElementId === 'product1' || clickedElementId === 'product2' || clickedElementId === 'product3'){
                totalClicks +=1;
               
    
                if(clickedElementId === 'product1'){
                    allProducts[leftImageIndex].numberOfClicks +=1;
                }
    
                if(clickedElementId === 'product2'){
                    allProducts[middleImageIndex].numberOfClicks +=1;
                }
                if(clickedElementId === 'product3'){
                    allProducts[rightImageIndex].numberOfClicks +=1;
                }
    
                generateRandomImage();
                console.log(allProducts);
    
            }
        } else {
            generateUserMessage();
            productsSection.removeEventListener('click', productClickHandler);
        }
    }
//////////////
function generateUserMessage(){
    var ulElement = document.getElementById('finalResult');    
    
    for (let index = 0; index < allProducts.length; index++) {
        var listItem = document.createElement('li');
        listItem.textContent = allProducts[index].name +' had  ' +allProducts[index].numberOfClicks+ '  votes  ' + ' and was shown ' + allProducts[index].numberOfTimesShown + '  times  ';
        ulElement.appendChild(listItem);
    }

}