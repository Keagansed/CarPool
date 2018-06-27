import React, { Component } from 'react';
import Trip from './Trip';

class Trips  extends Component {
    render(){
        return(
            <div className="scroll-vert">
                <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Upcoming Trips</h4>
                </div>
                {/*Upcoming trips will go here*/}
                {/*These are just static trips for example*/}
                <Trip />
                <Trip />
                <div className="pad-10px bg-whitelight txt-white">
                        <h4 className="mbottom-0">Past Trips</h4>
                </div>
                {/*Upcoming trips will go here*/}
                {/*These are just static trips for example*/}
                <Trip />
                <Trip />
                <Trip />
                <Trip />
                <Trip />
                <Trip />                                                                   
            </div>
        );
    }
}

export default Trips;