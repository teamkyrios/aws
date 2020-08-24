import React, {useEffect, useState} from 'react';
import './StaffView.css';

/**
 * the staff register brings them to a screen which displays the live number of visitors alongside the corresponding bed number
in that screen they can toggle to the 4 different wards as well

then in the staff page, they are also able to manually check a visitor out/in
and they can also toggle the patient's allow Visitor condition
 */
const StaffView = () => {
    useEffect(()=> {
        getUpdatedVisitorCount();
    },[])

    const [liveVisitorNo, setLiveVisitorNo] = useState(0);

    // Subscribe to DB changes
    const getUpdatedVisitorCount = () => {

    }

return (
    <div>
        <h1>Staff View</h1>
        <div id='StaffViewVisitorCountBanner'>
<h3>Live visitor number: {liveVisitorNo}</h3>
        </div>
        <h3>
            Detailed view of visitiors:
        </h3>
        <div>
            <p>Visitor - - - - Patient bed number</p>
            <p>[Button to view different 4 wards]</p>
        </div>
        <div>
            <p>Allow visitor to check in</p>
        </div>

    </div>
)
}

export default StaffView;