import React, { useEffect, useState } from "react";
import './TestNyMainBody.css';
import { useGrades } from './UseGradesState.js'; //importera state grejen med alla useStates och grajsor
//jag vette fortfarande inte om man får göra detta, och jag vågar inte fråga
//iingen läser endå
//jag har ingen aning om vad jag gör

function Canvas() {
    const { //deklarera alla states som behövs för att kunna använda dem i komponenterna
        kursId, setKursId,
        kursKod, setKursKod,
        uppgiftId, setUppgiftId,
        modul, setModul,
        assignments,
        modules,
        grades,
        registerResult,
        selectedStudents,
        toggleStudentSelection,
        selectAllStudents,
        clearSelections,
    } = useGrades();

    return (
        <div className="canvas">
            <Upper
                setKursId={setKursId} //skicka med alla "states" till komponenterna eller funktioner kanske??!
                setKursKod={setKursKod}//vet inte om man kallar det states men
                setUppgiftId={setUppgiftId}
                setModul={setModul}
                assignments={assignments}
                modules={modules}
            />
            <Middle grades={grades} registerGrades={registerResult} selectAllStudents={selectAllStudents} toggleStudentSelection={toggleStudentSelection} clearAllStudents={clearSelections} selectedStudents={selectedStudents} />
        </div>
    );
}

function Upper({ setKursId, setKursKod, setUppgiftId, setModul, assignments, modules }) {
    //samma här som i Canvas funktionen, skickar funktionerna och alla "states" till deras komponenter
    return (
        <div className="upper">
            <KursID setKursId={setKursId} />
            <div className="upper-lower">
                <UpperKursKod setKursKod={setKursKod} />
                <UpperUppgift setUppgiftId={setUppgiftId} assignments={assignments} />
                <UpperModul modules={modules} setModul={setModul} />
            </div>
        </div>
    );
}

function KursID({ setKursId }) {
    //när du ändrar kursID här så uppdateras "UserGradesState.js" kursID och då callas
    //fetchAssignments som hämtar alla uppgifter för den kursen

    return (
        <div className="upper-upperbox">
            <div className="thingy">Canvas To ladok</div>
            <div className="kursIDdropDown" style={{ gridColumn: 3 }}>
                KursID:
                <select onChange={(e) => setKursId(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
    );
}


function UpperKursKod({ setKursKod }) {
    //när du ändrar kursKod här så uppdateras "UserGradesState.js" kursKod och då callas
    //fetchModules som hämtar alla moduler för den kursen


    //variable som sparar vad du har skrivit i kursKods grejen
    const [inputValue, setInputValue] = useState(''); // Local state to store input value


    //function som körs när du trycker på "Search" knappen
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update local input value as the user types
    };

    //basicly du ändrar staten av kursKod till det du har skrivit i inputen
    const handleKursKodChange = () => {
        setKursKod(inputValue); // du kör "funktionen" som du skickade med från Upper komponenten
        console.log('Selected kursKod:', inputValue);
    };

    return (
        <div className="upper-kurskod">
            Skriv in kurskod:
            <div className="boxen">
                <input
                    className="kursKodText"
                    value={inputValue}
                    onChange={handleInputChange} // när du skriver så uppdateras den lokala variabeln
                />
                <button onClick={handleKursKodChange}>Search</button> {/* när du trycker på knappen så uppdateras kursKod till det du har skrivit */}
            </div>
        </div>
    );
}
function UpperUppgift({ setUppgiftId, assignments }) {
    //mappar grejer till grejer
    //uppdaterar sedan state???!
    return (
        <div className="uppgiftDropDown">
            Välj Uppgift Att Registrera
            <select onChange={(e) => setUppgiftId(e.target.value)}>
                {assignments.map((assignment) => (
                    <option key={assignment.courseAssignmentID} value={assignment.courseAssignmentID}>
                        {assignment.assignmentName}
                    </option>
                ))}
            </select>
        </div>
    );
}




function UpperModul({ modules, setModul }) {
    //mappar moduler till moduler och uppdaterar state
    return (
        <div className="uppgiftDropDown">
            Modul i Ladok
            <select onChange={(e) => setModul(e.target.value)}>
                {modules.map((modul, index) => (
                    <option key={index} value={modul.modulID}>{modul.modulNamn}</option>
                ))}
            </select>
        </div>
    )
}

function Middle({grades, registerGrades, selectAllStudents, clearAllStudents, selectedStudents, toggleStudentSelection}) {
    const [sendingGrades, setSendingGrades] = useState(false);
    const handleRegister =  async () => {
        setSendingGrades(true);
        const selectedGrades = grades.filter((grade) => selectedStudents.includes(grade.PNR));
        if (selectedGrades.length === 0){
            alert('no inga elever valda');
            setSendingGrades(false);
            return;
        }
        const result = await registerGrades(selectedGrades);
        switch (result.status) {
            case 'ok':
                alert('Grades registered successfully.');
                break;
            case 'duplicate entries':
                alert(`Duplicate entries found: ${result.students.join(', ')}`);
                break;
            case 'error':
                alert(`Error: ${result.message}\nDetails: ${result.details}`);
                break;
            default:
                alert('Unexpected response from the server.');
                console.error('Unexpected response:', result);
        }

        setSendingGrades(false);
    }

    //mycket användbar för tillfället
    return (
            <div className={"main"}>
                <div className="middle">
                    <div className={"middleContainer"}>
                        <div className={"markeraContainer"}>
                            <button onClick={selectAllStudents}>Markera Alla</button>
                            <button onClick={clearAllStudents}>Avmarkera Alla</button>

                        </div>
                    </div>
                    <div className={"middleContainer"}>
                        < div className = {"datumContainer"} >

                        < /div>
                    </div>
                    <div className={"middleContainer"}>
                        <div className={"överförContainer"}>
                            <button onClick={handleRegister} disabled={sendingGrades}>Överför</button>
                        </div>
                    </div>
                </div>
                <Lower grades={grades} toggleStudentSelection={toggleStudentSelection} selectedStudents={selectedStudents}/>
            </div>
        )


}

function Lower({grades, toggleStudentSelection, selectedStudents}) {
    return (
        <div className="lower">
            <table id="students">
            <thead>
                    <tr>
                        <th></th>
                        <th>Namn</th>
                        <th>Omdöme i Canvas</th>
                        <th>Omdöme i Ladok</th>
                        <th>Examinationsdatum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {grades.length > 0 ? (
                        grades.map((grade, index) => (
                            <tr key={index}>
                                <td id="checkMark">
                                    <input type="checkbox"
                                    checked={selectedStudents.includes(grade.PNR)}
                                    onChange={() => toggleStudentSelection(grade.PNR)}/>
                                </td>
                                <td id="firstLastName">
                                    {grade.firstName} {grade.lastName}
                                    <span className="tooltip">{JSON.stringify(grade.PNR)}</span>
                                </td>
                                <td>{grade.assignmentGrade}</td>
                                <td>{grade.ladokGrade}</td>
                                <td>{grade.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No grades available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

    );
}


export default Canvas;