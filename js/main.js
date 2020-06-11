'user strict';
{
  // 単語の配列
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word = words[Math.floor(Math.random()* words.length)]; //ランダムに選ぶ処理
  let loc = 0;
  let score = 0;
  let miss = 0;
  const timeLimit = 10 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  
  // 正解した文字をアンダーバーにする処理
  function updateTarget(){
    let placeholder = '';
    for (let i  = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }
  // タイマー処理の関数
  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId =  setTimeout (() => {
      updateTimer();
     }, 10);

     if (timeLeft < 0){
       isPlaying = false;
       clearTimeout(timeoutId);
       timerLabel.textContent = '0.00';
       setTimeout(()=>{
         showResult();
       }, 100);
    }
  }

  function showResult(){
    const accuracy = score + miss == 0? 0: score / (score + miss) * 100;
      alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% acuuracy!`);
  }

  window.addEventListener('click',() =>{
    if (isPlaying == true){
      return;
    }
    isPlaying = true;
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  // 画面がキーダウンされた場合に処理が発動
  window.addEventListener('keydown', e =>{
    if (e.key === word[loc]){
      loc++;
      // 次の単語に遷移するタイミング
      if (loc === word.length){
        word = words[Math.floor(Math.random()* words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    }
    // タイプミスした場合
    else{
    miss++;
    missLabel.textContent = miss;
    }
  }); 
}