import React, {useEffect, useState} from "react";
import './TestNyMainBody.css';

function Canvas(){
    return(
        <div className="canvas">
            <Upper/>
            <Middle/>
            <Lower/>
        </div>
    )
}

function Upper(){
    const [kursID, setKursID] = useState("1"); // Default to "1" or any initial value
    const [kursKod, setKursKod] = useState(""); // State for kursKod

    const handleKursIDChange = (event) => {
        setKursID(event.target.value);
    };

    return(
        <div className="upper">
            <div className = "upper-upperbox">
                <div className="thingy">Canvas To ladok</div>
                <div className="kursIDdropDown" style={{gridColumn: 3}}>
                    KursID:
                    <select value={kursID} onChange={handleKursIDChange}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>

                    </select>
                </div>
            </div>
            <div className="upper-lower">
                <UpperKursKod setKursKod = {setKursKod}/>
                <UpperUppgift kursID={kursID}/>
                <UpperModul kursKod={kursKod}/>
            </div>
        </div>
    )
}

function UpperKursKod({ setKursKod }) {
    const [inputValue, setInputValue] = useState(''); // Local state to store input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update local input value as the user types
    };

    const handleKursKodChange = () => {
        setKursKod(inputValue); // Pass the input value to setKursKod when "Search" is clicked
        console.log('Selected kursKod:', inputValue); // Log the selected kursKod
    };

    return (
        <div className="upper-kurskod">
            Kurskod:
            <div className="boxen">
                <input
                    className="kursKodText"
                    value={inputValue}
                    onChange={handleInputChange} // Update inputValue state on change
                />
                <button onClick={handleKursKodChange}>Search</button>
            </div>
        </div>
    );
}
function UpperUppgift({kursID}) {
    const [assignments, setAssignments] = useState([]);

    const fetchAssignments = async () => {
        try {
            const response = await fetch(`/get_Assignments?courseID=${kursID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }

            // Parse JSON response
            const data = await response.json();
            console.log('Fetched data:', data); // Log full response for debugging

            // Check if the expected structure matches
            if (data.length > 0 && data[0].assignments) {
                setAssignments(data[0].assignments);
                console.log(data[0].assignments);
            } else {
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Network or server error', error);
            console.log('Failed to fetch assignments');
        }
    };

    // Use useEffect to call fetchAssignments when kursID changes
    useEffect(() => {
        if (kursID) {
            fetchAssignments();
        }
    }, [kursID]); // Dependency array includes kursID

    // Removed useEffect to prevent auto-fetching on component mount

    return (
            <div className="uppgiftDropDown">
                Uppgift i Canvas
                <select>
                    {assignments.map((assignment, index) => (
                        <option key={index} value={assignment.courseAssignmentID}>{assignment.assignmentName}</option>
                    ))}
                </select>
            </div>

    );
}



function UpperModul({kursKod}){

    const [moduler, setModuler] = useState([]);

    const fetchModuler = async () => {
        try {
            const response = await fetch(`/get_Modul?kursKod=${kursKod}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            if (data.length > 0 && data[0].Modules) {
                setModuler(data[0].Modules);
                console.log(data[0].Modules);
            }else{
                console.error('Unexpected data structure:', data);
                setModuler([]);

            }
        } catch (error) {
            console.error('Network or server error', error);
            console.log('Failed to fetch moduler');
            setModuler([]);
        }

    };

    useEffect(() => {
        if (kursKod) {
            fetchModuler();
        } else {
            setModuler([]);
        }
    }, [kursKod]); // Trigger fetching when kursKod changes



    return(
            <div className="uppgiftDropDown">
                Modul i Ladok
                <select>
                    {moduler.map((modul, index) => (
                        <option key={index} value={modul.modulID}>{modul.modulNamn}</option>
                    ))}
                </select>
            </div>
    )
}

function Middle(){
    return(
        <div className="middle">
            <h1>Middle</h1>
        </div>
    )

}

function Lower(){
    return(
        <div className="lower">
            <h1>Lower</h1>
        </div>
    )

}

export default Canvas;