#! /usr/bin/env node
import inquirer from "inquirer";
// Data
const students = [];
const courses = [];
const departments = [];
const Admin = { username: "admin", password: "admin123" };
const gradingScheme = [
    "A , 4",
    "A- , 3.7",
    "B+ , 3.3",
    "B , 3",
    "B- , 2.7",
    "C+ , 2.3",
    "C , 2",
    "C- , 1.7",
    "D+ , 1.3",
    "F , 0",
];
// Classes
class Department {
    name;
    code;
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
class Course {
    name;
    code;
    department;
    constructor(name, code, department) {
        this.name = name;
        this.code = code;
        this.department = department;
    }
}
class Student {
    name;
    department;
    cnic;
    rollNumber;
    email;
    password;
    courses = [];
    result = [];
    constructor(name, department, cnic, students) {
        this.name = name;
        this.department = department;
        this.cnic = cnic;
        this.rollNumber = "2022" + this.department.code + (students.length + 1);
        this.email = this.rollNumber + "@student.uet.edu.pk";
        this.password = this.generateString(6);
    }
    enrollCourse(course) {
        this.courses.push(course);
        console.log(this.rollNumber +
            " has been successfully enrolled in " +
            course.name +
            "!");
    }
    enterResult(courseCode, grade) {
        this.courses.forEach((course) => {
            if (course.code === courseCode) {
                let result1 = { course, grade };
                this.result.push(result1);
                console.log("Grade " +
                    grade +
                    " has been successfully entered for " +
                    this.rollNumber +
                    " in " +
                    course.name);
                return true;
            }
        });
        return false;
    }
    generateString(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
// Show menus
async function addDeptQuests() {
    await inquirer
        .prompt([
        {
            type: "input",
            name: "deptName",
            message: "Enter name of department: ",
        },
        {
            type: "input",
            name: "deptCode",
            message: "Enter code or short name for this department (like cs for Computer Science): ",
        },
    ])
        .then((answer) => {
        let department = new Department(answer.deptName, answer.deptCode);
        departments.push(department);
        console.log(department.name + " as a department added successfully!");
    });
}
async function addCrsQuests() {
    await inquirer
        .prompt([
        {
            type: "input",
            name: "courseName",
            message: "Enter course name: ",
        },
        {
            type: "input",
            name: "courseCode",
            message: "Enter course code: ",
        },
        {
            type: "list",
            name: "courseDept",
            message: "Select department which offers this course: ",
            choices: function () {
                let deptName1 = [];
                departments.forEach((dept) => {
                    deptName1.push(dept.name);
                });
                return deptName1;
            },
        },
    ])
        .then((answer) => {
        let debt1 = "";
        departments.forEach((debt) => {
            if (debt.name === answer.courseDept) {
                debt1 = debt;
            }
        });
        if (typeof debt1 !== "string") {
            //narrowing
            let course1 = new Course(answer.courseName, answer.courseCode, debt1);
            courses.push(course1);
            console.log(course1.name + " as a course added successfully!");
        }
    });
}
async function addStdQuests() {
    await inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student full name: ",
        },
        {
            type: "input",
            name: "cnic",
            message: "Enter student CNIC: ",
        },
        {
            type: "list",
            name: "department",
            message: "Select department in which student is to admit:",
            choices: function () {
                let debt = [];
                departments.forEach((debt1) => {
                    debt.push(debt1.name);
                });
                return debt;
            },
        },
    ])
        .then((answer) => {
        let debt1 = "";
        departments.forEach((debt) => {
            if (debt.name === answer.department) {
                debt1 = debt;
            }
        });
        if (typeof debt1 !== "string") {
            //narrowing
            let student = new Student(answer.name, debt1, answer.cnic, students);
            students.push(student);
            console.log(student.name + " has been added successfully!");
            console.log(student.name + "'s registration/roll number is: " + student.rollNumber);
            console.log(student.name + "'s email is: " + student.email);
            console.log(student.name + "'s password for LMS login is: " + student.password);
        }
    });
}
async function rmvStdQuests() {
    await inquirer
        .prompt({
        type: "input",
        name: "rollNo",
        message: "Enter registration/roll number of the student: ",
    })
        .then((answer) => {
        let flag1 = false;
        for (let i = 0; i < students.length; i++) {
            if (students[i].rollNumber === answer.rollNo) {
                flag1 = true;
                students.splice(i, 1);
                console.log(students[i].name +
                    ", " +
                    students[i].rollNumber +
                    " has been removed successfully!");
            }
        }
        if (!flag1) {
            console.log("No student found with roll number(" + answer.rollNo + ")...!");
        }
    });
}
async function enterRsltQuests() {
    await inquirer
        .prompt({
        type: "input",
        name: "student",
        message: "Enter student registration/roll number: ",
    })
        .then((answer) => {
        for (let i = 0; i < students.length; i++) {
            if (students[i].rollNumber === answer.student) {
                if (students[i].courses.length == 0) {
                    console.log("This student is not enrolled in any course yet...!");
                }
                else {
                    crsResultQuests(i);
                }
            }
        }
    });
}
async function crsResultQuests(i) {
    return await inquirer
        .prompt([
        {
            type: "list",
            name: "courseCode",
            message: "Select course to enter grade: ",
            choices: function () {
                let courseCodes = [];
                students[i].courses.forEach((crs) => {
                    courseCodes.push(crs.name + ", " + crs.code);
                });
                return courseCodes;
            },
        },
        {
            type: "list",
            name: "grade",
            message: "Select grade to give: ",
            choices: gradingScheme,
        },
    ])
        .then((answer1) => {
        let crsCode = answer1.courseCode.split(",")[1];
        students[i].enterResult(crsCode, answer1.grade);
    });
}
async function enrollCrsQuests(student) {
    await inquirer
        .prompt({
        type: "list",
        name: "course",
        message: "Select course you want to enroll in: ",
        choices: function () {
            let coursesName = [];
            courses.forEach((courseName) => {
                let str = courseName.name + ", " + courseName.code;
                coursesName.push(str);
            });
            return coursesName;
        },
    })
        .then((answer) => {
        let courseCode = answer.course.split(",")[1];
        courses.forEach((course1) => {
            if (course1.code === courseCode) {
                student.enrollCourse(course1);
            }
        });
    });
}
async function adminMenu() {
    await inquirer
        .prompt({
        type: "list",
        name: "menu",
        message: "Select an option from the menu: ",
        choices: [
            "Add Department",
            "Add a Course",
            "Add Student",
            "Remove Student",
            "Enter Result",
            "Logout",
        ],
    })
        .then(async (answers) => {
        await driveAdminMenu(answers);
    });
    await adminMenu();
}
async function driveAdminMenu(answers) {
    let str = await answers.menu;
    if (str === "Add Department") {
        await addDeptQuests();
    }
    else if (str === "Add a Course") {
        if (departments.length === 0) {
            console.log("First add a department...!");
        }
        else {
            await addCrsQuests();
        }
    }
    else if (str === "Add Student") {
        await addStdQuests();
    }
    else if (str === "Remove Student") {
        await rmvStdQuests();
    }
    else if (str === "Enter Result") {
        let flag = false;
        await enterRsltQuests();
    }
    else if (str === "Logout") {
        await login();
    }
}
async function studentMenu(student) {
    await inquirer
        .prompt({
        type: "list",
        name: "menu",
        message: "Select an option from the menu: ",
        choices: ["Enroll course", "View Result"],
    })
        .then(async (answers) => {
        // first option
        if (answers.menu === "Enroll course") {
            await enrollCrsQuests(student);
        }
        // second option
        else if (answers.menu === "View Result") {
            if (student.result.length === 0) {
                console.log("No result is found for " + student.rollNumber + "!");
            }
            else {
                student.result.forEach((subResult) => {
                    console.log("Course: " +
                        subResult.course.name +
                        ", " +
                        subResult.course.code +
                        "\tGrade: " +
                        subResult.grade +
                        "\n");
                });
            }
        }
    });
    await studentMenu(student);
}
// Login
async function login() {
    await inquirer
        .prompt([
        {
            type: "input",
            name: "username",
            message: "Enter username or email: ",
        },
        {
            type: "input",
            name: "password",
            message: "Enter password: ",
        },
    ])
        .then(async (answers) => {
        if (answers.username === Admin.username
            && answers.password === Admin.password) {
            await adminMenu();
        }
        else {
            let flag = false;
            students.forEach(async (std) => {
                if (answers.username === std.email
                // && answers.password === std.password
                ) {
                    console.log("\n...check...\n");
                    flag = true;
                    await studentMenu(std);
                }
            });
            if (!flag) {
                console.log("Invalid credentials...!\n\nLogin again!");
                await login();
            }
        }
    });
}
// driver
await login();
