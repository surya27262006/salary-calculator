/* =========================================
   SALARY CALCULATOR
   ========================================= */


/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(value) {

    return "₹" + Number(value).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


/* =========================================
   GET NUMBER OF DAYS IN MONTH
========================================= */

function getDaysInMonth(month) {

    /*
       We use a leap year here so February
       gets 29 days.

       The salary month can therefore
       automatically calculate the days.
    */

    let year = 2028;

    return new Date(
        year,
        month,
        0
    ).getDate();

}


/* =========================================
   GET MONTH NAME
========================================= */

function getMonthName(month) {

    const months = [

        "",

        "January",

        "February",

        "March",

        "April",

        "May",

        "June",

        "July",

        "August",

        "September",

        "October",

        "November",

        "December"

    ];

    return months[month];

}


/* =========================================
   CALCULATE SALARY
========================================= */

function calculateSalary() {


    /* -------------------------------------
       INPUT VALUES
    ------------------------------------- */


    let ctc =
        Number(
            document.getElementById("ctc").value
        );


    let month =
        Number(
            document.getElementById("month").value
        );


    let casualLeave =
        Number(
            document.getElementById("casualLeave").value
        ) || 0;


    let purchase =
        Number(
            document.getElementById("purchase").value
        ) || 0;


    let penalty =
        Number(
            document.getElementById("penalty").value
        ) || 0;


    /* -------------------------------------
       VALIDATION
    ------------------------------------- */


    if (ctc <= 0) {

        alert(
            "Please enter a valid Annual CTC."
        );

        return;
    }


    if (casualLeave < 0) {

        alert(
            "Casual Leave cannot be negative."
        );

        return;
    }


    /* =====================================
       1. MONTHLY CTC
    ===================================== */

    let monthlyCTC =
        ctc / 12;


    /* =====================================
       2. BASIC + DA
    ===================================== */

    let basicDA =
        monthlyCTC * 0.50;


    /* =====================================
       3. HRA
    ===================================== */

    let hra =
        monthlyCTC * 0.30;


    /* =====================================
       4. FLEXI
    ===================================== */

    let flexi =
        monthlyCTC * 0.20;


    /* =====================================
       5. GROSS
    ===================================== */

    let gross =
        basicDA +
        hra +
        flexi;


    /* =====================================
       6. PF BASE

       Your company rule:

       If Gross < ₹25,000
       → PF Base = actual Gross

       If Gross >= ₹25,000
       → PF Base = ₹25,000
    ===================================== */

    let pfBase;


    if (gross < 25000) {

        pfBase = gross;

    } else {

        pfBase = 25000;

    }


    /* =====================================
       7. EMPLOYEE PF

       12%
    ===================================== */

    let employeePF =
        pfBase * 0.12;


    /* =====================================
       8. EMPLOYER PF

       Your rule:
       Employer PF is also 12%

       Maximum = ₹3,000
    ===================================== */

    let employerPF =
        pfBase * 0.12;


    /* =====================================
       9. ESI

       Gross below ₹21,000
       → 0.75%

       Gross ₹21,000 or above
       → 0
    ===================================== */

    let esi = 0;


    if (gross < 21000) {

        esi =
            gross * 0.0075;

    }


    /* =====================================
       10. DAYS IN MONTH
    ===================================== */

    let daysInMonth =
        getDaysInMonth(month);


    /* =====================================
       11. CASUAL LEAVE

       1 CL is allowed.

       Example:

       CL = 0 → LOP 0

       CL = 1 → LOP 0

       CL = 2 → LOP 1

       CL = 3 → LOP 2
    ===================================== */

    let allowedCasualLeave = 1;


    let lopDays =
        Math.max(
            0,
            casualLeave - allowedCasualLeave
        );


    /* =====================================
       12. PER DAY SALARY

       Gross ÷ Days in Month
    ===================================== */

    let perDaySalary =
        gross / daysInMonth;


    /* =====================================
       13. LOP DEDUCTION
    ===================================== */

    let leaveDeduction =
        perDaySalary * lopDays;


    /* =====================================
       14. TOTAL DEDUCTION

       According to your company's
       calculation:

       Employee PF
       + Employer PF
       + ESI
       + Purchase
       + Penalty
       + LOP
    ===================================== */

    let totalDeduction =

        employeePF +

        employerPF +

        esi +

        purchase +

        penalty +

        leaveDeduction;


    /* =====================================
       15. NET SALARY
    ===================================== */

    let netSalary =
        gross - totalDeduction;


    /* =====================================
       SEND VALUES TO RESULT PAGE
    ===================================== */

    let params =
        new URLSearchParams();


    params.set(
        "ctc",
        ctc
    );


    params.set(
        "monthly",
        monthlyCTC
    );


    params.set(
        "month",
        month
    );


    params.set(
        "basic",
        basicDA
    );


    params.set(
        "hra",
        hra
    );


    params.set(
        "flexi",
        flexi
    );


    params.set(
        "gross",
        gross
    );


    params.set(
        "pfBase",
        pfBase
    );


    params.set(
        "employeePF",
        employeePF
    );


    params.set(
        "employerPF",
        employerPF
    );


    params.set(
        "esi",
        esi
    );


    params.set(
        "casualLeave",
        casualLeave
    );


    params.set(
        "lopDays",
        lopDays
    );


    params.set(
        "daysInMonth",
        daysInMonth
    );


    params.set(
        "perDaySalary",
        perDaySalary
    );


    params.set(
        "leaveDeduction",
        leaveDeduction
    );


    params.set(
        "purchase",
        purchase
    );


    params.set(
        "penalty",
        penalty
    );


    params.set(
        "totalDeduction",
        totalDeduction
    );


    params.set(
        "netSalary",
        netSalary
    );


    /* =====================================
       OPEN RESULT PAGE
    ===================================== */

    window.location.href =
        "result.html?" +
        params.toString();

}


/* =========================================
   GET VALUE FROM URL
========================================= */

function getValue(name) {

    let params =
        new URLSearchParams(
            window.location.search
        );


    return Number(
        params.get(name)
    ) || 0;

}


/* =========================================
   SHOW RESULTS
========================================= */

function showResults() {


    let ctc =
        getValue("ctc");


    /* If result page is opened directly */

    if (ctc === 0) {

        window.location.href =
            "index.html";

        return;
    }


    /* =====================================
       CTC
    ===================================== */

    document.getElementById(
        "annualCTC"
    ).textContent =
        formatMoney(ctc);


    document.getElementById(
        "monthlyCTC"
    ).textContent =
        formatMoney(
            getValue("monthly")
        );


    /* =====================================
       MONTH
    ===================================== */

    let month =
        getValue("month");


    document.getElementById(
        "salaryMonth"
    ).textContent =
        getMonthName(month);


    document.getElementById(
        "daysInMonth"
    ).textContent =
        getValue("daysInMonth");


    /* =====================================
       SALARY COMPONENTS
    ===================================== */

    document.getElementById(
        "basicDA"
    ).textContent =
        formatMoney(
            getValue("basic")
        );


    document.getElementById(
        "hra"
    ).textContent =
        formatMoney(
            getValue("hra")
        );


    document.getElementById(
        "flexi"
    ).textContent =
        formatMoney(
            getValue("flexi")
        );


    document.getElementById(
        "gross"
    ).textContent =
        formatMoney(
            getValue("gross")
        );


    /* =====================================
       PF & ESI
    ===================================== */

    document.getElementById(
        "pfBase"
    ).textContent =
        formatMoney(
            getValue("pfBase")
        );


    document.getElementById(
        "employeePF"
    ).textContent =
        formatMoney(
            getValue("employeePF")
        );


    document.getElementById(
        "employerPF"
    ).textContent =
        formatMoney(
            getValue("employerPF")
        );


    document.getElementById(
        "esi"
    ).textContent =
        formatMoney(
            getValue("esi")
        );


    /* =====================================
       LEAVE
    ===================================== */

    document.getElementById(
        "casualLeave"
    ).textContent =
        getValue("casualLeave");


    document.getElementById(
        "lopDays"
    ).textContent =
        getValue("lopDays");


    document.getElementById(
        "perDaySalary"
    ).textContent =
        formatMoney(
            getValue("perDaySalary")
        );


    document.getElementById(
        "leaveDeduction"
    ).textContent =
        formatMoney(
            getValue("leaveDeduction")
        );


    /* =====================================
       OTHER DEDUCTIONS
    ===================================== */

    document.getElementById(
        "purchase"
    ).textContent =
        formatMoney(
            getValue("purchase")
        );


    document.getElementById(
        "penalty"
    ).textContent =
        formatMoney(
            getValue("penalty")
        );


    document.getElementById(
        "totalDeduction"
    ).textContent =
        formatMoney(
            getValue("totalDeduction")
        );


    /* =====================================
       NET SALARY
    ===================================== */

    document.getElementById(
        "netSalary"
    ).textContent =
        formatMoney(
            getValue("netSalary")
        );

}


/* =========================================
   BACK BUTTON
========================================= */

function goBack() {

    window.location.href =
        "index.html";

}


/* =========================================
   RUN RESULT PAGE
========================================= */

if (
    document.getElementById("annualCTC")
) {

    showResults();

}