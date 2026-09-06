/* =========================================================
   TOURISM AI - THAILAND DASHBOARD
   SCRIPT.JS
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let tourismChart = null;
let trendChart = null;
let shapChart = null;

let map = null;
let mapLarge = null;

let appInitialized = false;


/* =========================================================
   TOURISM DATA
========================================================= */

const tourismData = {

    2562: {
        tourists: "200.0M",
        income: "3.01T"
    },

    2563: {
        tourists: "71.0M",
        income: "1.23T"
    },

    2564: {
        tourists: "39.7M",
        income: "0.63T"
    },

    2565: {
        tourists: "88.2M",
        income: "1.08T"
    },

    2566: {
        tourists: "139.8M",
        income: "2.17T"
    },

    2567: {
        tourists: "155.6M",
        income: "2.32T"
    },

    2568: {
        tourists: "162.3M",
        income: "2.38T"
    }

};


/* =========================================================
   PROVINCE DATA
========================================================= */

const provinces = [

    {
        name: "กรุงเทพมหานคร",
        region: "กลาง",
        score: 92
    },

    {
        name: "ภูเก็ต",
        region: "ใต้",
        score: 90
    },

    {
        name: "เชียงใหม่",
        region: "เหนือ",
        score: 88
    },

    {
        name: "ชลบุรี",
        region: "ตะวันออก",
        score: 86
    },

    {
        name: "กระบี่",
        region: "ใต้",
        score: 84
    },

    {
        name: "สุราษฎร์ธานี",
        region: "ใต้",
        score: 82
    },

    {
        name: "เชียงราย",
        region: "เหนือ",
        score: 79
    },

    {
        name: "กาญจนบุรี",
        region: "กลาง",
        score: 77
    },

    {
        name: "นครราชสีมา",
        region: "ตะวันออกเฉียงเหนือ",
        score: 75
    },

    {
        name: "ขอนแก่น",
        region: "ตะวันออกเฉียงเหนือ",
        score: 74
    },

    {
        name: "ระยอง",
        region: "ตะวันออก",
        score: 73
    },

    {
        name: "เพชรบุรี",
        region: "กลาง",
        score: 72
    },

    {
        name: "สงขลา",
        region: "ใต้",
        score: 71
    },

    {
        name: "นครศรีธรรมราช",
        region: "ใต้",
        score: 70
    },

    {
        name: "อุดรธานี",
        region: "ตะวันออกเฉียงเหนือ",
        score: 69
    },

    {
        name: "อุบลราชธานี",
        region: "ตะวันออกเฉียงเหนือ",
        score: 68
    },

    {
        name: "เลย",
        region: "ตะวันออกเฉียงเหนือ",
        score: 67
    },

    {
        name: "สุโขทัย",
        region: "เหนือ",
        score: 66
    },

    {
        name: "น่าน",
        region: "เหนือ",
        score: 65
    },

    {
        name: "เพชรบูรณ์",
        region: "เหนือ",
        score: 64
    },

    {
        name: "ลำปาง",
        region: "เหนือ",
        score: 63
    },

    {
        name: "ลำพูน",
        region: "เหนือ",
        score: 62
    },

    {
        name: "แม่ฮ่องสอน",
        region: "เหนือ",
        score: 61
    },

    {
        name: "ตราด",
        region: "ตะวันออก",
        score: 60
    },

    {
        name: "ราชบุรี",
        region: "กลาง",
        score: 59
    },

    {
        name: "นครปฐม",
        region: "กลาง",
        score: 58
    },

    {
        name: "สระบุรี",
        region: "กลาง",
        score: 57
    },

    {
        name: "สมุทรปราการ",
        region: "กลาง",
        score: 56
    },

    {
        name: "สมุทรสงคราม",
        region: "กลาง",
        score: 55
    },

    {
        name: "พังงา",
        region: "ใต้",
        score: 54
    },

    {
        name: "พัทลุง",
        region: "ใต้",
        score: 53
    },

    {
        name: "สุรินทร์",
        region: "ตะวันออกเฉียงเหนือ",
        score: 52
    },

    {
        name: "บุรีรัมย์",
        region: "ตะวันออกเฉียงเหนือ",
        score: 51
    },

    {
        name: "ร้อยเอ็ด",
        region: "ตะวันออกเฉียงเหนือ",
        score: 50
    },

    {
        name: "หนองคาย",
        region: "ตะวันออกเฉียงเหนือ",
        score: 49
    },

    {
        name: "สกลนคร",
        region: "ตะวันออกเฉียงเหนือ",
        score: 48
    }

];


