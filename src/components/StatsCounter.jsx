import React from "react";
import PropTypes from "prop-types";
import '../styles/StatsCounter.scss'


const StatsCounter = (props) => {
    const {count, labelText } = props;

    return (
        <div className="stats-counter" >
            <h1>{count}</h1>
            <label>{labelText}</label>
        </div>
    );
};

StatsCounter.propTypes = {
    count: PropTypes.number.isRequired,
    labelText: PropTypes.string.isRequired,
};

export default StatsCounter;
