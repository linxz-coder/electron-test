console.log("render");

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const input = document.getElementById('input');

btn1.onclick = () => {
    // alert('Hello World');
    alert(myAPI.version);
};

btn2.onclick = () => {
    // alert(input.value);
    myAPI.saveFile(input.value);
};

btn3.onclick = async () => {
    let data = await myAPI.readFile();
    alert(data);
};