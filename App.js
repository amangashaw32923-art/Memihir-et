document.addEventListener("DOMContentLoaded", function () {

    const students = [
        {
            name: "Abel Tadesse",
            grade: 10,
            score: 85,
            status: "active"
        },
        {
            name: "Sara Bekele",
            grade: 11,
            score: 92,
            status: "active"
        },
        {
            name: "Dawit Hailu",
            grade: 9,
            score: 78,
            status: "active"
        },
        {
            name: "Meron Assefa",
            grade: 10,
            score: 88,
            status: "active"
        },
        {
            name: "Yonas Kebede",
            grade: 12,
            score: 65,
            status: "inactive"
        }
    ];


    function renderTable(filter) {

        const studentBody =
            document.querySelector("#student-body");

        studentBody.innerHTML = "";


        for (let i = 0; i < students.length; i++) {

            const student = students[i];

            if (
                filter !== "all" &&
                student.grade !== Number(filter)
            ) {
                continue;
            }


            const row = document.createElement("tr");


            const nameCell = document.createElement("td");
            nameCell.textContent = student.name;


            const gradeCell = document.createElement("td");
            gradeCell.textContent = student.grade;


            const scoreCell = document.createElement("td");
            scoreCell.textContent = student.score;


            const statusCell = document.createElement("td");

            const status = document.createElement("span");

            status.textContent = student.status;

            status.classList.add(
                "badge",
                student.status
            );

            statusCell.appendChild(status);


            row.appendChild(nameCell);
            row.appendChild(gradeCell);
            row.appendChild(scoreCell);
            row.appendChild(statusCell);

            studentBody.appendChild(row);
        }


        updateStats();
    }


    function updateStats() {

        let totalScore = 0;
        let activeStudents = 0;


        for (let i = 0; i < students.length; i++) {

            totalScore =
                totalScore + students[i].score;


            if (students[i].status === "active") {

                activeStudents =
                    activeStudents + 1;
            }
        }


        let average = 0;

        if (students.length > 0) {

            average =
                Math.round(
                    totalScore / students.length
                );
        }


        document.querySelector("#total-count")
            .textContent = students.length;

        document.querySelector("#avg-score")
            .textContent = average;

        document.querySelector("#active-count")
            .textContent = activeStudents;
    }


    document.querySelector("#grade-filter")
        .addEventListener("change", function () {

            renderTable(this.value);

        });


    document.querySelector("#add-btn")
        .addEventListener("click", function () {

            document.querySelector("#enroll-form")
                .classList.toggle("hidden");

        });


    document.querySelector("#submit-btn")
        .addEventListener("click", function () {

            const name =
                document.querySelector("#inp-name")
                .value.trim();

            const email =
                document.querySelector("#inp-email")
                .value.trim();

            const grade =
                Number(
                    document.querySelector("#inp-grade")
                    .value
                );

            const score =
                Number(
                    document.querySelector("#inp-score")
                    .value
                );

            const error =
                document.querySelector("#error-msg");


            error.classList.add("hidden");


            if (name === "") {

                error.textContent =
                    "Please enter the student's name.";

                error.classList.remove("hidden");

                return;
            }


            if (
                email !== "" &&
                !email.includes("@")
            ) {

                error.textContent =
                    "Please enter a valid email.";

                error.classList.remove("hidden");

                return;
            }


            if (grade < 9 || grade > 12) {

                error.textContent =
                    "Grade must be between 9 and 12.";

                error.classList.remove("hidden");

                return;
            }


            if (score < 0 || score > 100) {

                error.textContent =
                    "Score must be between 0 and 100.";

                error.classList.remove("hidden");

                return;
            }


            students.push({
                name: name,
                grade: grade,
                score: score,
                status: "active"
            });


            renderTable("all");


            document.querySelector("#inp-name")
                .value = "";

            document.querySelector("#inp-email")
                .value = "";

            document.querySelector("#inp-grade")
                .value = "";

            document.querySelector("#inp-score")
                .value = "";


            document.querySelector("#enroll-form")
                .classList.add("hidden");

        });


    renderTable("all");

});
