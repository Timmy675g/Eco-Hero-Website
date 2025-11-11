const box = document.getElementById("res1");
box.style.display = 'none';


function UpdateUnit() {
    const U_fuel = document.getElementById("fuel").value;
    const text2 = document.getElementById("fueltype");

    if (U_fuel === "bgas") {
        text2.innerText = "Km/Kg"
    } else if (U_fuel === "ev") {
        text2.innerText = "Km/Kwh"
    } else {
        text2.innerText = "Km/l"
    }
}

function calc1() {
    const box = document.getElementById("res1");
    const U_fuel = document.getElementById("fuel").value;
    const efficiency = parseFloat(document.getElementById("F_E").value);
    const dist1 = parseFloat(document.getElementById("dist").value);
    const Rdiv = document.getElementById("res1");
    box.style.display = 'block';
    if (!efficiency || !distance || efficiency <=0 || distance <=0) {
        Rdiv.innerText= "Invalid Number, Try again!";
        return;
    }
    const CoFactors = {
        Petrol: 2.31,
        diesel: 2.68,
        lpg: 1.51,
        e10: 2.07,
        e85: 1.51,
        bdiesel: 1.90,
        bgas: 0.08,
        ev: 0.40,
        other: 2.00
    }
    const u1 = (U_fuel === "ev") ? "Kwh" : (U_fuel === "bgas") ? "kg": "l";
    const usage1 = dist1 / efficiency;
    const co = usage1 * CoFactors[U_fuel];

    Rdiv.innerHTML = `
    <p><b>Information !!</b></p>
    <p>Fuel Used:  ${usage1.toFixed(2)} ${u1}</p>
    <p>Total Co₂ emitted: ${co.toFixed(2)} kg</p>`;

}