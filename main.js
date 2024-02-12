// 랜덤 번호를 지정한다
// 유저가 번호를 입력한다. (유저번호를 js로 들고오기) 그리고 go라는 버튼을 누른다.
// 만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다! 표시
// 랜덤번호 < 유저번호 down!
// 유저번호 > 랜덤번호 up!
// reset 버튼 누르면 게임이 reset된다
// 5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측이 불가하고 버튼이 disable된다.)
// 유저가 1-100 범위 밖에 있는 숫자 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.
//정답을 맞췄을때도 go 버튼이 disabled되서 게임이 실행이 안되게금.

let computerNum = 0; //랜덤번호 지정해 줄 변수 필요.
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input") ;
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5 
let gameOver = false
let chanceArea = document.getElementById("chance-area");
let history = []

//html의 버튼과 인풋에 id 속성을 넣어서 js로 불러오는 작업 필요.
//Go 버튼에 클릭 이벤트를 넣어주는 작업. play함수를 매개변수로 설정하고 아래에서 play함수 생성.

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus',function(){userInput.value=""});
function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log('정답',computerNum) 
}                                  
//Math.random 함수는 0~1까지의 소수를 무작위로 반환.
//소수점에 100을 곱해서 두자리 숫자가 나오게 한 후에
//Math.floor를 이용해서 소수점 아래는 버리면 정수가 나오게 됨.
//math.random이 0~1까지 이므로 최대 0~99까지 밖에 나오지 않으니까 1을 더해주는 작업. 0~100까지 범위 조정 가능.

function play(){
    let userValue = userInput.value; //user input의 value값을 들고 와야지 프로그램이 알아먹음.
    if(userValue < 1 || 100 < userValue){
        resultArea.textContent = "범위 밖의 숫자입니다!!! 1부터 100까지의 값을 입력하세요."
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent=" 이미 입력한 숫자입니다. 다른 숫자를 입력하세요. "
        return;
    }

    chances --;
    chanceArea.textContent = `남은 기회:${chances}번`; //""정적인값에만 쓰임.``동적인 값에쓰임.
    console.log("chances",chances);
    if(userValue < computerNum){
        resultArea.textContent = "UP!!!";
        document.getElementById("up-image").src = "./assets/breathe.gif";
        document.getElementById("up-image").style.display = "block";
        document.getElementById("main-image").style.display = "none";
    }else if (computerNum < userValue){
        resultArea.textContent = "DOWN!!!";
        document.getElementById("up-image").src = "./assets/breathe.gif";
        document.getElementById("up-image").style.display = "block";
        document.getElementById("main-image").style.display = "none";

    }else {
        document.getElementById("pass-image").style.display = "block";
        document.getElementById("up-image").style.display = "none";
        document.getElementById("main-image").style.display = "none";
        resultArea.textContent = "맞추셨습니다!!!"    
    }

    history.push(userValue);
    console.log(history);

    if(chances <1){
        gameOver = true
    }
    if(gameOver == true){
        playButton.disabled = true
        document.getElementById("fail-image").style.display = "block";
        document.getElementById("up-image").style.display = "none";
        resultArea.textContent = "탈락!";
    }
}
    function reset(){
        pickRandomNum();
        userInput.value = "";
        document.getElementById("main-image").style.display ="block";
        document.getElementById("fail-image").style.display ="none";
        document.getElementById("pass-image").style.display ="none";
        resultArea.textContent = "맞추면 선물 드림";
        playButton.disabled = false;
        chances = 5;
        gameOver = false;
        chanceArea.textContent = `남은 기회:${chances}번`;

    }
    
pickRandomNum() 

//콘솔창의 결과를 다시 웹사이트로 들고오는 작업 필요.