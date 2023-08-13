// Your code here

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(data => createEmployeeRecord(data));
}

function createTimeInEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date: date });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date: date });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }

    return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payPerHour = employeeRecord.payPerHour;

    return hoursWorked * payPerHour;
}

function calculatePayroll(employeeRecordsArray) {
    return employeeRecordsArray.reduce((totalWages, employeeRecord) => {
        return totalWages + allWagesFor(employeeRecord);
    }, 0);
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
}

const employeeDataArray = [
    ["John", "Doe", "Manager", 15],
    ["Jane", "Smith", "Employee", 10]
];

const employeeRecordsArray = createEmployeeRecords(employeeDataArray);
console.log(calculatePayroll(employeeRecordsArray)); 




