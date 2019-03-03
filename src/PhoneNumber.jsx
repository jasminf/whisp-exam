import React, {Component} from "react";

/**
 * Exercise 1
 */
class PhoneNumber extends Component {

    state = {
        phoneNumber: ''
    };

    handleChange = (event) => {
        const newNum = event.nativeEvent.data;

        const isDelete = !newNum;

        let newPhoneNumber;
        let currentPhoneNumber = this.state.phoneNumber;

        if (isDelete) {
            newPhoneNumber = currentPhoneNumber.slice(0, currentPhoneNumber.length - 1);
        } else {
            newPhoneNumber = currentPhoneNumber + newNum;
        }
        this.setState({phoneNumber: newPhoneNumber});
    };

    get formattedPhoneNumber() {
        const {phoneNumber} = this.state;

        // For numbers longer than 10 digits (invalid phone numbers), there will be no formatting.
        if (phoneNumber.length === 0 || phoneNumber.length > 10) {
            return phoneNumber;
        }
        const numbersArr = phoneNumber.split('');

        const firstThree = numbersArr.slice(0, 3).join('');
        const middleThree = numbersArr.slice(4, 7).join('');
        const lastFour = numbersArr.slice(7, numbersArr.length).join('');

        let result = `(${firstThree})`;

        if (middleThree.length > 0) {
            result += `-${middleThree}`;
        }
        if (lastFour.length > 0) {
            result += `-${lastFour}`;
        }
        return result;
    }

    render() {
        return (
            <div>
                <input type="text" value={this.formattedPhoneNumber} onChange={this.handleChange}/>
                <br/>
                <br/>
                <label>Value:</label>
                <label>+1{this.state.phoneNumber}</label>
            </div>
        );
    }

}

export default PhoneNumber;
