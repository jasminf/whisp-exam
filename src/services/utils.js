import _ from "lodash";
import moment from "moment";

const TOP_SELLERS_COUNT = 3;

/**
 * Group all booking data by employee ID
 */
function _groupByEmployee(bookingData) {
    const NO_EMPLOYEE = 'no-employee';

    const bookingsGroupedByEmployee = _.groupBy(bookingData, (booking)=> {
        const { employee } = booking;

        return employee ? employee.id : NO_EMPLOYEE
    });
    // ignore bookings without an "employee" field
    delete bookingsGroupedByEmployee[NO_EMPLOYEE];

    return bookingsGroupedByEmployee
}

/**
 * For each employee sum all sold hours
 */
function _sumTotalHoursSoldForEmployee(employeeBookings) {
    const totalHoursSold = _.sumBy(employeeBookings, (booking)=> {
        const {
            checkInDate: checkInDateStr,
            checkOutDate: checkOutDateStr
        } = booking;

        const checkInDate = moment(checkInDateStr, "DD-MM-YYYY");
        const checkOutDate = moment(checkOutDateStr, "DD-MM-YYYY");
        const hoursSold = checkOutDate.diff(checkInDate, 'hours');

        return hoursSold;
    });

    return totalHoursSold;
}

/**
 * 1. Get top 3 employees by sum of hours
 * 2. For each employee sum all sold hours
 * 3. Group all booking data by employee ID
 */
function calculateTopSellers(bookingData, limit = TOP_SELLERS_COUNT) {

    const bookingsGroupedByEmployee = _groupByEmployee(bookingData);

    const employeesStats = _.map(bookingsGroupedByEmployee, (employeeBookings, employeeId)=> {
        const { employee } = employeeBookings[0];
        employee.hoursSold = _sumTotalHoursSoldForEmployee(employeeBookings);;
        return employee;
    });

    const sortedEmployees = _.sortBy(employeesStats, (employee)=> -employee.hoursSold );

    const topEmployees = sortedEmployees.slice(0, limit);

    return topEmployees;
}

export {
    calculateTopSellers
};
