/* =====================================================
   TOURISM AI
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   PROVINCE DATA
===================================================== */

const provinces = [
    { name: "ภูเก็ต", score: 92 },
    { name: "เชียงใหม่", score: 89 },
    { name: "กระบี่", score: 87 },
    { name: "ชลบุรี", score: 85 },
    { name: "สุราษฎร์ธานี", score: 83 },
    { name: "กรุงเทพมหานคร", score: 81 },
    { name: "พังงา", score: 79 },
    { name: "กาญจนบุรี", score: 77 },
    { name: "นครราชสีมา", score: 74 },
    { name: "ขอนแก่น", score: 72 },
    { name: "เพชรบุรี", score: 70 },
    { name: "สงขลา", score: 69 },
    { name: "ระยอง", score: 68 },
    { name: "สกลนคร", score: 65 },
    { name: "อุดรธานี", score: 64 },
    { name: "อุบลราชธานี", score: 63 },
    { name: "เชียงราย", score: 62 },
    { name: "บุรีรัมย์", score: 61 },
    { name: "เลย", score: 60 },
    { name: "สุโขทัย", score: 59 }
];


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(pageId, button) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    setTimeout(() => {

        if (pageId === "mapPage" && mapLarge) {
            mapLarge.invalidateSize();
        }

        if (pageId === "dashboard" && map) {
            map.invalidateSize();
        }

    }, 200);
}


/* =====================================================
   YEAR DATA
===================================================== */

const yearData = {

    "2568": {
        tourist: "162.3M",
        income: "2.38T"
    },

    "2567": {
        tourist: "145.2M",
        income: "2.15T"
    },

    "2566": {
        tourist: "121.8M",
        income: "1.82T"
    },

    "2565": {
        tourist: "87.4M",
        income: "1.25T"
    },

    "2564": {
        tourist: "42.7M",
        income: "0.62T"
    },

    "2563": {
        tourist: "39.8M",
        income: "0.58T"
    },

    "2562": {
        tourist: "138.9M",
        income: "2.10T"
    }

};


/* =====================================================
   CHANGE YEAR
===================================================== */

function changeYear() {

    const year =
        document.getElementById("yearSelect").value;

    const data = yearData[year];

    if (!data) {
        return;
    }

    document.getElementById("touristValue").textContent =
        data.tourist;

    document.getElementById("incomeValue").textContent =
        data.income;
}


/* =====================================================
   TOURISM CHART
===================================================== */

let tourismChart;

function createTourismChart() {

    const canvas =
        document.getElementById("tourismChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    tourismChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "2562",
                "2563",
                "2564",
                "2565",
                "2566",
                "2567",
                "2568"
            ],

            datasets: [

                {
                    label: "นักท่องเที่ยว (ล้านคน)",

                    data: [
                        138.9,
                        39.8,
                        42.7,
                        87.4,
                        121.8,
                        145.2,
                        162.3
                    ],

                    borderWidth: 3,

                    tension: 0.35,

                    fill: false
                },

                {
                    label: "รายได้ (ล้านล้านบาท)",

                    data: [
                        2.10,
                        0.58,
                        0.62,
                        1.25,
                        1.82,
                        2.15,
                        2.38
                    ],

                    borderWidth: 2,

                    tension: 0.35,

                    fill: false
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    position: "bottom"
                }

            },

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

    });
}


/* =====================================================
   TREND CHART
===================================================== */

let trendChart;

function createTrendChart() {

    const canvas =
        document.getElementById("trendChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    trendChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "2562",
                "2563",
                "2564",
                "2565",
                "2566",
                "2567",
                "2568"
            ],

            datasets: [

                {
                    label: "นักท่องเที่ยว (ล้านคน)",

                    data: [
                        138.9,
                        39.8,
                        42.7,
                        87.4,
                        121.8,
                        145.2,
                        162.3
                    ],

                    borderWidth: 1
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    position: "bottom"
                }

            }

        }

    });
}


/* =====================================================
   SHAP CHART
===================================================== */

let shapChart;

function createShapChart() {

    const canvas =
        document.getElementById("shapChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    shapChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "รายได้ประชากร",
                "แหล่งท่องเที่ยว",
                "จำนวนที่พัก",
                "ค่าเดินทาง",
                "สภาพอากาศ"
            ],

            datasets: [

                {
                    label: "SHAP Importance",

                    data: [
                        32,
                        26,
                        18,
                        14,
                        10
                    ],

                    borderWidth: 1
                }

            ]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                x: {
                    beginAtZero: true
                }

            }

        }

    });
}


/* =====================================================
   TOP RANKING
===================================================== */

