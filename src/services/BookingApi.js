import axios from "axios";
import Env from "../env";
import { calculateTopSellers } from './utils'

const Url = {
    BookingSnapshot: '/booking-snapshot',
    Bookings: '/bookings',
};

class BookingApi {

    constructor() {
        this.client = axios.create({
            baseURL: Env.API_URL,
        });
    }

    fetchReportStats() {
        return this.client.get(Url.BookingSnapshot)
            .then( (response)=> {
                const {
                    availableRooms,
                    reservedRooms,
                    checkedIn,
                } = response.data;
                return { availableRooms, reservedRooms, checkedIn };
            }).catch( (error)=> {
                console.error(error)
            })
    }

    fetchTopEmployees() {
        return this.client.get(Url.Bookings)
            .then( (response)=> {
                const bookingData = response.data;
                const topEmployees = calculateTopSellers(bookingData);
                return topEmployees;
            })
            .catch( (error)=> {
                console.error(error)
            })
    }

}

export default BookingApi;
