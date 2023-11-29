//! Getting and setting the elements and colors needed
const boxes = document.querySelector(".boxes");
const colors = ["red","aqua","blueviolet","chartreuse","coral","gold","maroon","hotpink"];
const colorList = [...colors,...colors];

// console.log(colorlist);
const boxLenght = colorList.length;
// console.log(boxLength);


//!Initializing the main elements of the game state
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

// function to display the boxes in the webpage
function buildBoxes(color) {
    const element = document.createElement("div");
    element.classList.add("box");


    // used for mapping the color
element.setAttribute("data-color",color);//!used for mapping the color
element.setAttribute("data-revealed","false");//!used to check revealed boxes



//!adding event listeners for click event
element.addEventListener("click",()=>{
    const revealed = element.getAttribute("data-revealed");

    // !display the boxes
if(waitingTime || revealed === "true" || element == activeBox) {
    return;
}
element.style.backgroundColor = color;

// !checking the active box
if(!activeBox){
    activeBox = element;

return;
}
// console.log(activeBox);


 //!Logic for matching color and winning condition
const colorMatch = activeBox.getAttribute("data-color");
if (colorMatch === color) {
     activeBox.setAttribute("data-revealed", "true");
     element.setAttribute("data-revealed", "true");
    waitingTime = false;
    activeBox = null;
    revealCount += 2;
    if (revealCount === boxLenght) {
      alert("Congratulations!😍 You Won!🎉 Refresh to play again");
    }
    return;
  }


 //!change the waiting time to true and using settimeout for transistion
 waitingTime = true;
 setTimeout(() => {
   element.style.backgroundColor = null;
   activeBox.style.backgroundColor = null;
   waitingTime = false;
   activeBox = null;
 }, 1000);
});
return element;
}

// Building the boxes for the game
for (let i = 0; i < boxLenght; i++) {
    //!this is the place where the colors are randomly displayed
    const randomIndex = Math.floor(Math.random() * colorList.length);
    const color = colorList[randomIndex];
    const box = buildBoxes(color);
  
  //!using splice method to avoid 3 repeated calls
    colorList.splice(randomIndex, 1);
  
    //console.log(color);
    boxes.append(box);
  }
