const submit = document.getElementById("btn");
const reset = document.getElementById("btn-reset");
const dialog = document.getElementById("dialog");
const wrapper = document.querySelector(".wrapper");
const dialogL = document.getElementById("dialogL");

//reset game
let bolehReload = false;
reset.addEventListener("click", (e) => {
  bolehReload = true;
  window.location.reload(); 
});

//mencegah reload halaman ketika user
window.addEventListener("beforeunload", (e) => {
  if (bolehReload === false) {
    e.preventDefault;  
    e.returnValue = "progress game anda akan tidak tersimpan";          
  }
});

function openDialogLose(){ //Membuak dialog ketika user tidak berhasil menebak
  dialogL.showModal();
}

function openDialogWin() { //Membuka dialog ketika user berhasil menebak
  dialog.showModal();
}

dialog.addEventListener("click", (e) => {//Menutup dialog menang ketika user mengklik di luar dialog
  if(!wrapper.contains(e.target)) {
    dialog.close()
  } 
})

dialogL.addEventListener("click", (e) => {//Menutup dialog kalah ketika user mengklik di luar dialog
  if(!wrapper.contains(e.target)) {
    dialogL.close()
  } 
})

//Harusnya bisa pake loop, tapi gatau caranya hehehe
let input1 = document.getElementById("form1-input1");
let input2 = document.getElementById("form1-input2");
let input3 = document.getElementById("form1-input3");
let input4 = document.getElementById("form1-input4");
let input5 = document.getElementById("form1-input5");
let input6 = document.getElementById("form2-input1");
let input7 = document.getElementById("form2-input2");
let input8 = document.getElementById("form2-input3");   
let input9 = document.getElementById("form2-input4");
let input10 = document.getElementById("form2-input5");
let input11 = document.getElementById("form3-input1");
let input12 = document.getElementById("form3-input2");
let input13 = document.getElementById("form3-input3");
let input14 = document.getElementById("form3-input4");
let input15 = document.getElementById("form3-input5");
let input16 = document.getElementById("form4-input1");
let input17 = document.getElementById("form4-input2");
let input18 = document.getElementById("form4-input3");
let input19 = document.getElementById("form4-input4");
let input20 = document.getElementById("form4-input5");
let input21 = document.getElementById("form5-input1");
let input22 = document.getElementById("form5-input2");
let input23 = document.getElementById("form5-input3");
let input24 = document.getElementById("form5-input4");
let input25 = document.getElementById("form5-input5");
let input26 = document.getElementById("form6-input1");
let input27 = document.getElementById("form6-input2");
let input28 = document.getElementById("form6-input3");
let input29 = document.getElementById("form6-input4");
let input30 = document.getElementById("form6-input5");

const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const form3 = document.getElementById("form3");
const form4 = document.getElementById("form4");
const form5 = document.getElementById("form5");
const form6 = document.getElementById("form6");

function setFormEnabled(inputs, enabled) {
  inputs.forEach(input => {
    input.disabled = !enabled;
  });
}
setFormEnabled([input6, input7, input8, input9, input10], false);
setFormEnabled([input11, input12, input13, input14, input15], false);
setFormEnabled([input16, input17, input18, input19, input20], false);
setFormEnabled([input21, input22, input23, input24, input25], false);
setFormEnabled([input26, input27, input28, input29, input30], false);

let cek1 = false;
let cek2 = false;
let cek3 = false;
let cek4 = false;
let cek5 = false;




//dataset kata yang akan ditebak
let dataword = [];
let wordle = [];
let word="";
fetch('./dataset/kata.json')
.then(response => response.json())
.then(data => {
  dataword = data;   
  word = dataword[Math.floor(Math.random() * dataword.length)];
  let word1;
  let word2;
  let word3;
  let word4;
  let word5;

  console.log(word)
  for (let i = 0; i < word.length; i++) {
      word.charAt(i);
      word1=word.charAt(0);
      word2=word.charAt(1);
      word3=word.charAt(2);
      word4=word.charAt(3);
      word5=word.charAt(4);
      wordle = [word1, word2, word3, word4, word5];
    }
    console.log(word1);//output dari word (hapus saja nanti)
    console.log(word2);
    console.log(word3);
    console.log(word4);
    console.log(word5);
    console.log(wordle);
});



  
  
if (cek1 === false){
  input1.focus();
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  check();
});