function createTopRanking() {

    const container =
        document.getElementById("topRanking");

    if (!container) {
        return;
    }

    const top =
        [...provinces]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

    container.innerHTML = "";

    top.forEach((province, index) => {

        const rank = index + 1;

        const div =
            document.createElement("div");

        div.className = "rank";

        div.innerHTML = `

            <div class="number ${rank === 1 ? "first" : ""}">
                ${rank}
            </div>

            <div>

                <strong>
                    ${province.name}
                </strong>

                <div class="rank-bar">

                    <span
                        style="width:${province.score}%">
                    </span>

                </div>

            </div>

            <b>
                ${province.score}
            </b>

        `;

        container.appendChild(div);

    });
}


/* =====================================================
   PROVINCE GRID
===================================================== */

function renderProvinces(data = provinces) {

    const grid =
        document.getElementById("provinceGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    data.forEach((province, index) => {

        let scoreClass = "low";

        if (province.score >= 80) {
            scoreClass = "high";
        }
        else if (province.score >= 65) {
            scoreClass = "medium";
        }

        const card =
            document.createElement("div");

        card.className = "province-card";

        card.innerHTML = `

            <div class="province-number">
                ${index + 1}
            </div>

            <div class="province-info">

                <h3>
                    ${province.name}
                </h3>

                <span>
                    Tourism Province
                </span>

            </div>

            <div class="province-score ${scoreClass}">

                <strong>
                    ${province.score}
                </strong>

                <small>
                    SCORE
                </small>

            </div>

        `;

        grid.appendChild(card);

    });
}


/* =====================================================
   SEARCH PROVINCE
===================================================== */

function searchProvince() {

    const input =
        document.getElementById("provinceSearch");

    if (!input) {
        return;
    }

    const keyword =
        input.value
            .trim()
            .toLowerCase();

    const filtered =
        provinces.filter(province =>
            province.name
                .toLowerCase()
                .includes(keyword)
        );

    renderProvinces(filtered);
}


/* =====================================================
   AI ANALYSIS
===================================================== */

function runAI() {

    const select =
        document.getElementById("provinceSelect");

    const result =
        document.getElementById("aiResult");

    if (!select || !result) {
        return;
    }

    const provinceName =
        select.value;

    const province =
        provinces.find(
            item => item.name === provinceName
        );

    const score =
        province
            ? province.score
            : Math.floor(Math.random() * 20) + 70;

    result.innerHTML = `

        <div class="ai-result-box">

            <p>
                ผลการวิเคราะห์จังหวัด
            </p>

            <h2>
                ${provinceName}
            </h2>

            <br>

            <p>
                Tourism Score
            </p>

            <strong style="font-size:32px;">
                ${score}
            </strong>

            <div class="ai-factor">
                <span>👥 รายได้ประชากร</span>
                <strong>32%</strong>
            </div>

            <div class="ai-factor">
                <span>🏝 แหล่งท่องเที่ยว</span>
                <strong>26%</strong>
            </div>

            <div class="ai-factor">
                <span>🏨 จำนวนที่พัก</span>
                <strong>18%</strong>
            </div>

            <div class="ai-factor">
                <span>🚗 ค่าเดินทาง</span>
                <strong>14%</strong>
            </div>

            <div class="ai-factor">
                <span>☀ สภาพอากาศ</span>
                <strong>10%</strong>
            </div>

            <br>

            <p>
                💡 AI Insight:
                ปัจจัยด้านรายได้ประชากร
                และจำนวนแหล่งท่องเที่ยว
                มีอิทธิพลสูงต่อ Tourism Score
            </p>

        </div>

    `;
}


/* =====================================================
   TRAVEL BUDGET
===================================================== */

