let reset = document.querySelector('.but');
reset.addEventListener('click',()=>{
    location.reload();
});
let arr = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

let btn = document.querySelectorAll('.box');
let flag = 1;
let movecount = 0;
btn.forEach((b)=>{
    b.addEventListener('click',(event)=>{
    if(flag === 1){
    b.innerText = 'X';
    b.disabled = true;
    flag = 0;
    movecount++;
    let char = checkwinner(); 
        //console.log(char);
        if(char !== ''){
          showwinner(char);
        }
        else if(movecount === 9){
          showDraw();
        }
    }
    else{
      b.innerText = '0';
      b.disabled = true;
      flag = 1;
      movecount++;
      let char = checkwinner(); 
      //console.log(char);
      if(char !== ''){
        showwinner(char);
      }
      else if(movecount === 9){
        showDraw();
      }
    }
    });
});

function checkwinner(){
         for(let i of arr){
          let p0 = btn[i[0]].innerText;
          let p1 = btn[i[1]].innerText;
          let p2 = btn[i[2]].innerText;
          if(p0 !== '' && p1 !== '' && p2 !== ''){
            if(p0 === p1 && p1 === p2){
              console.log("winner : ",p0);
              return p0;
            }
          }
         }
    return '';
}

function showwinner(char){
  // let result = document.getElementsByClassName('result');
  // for(let res=0;res < result.length ;res++){
  //   console.log(result[res]);
  //        result[res].innerText = "Winner is "+char;
  //        result[res].style.display = 'block';
  // };
  let result = document.querySelector('.result');
  result.innerText = "Winner is "+char;
  result.style.display = 'block';
  btn.forEach((b)=>{
    b.disabled = true;
  });
}

function showDraw() {
  let result = document.querySelector('.result');
  result.innerText = "It's a draw!";
  console.log("It's a draw");
  result.style.display = 'block';
}

// let pc = [1,2,3,4,5,6,7,8,9];
// let btn = document.querySelectorAll('.box');
// btn.forEach((b)=>{
//     b.addEventListener('click',(event)=>{
//     b.innerText = 'X';
//     b.disabled = true;
//     if(pc.length != 0)
//     pc = pc.filter((item) => item != b.value);
//     console.log(b.value);
//     console.log(pc);
//     let move = Math.floor(Math.random() * pc.length);
//     console.log(move);
//     if(pc.length != 0){
//     let position = document.querySelector('#box'+`${pc[move]}`);
//     position.disabled = true;
//     position.innerText = '0';
//     pc = pc.filter((item) => item != pc[move]);
//     }
//     console.log(pc);
//     });
// });
