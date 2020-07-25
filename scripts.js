
'use strict';
// declare all variables
var productsSection = document.getElementById('allProducts');
var allProducts = [];

var totalClicks = 0;

var leftImageIndex;
var middleImageIndex;
var rightImageIndex;
var productsName = [];
allProducts.lastShown = [];
var array1=[];
// create a constructor
function Product(name, path){
    this.name = name;
    this.path = path;

    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
    allProducts.push(this);
    productsName.push(this.name);
 }
// add new objects
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
//call the function
 generateRandomImage();

////////////////////
// event listener to call function when event clicking heppens
 productsSection.addEventListener('click', productClickHandler)



 ////////////////////
 //function to generate images
 function generateRandomImage(){
     
     var leftImage = document.getElementById('product1');
     var middleImage = document.getElementById('product2');
     var rightImage = document.getElementById('product3');
 
     leftImageIndex = generateRandomNumber();
     middleImageIndex = generateRandomNumber();
     rightImageIndex = generateRandomNumber();
///////////// trying to make a boolean
     var num = array1.includes(rightImageIndex);
     var n = num.toString();
    console.log(array1);
// while loop to check for repeating
     while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex  || array1.includes(leftImageIndex)
     || array1.includes(middleImageIndex)
     ||array1.includes(rightImageIndex)){
        console.log ('Duplicate seen');
      
        
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

     
     array1[0] = rightImageIndex;
     array1[1] = leftImageIndex;
     array1[2] = middleImageIndex;
     console.log(array1+' yes')
     
  

     leftImage.setAttribute('src', leftPath);
     middleImage.setAttribute('src', middlePath);
     rightImage.setAttribute('src', rightPath);
 
 }
 ///////////////////
 //ro generate random number
 function generateRandomNumber(){
    return Math.floor(Math.random() * allProducts.length );
 }

 
 //////////////////////
 //the function that will be called when clicking happens
 var numberOfTrials = 25;
    function productClickHandler(){
        if (totalClicks < numberOfTrials ){
            
            var clickedElement = event.target;

            // var  n = numberOfTimesShown.includes(allProducts.name);
            // console.log('mar' + n);
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
               // console.log(allProducts);
                
            }
        } else {
            populateNumberOfClicksArr();
            shown();
            generateUserMessage();
            storeOurProducts();
            generateChart2();
            
            productsSection.removeEventListener('click', productClickHandler);
            console.table(allProducts);
            console.table(localStorage);
        }
            
    }

//////////////
//generate user message when voting finishes
function generateUserMessage(){
    var ulElement = document.getElementById('finalResult');    
    
    for (let index = 0; index < allProducts.length; index++) {
        var listItem = document.createElement('li');
        listItem.textContent = allProducts[index].name +' had  ' +allProducts[index].numberOfClicks+ '  votes  ' + ' and was shown ' + allProducts[index].numberOfTimesShown + '  times  ';
        ulElement.appendChild(listItem);
    }

}

//////////////
//calculate the number of clicks , times shown by using for statements
var numberOfClicks=[];
function populateNumberOfClicksArr(){
    for (let index = 0; index < allProducts.length; index++) {
        numberOfClicks.push(allProducts[index].numberOfClicks);   
    }
}
var numberOfTimesShown=[];
function shown(){
    for (let r = 0; r < allProducts.length; r++) {
        numberOfTimesShown.push(allProducts[r].numberOfTimesShown );   
    }
}
function populateNumberOfClicksArr(){
  for (let index = 0; index < allProducts.length; index++) {
      numberOfClicks.push(allProducts[index].numberOfClicks);   
  }
}

//to make a local storage
function storeOurProducts(){
// in order to save our array of objects into the localstorage we will need to formate our json object in json string
var jsonStringProducts = JSON.stringify(allProducts);
// creare a new property in our localstorage 
localStorage.setItem('products',jsonStringProducts);
}
console.log('inital');
console.table(allProducts);
parseLocalStorage();
console.log('after updating');
console.table(allProducts);
// this function is responsible for parsing the json string to json object 
function parseLocalStorage(){
var previousProductsArr =JSON.parse(localStorage.getItem('products'))
console.log(previousProductsArr);
// this funtcion will update the newly created objects with the old literation values
update(previousProductsArr);

}
function update(previousProductsArr){
for (let index = 0; index < allProducts.length; index++) {
  
 console.log(  "hello"+ allProducts);
 console.log('hi' +previousProductsArr  );
  allProducts[index].numberOfClicks = previousProductsArr[index].numberOfClicks;
  allProducts[index].numberOfTimesShown = previousProductsArr[index].numberOfTimesShown;
  

}
}
// charts to view # of times shown and clicked
////////////// number of times viewed 
function generateChart2(){
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
       labels:productsName,
        datasets: [{
          label: '# of times viewed',
          data:  numberOfTimesShown,
          backgroundColor:  'orange',
  
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 100, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 200, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        },{
            label: '# of Votes',
            data:  numberOfClicks,
            backgroundColor: 'black',
          
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
    ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}