/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(pageId, element) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageId);

    if (!page) {
        console.error("ไม่พบ Page ID:", pageId);
        return;
    }

    page.classList.add("active-page");

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    setTimeout(function () {

        if (pageId === "mapPage" && mapLarge) {
            mapLarge.invalidateSize();
        }

        if (pageId === "dashboard" && map) {
            map.invalidateSize();
        }

        if (pageId === "dashboard" && tourismChart) {
            tourismChart.resize();
            tourismChart.update("none");
        }

        if (pageId === "trends" && trendChart) {
            trendChart.resize();
            trendChart.update("none");
        }

        if (pageId === "shap" && shapChart) {
            shapChart.resize();
            shapChart.update("none");
        }

    }, 250);
}


/* =========================================================
   CHANGE YEAR
========================================================= */

function changeYear() {

    const select = document.getElementById("yearSelect");

    if (!select) return;

    const year = select.value;

    const data = tourismData[year];

    if (!data) return;

    const touristValue =
        document.getElementById("touristValue");

    const incomeValue =
        document.getElementById("incomeValue");

    if (touristValue) {
        touristValue.textContent = data.tourists;
    }

    if (incomeValue) {
        incomeValue.textContent = data.income;
    }

    createTourismChart();

}


/* =========================================================
   TOURISM CHART
========================================================= */

