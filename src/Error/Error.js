import React from 'react';

const Error = (props) => {
    console.log(props);
    const {error} = props;
    console.log(Object.keys(error).length);
    return (
        <div className="alert alert-danger" role="alert">
                {error.errorTxt}
        </div>
        )
}

export default Error;