function ValidatePassKey(tb, event) {
  const [formId, inputId] = tb.id.split('-');
  const inputNumber = parseInt(inputId.replace("input", ""));
  const form = document.getElementById(formId);
  const isLetter = /^[a-zA-Z]$/.test(event.key);

  if (event.key === "Enter") {
    if (form.checkValidity()) check();
    event.preventDefault();
  } else if (event.key === "Backspace") {
    if (tb.value === "") {
      const prevInputId = `${formId}-input${inputNumber - 1}`;
      const prevInput = document.getElementById(prevInputId);
      if (prevInput) prevInput.focus();
    }
  } else if (isLetter) {
    tb.value = event.key.toLowerCase(); 
    const nextInputId = `${formId}-input${inputNumber + 1}`;
    const nextInput = document.getElementById(nextInputId);
    if (nextInput) nextInput.focus();
    event.preventDefault();
  } else {
    tb.value = "";
    event.preventDefault();
  }
}


//fungsi check untuk mengecek inputan user
function check() {
  //cek form 1
  if (cek1 === false && form1.checkValidity()) {
    let sisahuruf = [...wordle]; // Salin isi wordle untuk penanda
    const inputs = [input1, input2, input3, input4, input5];
    let benar = true;
    let tebakan = inputs.map(input => input.value.toLowerCase()).join("");
    if (!dataword.includes(tebakan)) {
      return;
    }
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === wordle[i]) {
        inputs[i].style.background = "rgb(0, 166, 62)";
        inputs[i].style.color = "white";
        sisahuruf[i] = null; 
      }
    }
    
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].style.background !== "rgb(0, 166, 62)") {
        const huruf = inputs[i].value;
        const idx = sisahuruf.findIndex(h => h && h === huruf);
        if (idx !== -1) {
          inputs[i].style.background = "rgb(255, 210, 48)";
          inputs[i].style.color = "white";
          sisahuruf[idx] = null; 
          benar = false;
        } else {
          inputs[i].style.background = "rgb(74, 85, 101)";
          inputs[i].style.color = "white";
          benar = false;
        }
      }
    }
 
    // Cek apakah semua hijau
    if (benar === true) {
      cek1 = false;
      openDialogWin();
      setFormEnabled([input1, input2, input3, input4, input5], false);
    } else {
      cek1 = true;
      setFormEnabled([input1, input2, input3, input4, input5], false);
      setFormEnabled([input6, input7, input8, input9, input10], true);
      input6.focus();
    }
  }
  
    //cek form 2
    if (cek1 === true && form2.checkValidity()){
      const inputs = [input6, input7, input8, input9, input10];
      let sisahuruf = [...wordle];
      let benar = true;
      let tebakan = inputs.map(input => input.value.toLowerCase()).join("");
      if (!dataword.includes(tebakan)) {
        return;
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === wordle[i]) {
          inputs[i].style.background = "rgb(0, 166, 62)";
          inputs[i].style.color = "white";
          sisahuruf[i] = null; 
        }
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style.background !== "rgb(0, 166, 62)") {
          const huruf = inputs[i].value;
          const idx = sisahuruf.findIndex(h => h && h === huruf);
          if (idx !== -1) {
            inputs[i].style.background = "rgb(255, 210, 48)";
            inputs[i].style.color = "white";
            sisahuruf[idx] = null;
            benar = false;
          } else {
            inputs[i].style.background = "rgb(74, 85, 101)";
            inputs[i].style.color = "white";
            benar = false;
          }
        }
      }
      if (benar===true){
        cek2 = false;
        openDialogWin();
        setFormEnabled([input6, input7, input8, input9, input10], false);
      }else{
        cek2 = true;
        setFormEnabled([input6, input7, input8, input9, input10], false);
        setFormEnabled([input11, input12, input13, input14, input15], true);
        input11.focus();
      }
    }
    //cek form 3
    if (cek2 === true && form3.checkValidity()) {
      const inputs = [input11, input12, input13, input14, input15];
      let sisahuruf = [...wordle];
      let benar = true;
      let tebakan = inputs.map(input => input.value.toLowerCase()).join("");
      if (!dataword.includes(tebakan)) {
        inputs[4].focus();
        return;
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === wordle[i]) {
          inputs[i].style.background = "rgb(0, 166, 62)";
          inputs[i].style.color = "white";
          sisahuruf[i] = null; 
        }
      }
  
      // Loop kedua: cek yang kuning atau abu-abu
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style.background !== "rgb(0, 166, 62)") {
          const huruf = inputs[i].value;
          const idx = sisahuruf.findIndex(h => h && h === huruf);
          if (idx !== -1) {
            inputs[i].style.background = "rgb(255, 210, 48)";
            inputs[i].style.color = "white";
            sisahuruf[idx] = null; 
            benar = false;
          } else {
            inputs[i].style.background = "rgb(74, 85, 101)";
            inputs[i].style.color = "white";
            benar = false;
          }
        }
      }
      if (benar===true){
        cek3 = false;
        setFormEnabled([input11, input12, input13, input14, input15], false);
        openDialogWin();
      } else{
        cek3 = true;
        setFormEnabled([input11, input12, input13, input14, input15], false);
        setFormEnabled([input16, input17, input18, input19, input20], true);
        input16.focus();
      }
      
    }
    //cek form 4
    if (cek3 === true  && form4.checkValidity()) {
      const inputs = [input16, input17, input18, input19, input20];
      let sisahuruf = [...wordle];
      let benar = true;
      let tebakan = inputs.map(input => input.value.toLowerCase()).join("");
      if (!dataword.includes(tebakan)) {
        inputs[4].focus();
        return;
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === wordle[i]) {
          inputs[i].style.background = "rgb(0, 166, 62)";
          inputs[i].style.color = "white";
          sisahuruf[i] = null; 
        }
      }
  
      // Loop kedua: cek yang kuning atau abu-abu
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style.background !== "rgb(0, 166, 62)") {
          const huruf = inputs[i].value;
          const idx = sisahuruf.findIndex(h => h && h === huruf);
          if (idx !== -1) {
            inputs[i].style.background = "rgb(255, 210, 48)";
            inputs[i].style.color = "white";
            sisahuruf[idx] = null; 
            benar = false;
          } else {
            inputs[i].style.background = "rgb(74, 85, 101)";
            inputs[i].style.color = "white";
            benar = false;
          }
        }
      }
      if (benar===true){
        setFormEnabled([input16, input17, input18, input19, input20], false);
        openDialogWin();
        cek4 = false;
      }else{
        cek4 = true;
        setFormEnabled([input16, input17, input18, input19, input20], false);
        setFormEnabled([input21, input22, input23, input24, input25], true);
        input21.focus();
      }
      
    }
    //cek form 5
    if (cek4 === true && form5.checkValidity()) {
      const inputs = [input21, input22, input23, input24, input25];
      let sisahuruf = [...wordle];
      let benar = true;
      let tebakan = inputs.map(input => input.value.toLowerCase()).join("");
      if (!dataword.includes(tebakan)) {
        inputs[4].focus();
        return;
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === wordle[i]) {
          inputs[i].style.background = "rgb(0, 166, 62)";
          inputs[i].style.color = "white";
          sisahuruf[i] = null; 
        }
      }
  
      // Loop kedua: cek yang kuning atau abu-abu
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style.background !== "rgb(0, 166, 62)") {
          const huruf = inputs[i].value;
          const idx = sisahuruf.findIndex(h => h && h === huruf);
          if (idx !== -1) {
            inputs[i].style.background = "rgb(255, 210, 48)";
            inputs[i].style.color = "white";
            sisahuruf[idx] = null;
            benar = false;
          } else {
            inputs[i].style.background = "rgb(74, 85, 101)";
            inputs[i].style.color = "white";
            benar = false;
          }
        }
      }
      if (benar===true){
        cek5 = false;
        openDialogWin();
        setFormEnabled([input21, input22, input23, input24, input25], false);
      }else{
        cek5 = true;
        setFormEnabled([input21, input22, input23, input24, input25], false);
        setFormEnabled([input26, input27, input28, input29, input30], true);
        input26.focus();
      }
      
    }
    //cek form 6
    if (cek5 === true && form6.checkValidity()) {
      const inputs = [input26, input27, input28, input29, input30];
      let sisahuruf = [...wordle];
      let benar = true;
      let tebakan = inputs.map(input => input.value.toLowerCase()).join("");
      if (!dataword.includes(tebakan)) {
        inputs[4].focus();
        return;
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === wordle[i]) {
          inputs[i].style.background = "rgb(0, 166, 62)";
          inputs[i].style.color = "white";
          sisahuruf[i] = null; 
        }
      }
  
      // Loop kedua: cek yang kuning atau abu-abu
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style.background !== "rgb(0, 166, 62)") {
          const huruf = inputs[i].value;
          const idx = sisahuruf.findIndex(h => h && h === huruf);
          if (idx !== -1) {
            inputs[i].style.background = "rgb(255, 210, 48)";
            inputs[i].style.color = "white";
            sisahuruf[idx] = null; 
            benar = false;
          } else {
            inputs[i].style.background = "rgb(74, 85, 101)";
            inputs[i].style.color = "white";
            benar = false;
          }
        }
      }
      if (benar===true){
        setFormEnabled([input26, input27, input28, input29, input30], false);
        openDialogWin();
      }else {
        openDialogLose();
        setFormEnabled([input26, input27, input28, input29, input30], false);
      }
  }
}



