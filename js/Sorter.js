const object1 = [
  {e:"🍉", bin: "organic"},
  {e:"🍍", bin: "organic"},
  {e:"🍎", bin: "organic"},
  {e:"🍌", bin: "organic"},
  {e:"✉️", bin: "recycleables"},
  {e:"📦", bin: "recycleables"},
  {e:"📰", bin: "recycleables"},
  {e:"📄", bin: "recycleables"},
  {e:"📚", bin: "recycleables"},
  {e:"🔋", bin: "anorganic"},
  {e:"🧷", bin: "anorganic"},
  {e:"🪒", bin: "anorganic"},
  {e:"🧴", bin: "anorganic"},
  /**/
];

let point = 0;
const things1 = document.getElementById("things");
const currentext = document.getElementById("currentScore");
const wrttext = document.getElementById("wrtext");

function thingsSpawn() {
  things1.innerHTML = "";
  for (let p = 0; p<3 ; p++) {
    const r_number = object1[Math.floor(Math.random()* object1.length)];
    const makeDiv = document.createElement("div");
    makeDiv.className = "things";
    makeDiv.textContent = r_number.e;
    makeDiv.draggable = true;
    makeDiv.dataset.type = r_number.bin;
    makeDiv.ondragstart = drag;
    things1.appendChild(makeDiv);
  }
}

function drop2(k) {
  k.preventDefault();
}

function drag(o) {
  o.dataTransfer.setData("type", o.target.dataset.type);
  o.dataTransfer.setData("id" , o.target.textContent);
}

function drop(o) {
  o.preventDefault();
  const itemType = o.dataTransfer.getData("type");
  const Emoji2 = o.dataTransfer.getData("id");
  const correctbin = o.currentTarget.id;


if (itemType === correctbin) {
  point++
  currentext.textContent = "Score: " + point;
    wrttext.textContent = "Tempat Sampah yang benar :D"
} else {
  point = Math.max(0, point - 1);
  currentext.textContent = "Score: " + point;
  wrttext.textContent = "Salah tempat sampah :("
}
const a_variable = [...things1.children].find(d => d.textContent === Emoji2);
if (a_variable) a_variable.remove();
if (things1.children.length === 0) thingsSpawn(); 

}

thingsSpawn();