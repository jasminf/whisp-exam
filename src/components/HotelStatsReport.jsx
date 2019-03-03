import React, {Component} from "react";
import PropTypes from "prop-types";
import StatsCounter from "./StatsCounter";
import '../styles/HotelStatsReport.scss'

class HotelStatsReport extends Component {

    static propTypes = {
        availableRooms: PropTypes.number.isRequired,
        reservedRooms: PropTypes.number.isRequired,
        checkedIn: PropTypes.number.isRequired,
    };

    render() {
        const {
            availableRooms,
            reservedRooms,
            checkedIn,
        } = this.props;

        return (
            <div className='stats-report row'>
                <div className='col'>
                    <StatsCounter count={availableRooms} labelText={'Rooms available'}/>
                </div>
                <div className='col'>
                    <StatsCounter count={reservedRooms} labelText={'Reserved rooms'}/>
                </div>
                <div className='col'>
                    <StatsCounter count={checkedIn} labelText={'Checked in'}/>
                </div>
            </div>
        );
    }

}

export default HotelStatsReport;
