let score = 0;
let money = 130;
let _money = 130;
Object.defineProperty (window, "money", {
    get() {return _money;},
    set(v) {
        _money = v;
        updateUI();
        renderShop();
    }
});


let upgrades = {
    motor:0,
    battery:0,
    brakes:0,
    suspension:0,
    wheels:0,
};

const maxUpgrades = {
    motor:7,
    battery:2,
    brakes:2,
    suspension:2,
    wheels:1,
};

const partNamesID = {
    motor: "Motor",
    battery: "Baterai",
    brakes: "Rem",
    suspension: "Suspensi",
    wheels: "Roda"
};

const tLabel = {
    motor: ["Motor Tunggal","Motor Tunggal Performa","Motor Ganda","Motor Ganda Performa","Motor Tiga","Motor Tiga Performa","Motor Quad","Motor Quad Performa"],
    battery: ["Standar 50Kwh","Jarak Jauh 75Kwh","Signature 100Kwh"],
    brakes: ["Rem Drum","Rem Plat","Rem Plat High Regen"],
    suspension: ["Standar Murah","Eco Comfort","Luxury Signature"],
    wheels: ["Roda","Roda Performa"]
};

const slotLabels = {
    motor: "Motor",
    battery: "Baterai",
    brakes: "Rem",
    suspension: "Suspensi",
    wheels: "Roda"
};

const bShopPrices = { motor:50, battery:40, brakes:30,suspension:30, wheels:20};
const bComponentCosts = { motor:12, battery:11, brakes:9,suspension:9, wheels:6};

const eStates = [
    { name:"Pertumbuhan", multi:1.25, shopmulti:1.05, cheapBoost:0.95, exPenalty:1.05, duration:20000},
    { name:"Stabil", multi:1.00, shopmulti:1.00, cheapBoost:1.00, exPenalty:1.00, duration:18000},
    { name:"Krisis", multi:0.75, shopmulti:0.90, cheapBoost:1.10, exPenalty:0.80, duration:22000},
];

let currentE = 1;
let eTimer = null;

const money2 = document.getElementById("money");
const ScoreV = document.getElementById("pscore");
const itemsV = document.getElementById("items2");
const ShoplistV = document.getElementById("multishoplist");
const unlockedV = document.getElementById("unlockedpartnum");
const eNameV = document.getElementById("economystate");
const econMultiV = document.getElementById("economymulti");
const TdispV = document.getElementById("timedisp");
const popupArea = document.getElementById("vwPop");

function uiUpdate() {
    money2.textContent = money;
    ScoreV.textContent = score;
    unlockedV.textContent = countUnlocked();
    eNameV.textContent = eStates[currentE].name;
    econMultiV.textContent = eStates[currentE].multi.toFixed(2) + "x";
}

function countUnlocked() {
    let a = 0;
    for(let k in upgrades) {
        a += upgrades[k] +1;
    }
    return a;
}

function sPopupV(msg) {
    const p1V = document.createElement("div");
    p1V.className = "pop"
    p1V.textContent = msg;

    popupArea.prepend(p1V);

    setTimeout(() => p1V.style.opacity = "1", 20);
    setTimeout(() => {
        p1V.style.opacity= "0";
        p1V.style.transform = "translateY(-15px)";
    },1500);
    setTimeout(() => p1V.remove(), 1800)
}

function shopPriceFor(type) {
    const base = bShopPrices[type];
    const lvl = upgrades[type];
    return Math.round(base * Math.pow(1.5,lvl) * eStates[currentE].shopmulti);
}

function renderShop() {
    ShoplistV.innerHTML = '';
    const types = ['motor','battery','brakes','suspension','wheels'];

    types.forEach(type => {
        const cardV = document.createElement('div');
        cardV.className = 'part-card';

        cardV.innerHTML =
        `<div class="part-thumb">${thumbImg(type, upgrades[type])}</div>
        <div class="part-meta">
        <h4>${partNamesID[type]}</h4>
        <p class="current-tier">
        ${tLabel[type][Math.min(upgrades[type], tLabel[type].length -1)] || 'Basic'}
        </p>
        <div class="tiers-list" data-type="${type}"></div>
        </div>
        <div class="part-actions">
        <div style="display:flex;gap:6px;align-items:center">
        <button class="buy-btn" data-type="${type}">
        <span class="btn-label">Beli/Upgrade</span>
        <span class="btn-price">($<span class="price">${shopPriceFor(type)}</span>)</span>
        </button>
        <button class="tier-toggle" data-type="${type}">▼</button>
        </div>
        </div>
        `;

        ShoplistV.appendChild(cardV);

        const tiersV = cardV.querySelector('.tiers-list');
        const labels = tLabel[type] || [type];

        tiersV.innerHTML = labels.map((l, idx )=> {
            const unlockedV = idx <= upgrades[type];
            return `
            <div style="opacity:${unlockedV ? 1 :0.45}; padding: 3px 0">
            ${unlockedV ? '✔️':'❌'}${l}
            </div>
            `;
        }).join('');

        const toggleBtn = cardV.querySelector('.tier-toggle')
        toggleBtn.addEventListener('click', () => {
            tiersV.classList.toggle('visible');
            toggleBtn.textContent = tiersV.classList.contains('visible') ? '▲' : '▼';
        });

        const buyBtn = cardV.querySelector('.buy-btn');
        buyBtn.addEventListener('click', () => {
            const price = shopPriceFor(type);

            if (money >= price && upgrades[type] < maxUpgrades[type]) {
                money -= price;
                upgrades[type] = Math.min(maxUpgrades[type],upgrades[type] +1)

                rComponent();
                renderShop();
                uiUpdate();

                sPopupV(`${type.charAt(0).toUpperCase()+ type.slice(1)} di-upgrade!! -$${price}`);

            } else {
                if(upgrades[type] >= maxUpgrades[type]) {
                    sPopupV('Upgrade maksimal tercapai untuk ' + type);
                } else {
                    sPopupV('Uang tidak cukup untuk ' + type);
                }
            }
        });

        const priceV = shopPriceFor(type);
        const canAfford = money >= priceV;
        const NoMaxxed = upgrades[type] < maxUpgrades[type];

        buyBtn.disabled = !(canAfford && NoMaxxed);
    })
}