function calculateBudget() {

    const province =
        document.getElementById("travelProvince").value;

    const budget =
        Number(
            document.getElementById("budgetTotal").value
        ) || 0;

    const days =
        Number(
            document.getElementById("travelDays").value
        ) || 0;

    const people =
        Number(
            document.getElementById("travelPeople").value
        ) || 0;

    const hotel =
        Number(
            document.getElementById("hotelCost").value
        ) || 0;

    const food =
        Number(
            document.getElementById("foodCost").value
        ) || 0;

    const transport =
        Number(
            document.getElementById("transportCost").value
        ) || 0;

    const other =
        Number(
            document.getElementById("otherCost").value
        ) || 0;


    /*
       ค่าที่พัก
       = ราคาที่พักต่อคืน × จำนวนคืน

       ในที่นี้กำหนดให้
       จำนวนคืน = จำนวนวัน
    */

    const hotelTotal =
        hotel * days;


    /*
       ค่าอาหาร
       = ค่าอาหารต่อคนต่อวัน
       × จำนวนคน
       × จำนวนวัน
    */

    const foodTotal =
        food * people * days;


    /*
       ค่าใช้จ่ายทั้งหมด
    */

    const total =
        hotelTotal +
        foodTotal +
        transport +
        other;


    /*
       เงินคงเหลือ
    */

    const remaining =
        budget - total;


    /*
       ค่าใช้จ่ายต่อคน
    */

    const perPerson =
        people > 0
            ? total / people
            : 0;


    /*
       ค่าใช้จ่ายต่อวัน
    */

    const perDay =
        days > 0
            ? total / days
            : 0;


    /*
       แสดงผล
    */

    document.getElementById("provinceResult")
        .textContent = province;

    document.getElementById("hotelResult")
        .textContent = formatMoney(hotelTotal);

    document.getElementById("foodResult")
        .textContent = formatMoney(foodTotal);

    document.getElementById("transportResult")
        .textContent = formatMoney(transport);

    document.getElementById("otherResult")
        .textContent = formatMoney(other);

    document.getElementById("totalResult")
        .textContent = formatMoney(total);

    document.getElementById("remainingResult")
        .textContent = formatMoney(remaining);

    document.getElementById("perPersonResult")
        .textContent = formatMoney(perPerson);

    document.getElementById("perDayResult")
        .textContent = formatMoney(perDay);


    /*
       สถานะงบประมาณ
    */

    const status =
        document.getElementById("budgetStatus");

    status.classList.remove(
        "success",
        "danger"
    );


    if (budget <= 0) {

        status.textContent =
            "⚠ กรุณากำหนดงบประมาณ";

    }

    else if (remaining >= 0) {

        status.classList.add("success");

        status.textContent =
            `✓ งบประมาณเพียงพอสำหรับการเดินทางไป ${province}`;

    }

    else {

        status.classList.add("danger");

        status.textContent =
            `⚠ งบประมาณเกิน ${formatMoney(Math.abs(remaining))}`;

    }

}


/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(value) {

    return Number(value).toLocaleString(
        "th-TH",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    ) + " บาท";

}


/* =====================================================
   REPORT
===================================================== */

function showReportMessage() {

    alert(
        "📄 Tourism Analysis Report\n\n" +
        "ระบบรายงานผลการวิเคราะห์การท่องเที่ยว\n" +
        "ฟังก์ชัน PDF สามารถเชื่อมต่อกับ Backend ได้ในภายหลัง"
    );

}


/* =====================================================
   DATA
===================================================== */

function showDataMessage() {

    alert(
        "📊 Province Dataset\n\n" +
        "ส่วนนี้สามารถเชื่อมต่อกับ Dataset จริง\n" +
        "จาก CSV / MySQL / Python Backend ได้"
    );

}


/* =====================================================
   LEAFLET MAP
===================================================== */

let map;
let mapLarge;


/*
   พิกัดประเทศไทยโดยประมาณ
*/

const thailandCenter = [
    15.8700,
    100.9925
];


/* =====================================================
   CREATE SMALL MAP
===================================================== */

function createMap() {

    const mapElement =
        document.getElementById("map");

    if (!mapElement) {
        return;
    }

    map =
        L.map("map")
            .setView(thailandCenter, 5.5);


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);


    provinces.forEach(province => {

        /*
           สุ่มตำแหน่งโดยประมาณสำหรับ Demo
        */

        const lat =
            13.5 + Math.random() * 5.5;

        const lng =
            98.5 + Math.random() * 5.5;


        const marker =
            L.circleMarker(
                [lat, lng],
                {
                    radius: 7,
                    fillOpacity: 0.7,
                    weight: 1
                }
            ).addTo(map);


        marker.bindPopup(`
            <strong>${province.name}</strong>
            <br>
            Tourism Score:
            <strong>${province.score}</strong>
        `);

    });

}


/* =====================================================
   CREATE LARGE MAP
===================================================== */

function createLargeMap() {

    const mapElement =
        document.getElementById("mapLarge");

    if (!mapElement) {
        return;
    }

    mapLarge =
        L.map("mapLarge")
            .setView(thailandCenter, 5.5);


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(mapLarge);


    provinces.forEach(province => {

        const lat =
            13.5 + Math.random() * 5.5;

        const lng =
            98.5 + Math.random() * 5.5;


        const marker =
            L.circleMarker(
                [lat, lng],
                {
                    radius: 9,
                    fillOpacity: 0.7,
                    weight: 1
                }
            ).addTo(mapLarge);


        marker.bindPopup(`
            <strong>${province.name}</strong>
            <br>
            Tourism Score:
            <strong>${province.score}</strong>
        `);

    });

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createTourismChart();

        createTrendChart();

        createShapChart();

        createTopRanking();

        renderProvinces();

        createMap();

        createLargeMap();

        /*
           คำนวณงบประมาณครั้งแรก
        */

        calculateBudget();

    }
);