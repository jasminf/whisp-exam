import React, { Component } from "react";
import styles from '../styles/App.module.scss';
import HotelStatsReport from './HotelStatsReport';
import TopEmployees from './TopEmployees';
import BookingApi from "../services/BookingApi";
import ErrorImage from '../styles/images/error-dino.gif';

const ErrorMessage = ()=> {
    return (
        <div style={{width: '100%', textAlign: 'center'}}>
            <img src={ErrorImage} />
            <h3 style={{marginTop: 100}}>Oops something went wrong :-(</h3>
        </div>
    )
};

class App extends Component {

    state = {
        topEmployees: [],
        availableRooms: 0,
        reservedRooms: 0,
        checkedIn: 0,
        isLoading: true,
        isError: false,
    };

    componentDidMount() {
        const api = new BookingApi();

        Promise.all([
            api.fetchReportStats(),
            api.fetchTopEmployees()
        ]).then( ([{availableRooms, reservedRooms, checkedIn}, topEmployees])=> {

            this.setState({
                availableRooms,
                reservedRooms,
                checkedIn,
                topEmployees,
                isLoading: false
            });

        }).catch( (error)=> {
            console.error(error);
            this.setState({isError: true});
        })
    }

    render() {
        const {
            topEmployees,
            availableRooms,
            reservedRooms,
            checkedIn,
            isLoading,
            isError,
        } = this.state;

        if (isError) {
            return (<ErrorMessage />);
        }

        if (isLoading) {
            return (<h3>Loading...</h3>);
        }

        return (
            <div className={styles.app}>
                <div className="page-content container">
                    <HotelStatsReport
                        availableRooms={availableRooms}
                        reservedRooms={reservedRooms}
                        checkedIn={checkedIn}
                    />
                    <hr/>
                    <div className="row">
                        <div className="col-3">
                            <TopEmployees employees={topEmployees} />
                        </div>
                        <div className="col-9"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