function createTourismChart() {

    const canvas =
        document.getElementById("tourismChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    if (tourismChart) {
        tourismChart.destroy();
        tourismChart = null;
    }

    const context = canvas.getContext("2d");

    tourismChart = new Chart(context, {

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
                    label: "นักท่องเที่ยว",
                    data: [
                        200,
                        71,
                        39.7,
                        88.2,
                        139.8,
                        155.6,
                        162.3
                    ],

                    borderWidth: 2,

                    tension: .35,

                    pointRadius: 3
                },

                {
                    label: "รายได้ท่องเที่ยว (ล้านล้านบาท)",
                    data: [
                        3.01,
                        1.23,
                        .63,
                        1.08,
                        2.17,
                        2.32,
                        2.38
                    ],

                    borderWidth: 2,

                    tension: .35,

                    pointRadius: 3
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


/* =========================================================
   TREND CHART
========================================================= */

function createTrendChart() {

    const canvas =
        document.getElementById("trendChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    if (trendChart) {
        trendChart.destroy();
        trendChart = null;
    }

    trendChart = new Chart(
        canvas.getContext("2d"),
        {

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
                        label: "Tourism Score",

                        data: [
                            78,
                            32,
                            25,
                            43,
                            63,
                            69,
                            72
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
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }

            }

        }
    );

}


/* =========================================================
   SHAP CHART
========================================================= */

function createShapChart() {

    const canvas =
        document.getElementById("shapChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    if (shapChart) {
        shapChart.destroy();
        shapChart = null;
    }

    shapChart = new Chart(
        canvas.getContext("2d"),
        {

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
                        label: "Mean |SHAP value|",

                        data: [
                            0.32,
                            0.26,
                            0.18,
                            0.14,
                            0.10
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

        }
    );

}


/* =========================================================
   TOP RANKING
========================================================= */

function createTopRanking() {

    const container =
        document.getElementById("topRanking");

    if (!container) return;

    const top =
        [...provinces]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

    container.innerHTML = "";

    top.forEach((province, index) => {

        const item =
            document.createElement("div");

        item.className = "rank";

        item.innerHTML = `

            <div class="number ${index === 0 ? "first" : ""}">
                ${index + 1}
            </div>

            <div>

                <strong>
                    ${province.name}
                </strong>

                <div class="rank-bar">
                    <span style="width:${province.score}%"></span>
                </div>

            </div>

            <b>
                ${province.score}
            </b>

        `;

        container.appendChild(item);

    });

}


/* =========================================================
   PROVINCES
========================================================= */

function renderProvinces(list = provinces) {

    const container =
        document.getElementById("provinceGrid");

    if (!container) return;

    container.innerHTML = "";

    list.forEach(province => {

        const card =
            document.createElement("div");

        card.className = "province-card";

        card.innerHTML = `

            <h3>
                ${province.name}
            </h3>

            <p>
                ภาค${province.region}
            </p>

            <div class="province-score">

                <span>
                    Tourism Score
                </span>

                <strong>
                    ${province.score}
                </strong>

            </div>

        `;

        container.appendChild(card);

    });

}


/* =========================================================
   SEARCH PROVINCE
========================================================= */

function searchProvince() {

    const input =
        document.getElementById("provinceSearch");

    if (!input) return;

    const keyword =
        input.value.trim().toLowerCase();

    const filtered =
        provinces.filter(province =>
            province.name
                .toLowerCase()
                .includes(keyword)
        );

    renderProvinces(filtered);

}


/* =========================================================
   AI ANALYSIS
========================================================= */

function runAI() {

    const select =
        document.getElementById("provinceSelect");

    const result =
        document.getElementById("aiResult");

    if (!select || !result) return;

    const provinceName =
        select.value;

    const province =
        provinces.find(
            item => item.name === provinceName
        );

    const score =
        province ? province.score : 70;

    let level = "ปานกลาง";

    if (score >= 85) {
        level = "สูงมาก";
    }
    else if (score >= 75) {
        level = "สูง";
    }
    else if (score < 60) {
        level = "ต่ำ";
    }

    result.innerHTML = `

        <div class="card">

            <div class="eyebrow">
                AI RESULT
            </div>

            <h2>
                ${provinceName}
            </h2>

            <p style="margin:8px 0 18px;">
                ระบบประเมิน Tourism Score
                ของจังหวัดที่เลือก
            </p>

            <div class="budget-destination">

                <span>
                    Tourism Score
                </span>

                <strong>
                    ${score}
                </strong>

            </div>

            <div class="budget-destination">

                <span>
                    ระดับการท่องเที่ยว
                </span>

                <strong>
                    ${level}
                </strong>

            </div>

            <div class="ai-card" style="margin-top:15px;">

                <div class="ai-icon">
                    ✦
                </div>

                <div>

                    <h2>
                        Explainable AI
                    </h2>

                    <p>
                        ปัจจัยตัวอย่างที่มีอิทธิพลต่อคะแนน
                        ได้แก่ รายได้ประชากร แหล่งท่องเที่ยว
                        จำนวนที่พัก ค่าเดินทาง และสภาพอากาศ
                    </p>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   RANKING TABLE
========================================================= */

function showRanking() {

    const container =
        document.getElementById("rankingTable");

    if (!container) return;

    const sorted =
        [...provinces]
            .sort((a, b) => b.score - a.score);

    let html = `

        <div class="ranking-table-wrapper">

            <table class="ranking-table">

                <thead>

                    <tr>

                        <th>
                            อันดับ
                        </th>

                        <th>
                            จังหวัด
                        </th>

                        <th>
                            ภาค
                        </th>

                        <th>
                            Tourism Score
                        </th>

                    </tr>

                </thead>

                <tbody>

    `;

    sorted.forEach((province, index) => {

        let rankClass = "";

        if (index === 0) {
            rankClass = "rank-gold";
        }
        else if (index === 1) {
            rankClass = "rank-silver";
        }
        else if (index === 2) {
            rankClass = "rank-bronze";
        }

        html += `

            <tr>

                <td>

                    <div class="ranking-number ${rankClass}">
                        ${index + 1}
                    </div>

                </td>

                <td>
                    <strong>
                        ${province.name}
                    </strong>
                </td>

                <td>

                    <span class="region">
                        ${province.region}
                    </span>

                </td>

                <td>

                    <div class="score-container">

                        <span class="score">
                            ${province.score}
                        </span>

                        <div class="score-bar">

                            <span
                                style="width:${province.score}%">
                            </span>

                        </div>

                    </div>

                </td>

            </tr>

        `;

    });

    html += `

                </tbody>

            </table>

        </div>

    `;

    container.innerHTML = html;

}


/* =========================================================
   MAP
========================================================= */

function createMap() {

    const element =
        document.getElementById("map");

    if (!element || typeof L === "undefined") {
        return;
    }

    if (map) {
        map.remove();
        map = null;
    }

    map =
        L.map(element).setView(
            [13.7367, 100.5231],
            5
        );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    provinces.forEach(province => {

        /*
         * ตัวอย่างตำแหน่งแบบประมาณการ
         * ใช้สำหรับ Demo เท่านั้น
         */

        const lat =
            12.5 +
            Math.random() * 7;

        const lng =
            98.5 +
            Math.random() * 5;

        const marker =
            L.circleMarker(
                [lat, lng],
                {
                    radius: 7,
                    fillOpacity: .75,
                    weight: 1
                }
            ).addTo(map);

        marker.bindPopup(`

            <strong>
                ${province.name}
            </strong>

            <br>

            Tourism Score:
            ${province.score}

        `);

    });

}


/* =========================================================
   LARGE MAP
========================================================= */

function createLargeMap() {

    const element =
        document.getElementById("mapLarge");

    if (!element || typeof L === "undefined") {
        return;
    }

    if (mapLarge) {
        mapLarge.remove();
        mapLarge = null;
    }

    mapLarge =
        L.map(element).setView(
            [13.7367, 100.5231],
            5
        );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(mapLarge);


    provinces.forEach(province => {

        const lat =
            12.5 +
            Math.random() * 7;

        const lng =
            98.5 +
            Math.random() * 5;

        const marker =
            L.circleMarker(
                [lat, lng],
                {
                    radius: 8,
                    fillOpacity: .75,
                    weight: 1
                }
            ).addTo(mapLarge);

        marker.bindPopup(`

            <strong>
                ${province.name}
            </strong>

            <br>

            Tourism Score:
            ${province.score}

        `);

    });

}


/* =========================================================
   TRAVEL BUDGET
========================================================= */

function calculateBudget() {

    const total =
        Number(
            document.getElementById(
                "budgetTotal"
            )?.value
        ) || 0;

    const days =
        Number(
            document.getElementById(
                "travelDays"
            )?.value
        ) || 1;

    const people =
        Number(
            document.getElementById(
                "travelPeople"
            )?.value
        ) || 1;

    const hotelPerNight =
        Number(
            document.getElementById(
                "hotelCost"
            )?.value
        ) || 0;

    const foodPerPersonDay =
        Number(
            document.getElementById(
                "foodCost"
            )?.value
        ) || 0;

    const transport =
        Number(
            document.getElementById(
                "transportCost"
            )?.value
        ) || 0;

    const other =
        Number(
            document.getElementById(
                "otherCost"
            )?.value
        ) || 0;


    const hotel =
        hotelPerNight *
        Math.max(days - 1, 1);

    const food =
        foodPerPersonDay *
        people *
        days;

    const totalCost =
        hotel +
        food +
        transport +
        other;

    const remaining =
        total -
        totalCost;

    const perPerson =
        totalCost /
        people;

    const perDay =
        totalCost /
        days;


    const province =
        document.getElementById(
            "travelProvince"
        )?.value || "-";


    setText(
        "provinceResult",
        province
    );

    setText(
        "hotelResult",
        formatMoney(hotel)
    );

    setText(
        "foodResult",
        formatMoney(food)
    );

    setText(
        "transportResult",
        formatMoney(transport)
    );

    setText(
        "otherResult",
        formatMoney(other)
    );

    setText(
        "totalResult",
        formatMoney(totalCost)
    );

    setText(
        "remainingResult",
        formatMoney(remaining)
    );

    setText(
        "perPersonResult",
        formatMoney(perPerson)
    );

    setText(
        "perDayResult",
        formatMoney(perDay)
    );


    const status =
        document.getElementById(
            "budgetStatus"
        );

    if (!status) return;

    status.classList.remove(
        "success",
        "danger"
    );


    if (remaining >= 0) {

        status.classList.add(
            "success"
        );

        status.textContent =
            "✓ งบประมาณเพียงพอ " +
            "และยังเหลือ " +
            formatMoney(remaining);

    }
    else {

        status.classList.add(
            "danger"
        );

        status.textContent =
            "⚠ งบประมาณไม่เพียงพอ " +
            "เกินงบ " +
            formatMoney(
                Math.abs(remaining)
            );

    }

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(value) {

    return (
        Number(value) || 0
    ).toLocaleString(
        "th-TH",
        {
            maximumFractionDigits: 0
        }
    ) + " บาท";

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* =========================================================
   REPORT MESSAGE
========================================================= */

function showReportMessage() {

    alert(
        "ระบบรายงาน Tourism Analysis\n\n" +
        "ส่วนนี้เป็นตัวอย่างสำหรับโครงงาน " +
        "สามารถเชื่อมต่อกับระบบสร้าง PDF " +
        "ได้ในขั้นตอนถัดไป"
    );

}


/* =========================================================
   DATA MESSAGE
========================================================= */

function showDataMessage() {

    alert(
        "Province Dataset\n\n" +
        "ข้อมูลจังหวัดตัวอย่างถูกนำมาใช้ " +
        "เพื่อสาธิต Dashboard และ Machine Learning"
    );

}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (appInitialized) {
            return;
        }

        appInitialized = true;


        /* Charts */

        createTourismChart();

        createTrendChart();

        createShapChart();


        /* Ranking */

        createTopRanking();

        showRanking();


        /* Provinces */

        renderProvinces();


        /* Maps */

        createMap();

        createLargeMap();


        /* Budget */

        calculateBudget();

    }
);