function thumbImg(type, level) {
    if(type==='battery'){
        const hue = level *-90
        return `<img src="../assets/images/${type}.png" class="pimg" style="filter: hue-rotate(${hue}deg);">`;
    }
    if(type==='motor'){
         return `<img src="../assets/images/motor/motor_${level}.png" class="pimg">`;
    }
    if(type==='brakes'){
         return `<img src="../assets/images/brakes/brake_s${level}.png" class="pimg">`;
    }
    if(type==='suspension'){
        return `<img src="../assets/images/${type}.png" class="pimg">`;
    }
    if(type==='wheels'){
        return `<img src="../assets/images/wheels/${type}_wl${level}.png" class="pimg">`;
    }
    return '';

}

function rComponent() {
    itemsV.innerHTML = "";
    const typeV = ["battery","motor","brakes","suspension","wheels"];

    typeV.forEach(type => {
        const lvl = upgrades[type];
        const label = tLabel[type][lvl];

        const item = document.createElement("div");
        item.className = "item";
        item.draggable = true;
        item.dataset.type = type;
        item.dataset.label = label;

        item.innerHTML = `
        ${thumbImg(type,lvl)}
        <small>${label}</small>`;

        item.addEventListener("dragstart", e => {
            item.classList.add("dragging");
            e.dataTransfer.setData("text/plain", JSON.stringify({
                type,label
            }));
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
        itemsV.appendChild(item);
    });

    renderShop();
    uiUpdate();
}

document.querySelectorAll(".slot1").forEach(slot => { 
    slot.addEventListener("dragover", e => {
        e.preventDefault();
        slot.classList.add("over");
    });

    slot.addEventListener("dragleave", () => {
        slot.classList.remove("over");
    });

    slot.addEventListener("drop", e => {
        e.preventDefault();
        slot.classList.remove("over");

        const rawV = e.dataTransfer.getData("text/plain")
        if (!rawV) return;

        const dataV = JSON.parse(rawV);

        if (slot.dataset.accept === dataV.type && !slot.classList.contains("filled")) {
            slot.classList.add("filled");
            slot.innerHTML= `<div><b>${dataV.label}</b></div><small>${partNamesID[dataV.type]}</small>`;
            score++;

            ScoreV.textContent = score;
            slot.animate([{transform: 'scale(1)'},{transform: 'scale(1.08)'},{ transform: 'scale(1)'}],{duration:260})

            if (score === 5) {
                FBuildcomplete();
            }
        } else {
            sPopupV("Salah Bagian!")
        }
    });
});

function FCountCost () {
    let sum = 0;
    for (let g in bComponentCosts) {
        sum += bComponentCosts[g] * (1 + upgrades[g] * 0.8)
    }
    return sum;
}

function avgUpgrade() {
    let v = 0 , b = 0;
    for (let g in upgrades) {
        v += upgrades[g]; b++;
    }
    return v/b;
}

function FBuildcomplete () {
    const labelB = document.getElementById("muted2");
    let dotsV = 0;

    labelB.textContent = "Membangun EV";
    const loopV = setInterval(() => {
        dotsV = (dotsV + 1)%4;
        labelB.textContent = "Membangun EV" + ".".repeat(dotsV);
    },400);

    const baseV = 100;
    const bonus = upgrades.motor * 20 + upgrades.battery * 12 + upgrades.brakes * 8 + upgrades.suspension * 8 + upgrades.wheels * 6;
    const econV = eStates[currentE];
    const expV = avgUpgrade() >= 1.2;

    let finalMulti = econV.multi;
    finalMulti *= expV ? econV.exPenalty : econV.cheapBoost;

    let earnedV = Math.round((baseV+bonus) * finalMulti - FCountCost());
    if (earnedV < 10) earnedV=10;

    setTimeout(() => {
        clearInterval(loopV);
        sPopupV (`EV Dijual! +$${earnedV}`);
        money += earnedV;
        uiUpdate();
        Slotreset();
        labelB.textContent = "";

        setTimeout(() => {
            renderShop();
        },300)
    }, 1700)
}

function Slotreset () {
    score = 0;
    ScoreV.textContent = 0;
    document.querySelectorAll(".slot1").forEach(slot => {
        slot.classList.remove("filled");
        const o = slot.dataset.accept;
        slot.innerHTML = `<div><b>${slotLabels[o]}</b></div><small>Seret ${slotLabels[o]} ke sini</small>`;
    });
}

function FeconomyCycle() {
    if (eTimer) clearTimeout(eTimer);

    function next() {
        const y = Math.random();
        if (y <0.5) currentE =1;
        else if (y <0.8) currentE =0;
        else currentE = 2;

        uiUpdate();
            eTimer = setTimeout(next, eStates[currentE].duration)
    }
    next();
}

function FClock() {
    const a= new Date();
    TdispV.textContent =
    String(a.getHours()).padStart(2, "0") + ":" +
    String(a.getMinutes()).padStart(2,"0");
}
setInterval(FClock, 1000);
FClock();

rComponent();
renderShop();
uiUpdate();
FeconomyCycle();

sPopupV("Selamat datang di permainan EV Builder!!!")
