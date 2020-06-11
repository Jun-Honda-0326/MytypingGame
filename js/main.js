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

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  
  target.textContent = word;
  // 正解した文字をアンダーバーにする処理
  function updateTarget(){
    let placeholder = '';
    for (let i  = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }
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