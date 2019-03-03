import React, { Component } from "react";
import PropTypes from "prop-types";
import defaultAvatar from '../styles/images/default-avatar.svg';
import '../styles/TopEmployees.scss'

const EmployeeRow = ({employee}) => {
    const { profileImageUrl, firstName, lastName, hoursSold } = employee;
    const lastNameInitial = lastName[0].toUpperCase();

    const onImageLoadError = (event)=> {
        event.target.onerror = null;
        event.target.src = defaultAvatar;
    };

    return (
        <div className='employee-row row'>
            <div className="col-3">
                <img src={profileImageUrl} alt={''} onError={onImageLoadError}/>
            </div>
            <div className="col-5">
                <label className='employee-name' >{firstName} {lastNameInitial}.</label>
            </div>
            <div className="col-4">
                <label className='hours' >{hoursSold} hours</label>
            </div>
        </div>
    );
};

EmployeeRow.propTypes = {
    employee: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profileImageUrl: PropTypes.string,
        hoursSold: PropTypes.number.isRequired,
    })
};

class TopEmployees extends Component {

    static propTypes = {
        employees: PropTypes.arrayOf(
            EmployeeRow.propTypes.employee
        )
    };

    static defaultProps = {
        employees: []
    };

    render() {
        const { employees } = this.props;

        if (!employees || employees.length === 0) {
            return (
                <h5>No employees stats available</h5>
            );
        }
        return (
            <div className='employee-stats'>
                <h1 className='title' >Employee stats</h1>
                {employees.map( (employee)=> (
                    <EmployeeRow employee={employee} key={employee.id} />
                ))}
            </div>
        );
    }
}
export default TopEmployees;
