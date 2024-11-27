import React, { useEffect, useState } from "react";
import './TestNyMainBody.css';
import { useGrades } from './UseGradesState.js';

function Canvas() {
    const {
        kursId, setKursId,
        kursKod, setKursKod,
        uppgiftId, setUppgiftId,
        modul, setModul,
        assignments,
        modules,
        grades,
    } = useGrades();

    return (
        <div className="canvas">
            <Upper
                setKursId={setKursId}
                setKursKod={setKursKod}
                setUppgiftId={setUppgiftId}
                setModul={setModul}
                assignments={assignments}
                modules={modules}
            />
            <Middle grades={grades} />
        </div>
    );
}

function Upper({ setKursId, setKursKod, setUppgiftId, setModul, assignments, modules }) {
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
    return (
        <div className="upper-upperbox">
            <div className="thingy">Canvas To Ladok</div>
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
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKursKodChange = () => {
        setKursKod(inputValue);
        console.log('Selected kursKod:', inputValue);
    };

    return (
        <div className="upper-kurskod">
            Skriv in kurskod:
            <div className="boxen">
                <input
                    className="kursKodText"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleKursKodChange}>Search</button>
            </div>
        </div>
    );
}

function UpperUppgift({ setUppgiftId, assignments }) {
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
    return (
        <div className="uppgiftDropDown">
            Modul i Ladok
            <select onChange={(e) => setModul(e.target.value)}>
                {modules.map((modul, index) => (
                    <option key={index} value={modul.modulID}>{modul.modulNamn}</option>
                ))}
            </select>
        </div>
    );
}

function Middle({ grades }) {
    return (
        <div className={"main"}>
            <div className="middle">
                <div className={"middleContainer"}>
                    <div className={"markeraContainer"}>
                        <button>Markera Alla</button>
                    </div>
                </div>
                <div className={"middleContainer"}>
                    <div className={"datumContainer"}></div>
                </div>
                <div className={"middleContainer"}>
                    <div className={"överförContainer"}>
                        <button>Överför</button>
                    </div>
                </div>
            </div>
            <Lower grades={grades} />
        </div>
    );
}

function Lower({ grades }) {
    const handleGradeChange = (studentIndex, newGrade) => {
        console.log(`Grade for student ${grades[studentIndex].firstName} updated to ${newGrade}`);
    };

    return (
        <div className="lower">
            <table id="students">
                <thead>
                    <tr>
                        <th></th>
                        <th>Namn</th>
                        <th>Omdöme i Canvas</th>
                        <th>Välj Omdöme</th>
                        <th>Examinationsdatum</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.length > 0 ? (
                        grades.map((grade, index) => (
                            <tr key={index}>
                                <td id="checkMark">
                                    <input type="checkbox" />
                                </td>
                                <td id="firstLastName">
                                    {grade.firstName} {grade.lastName}
                                    <span className="tooltip">{JSON.stringify(grade.PNR)}</span>
                                </td>
                                <td>{grade.assignmentGrade}</td>
                                <td>
                                    <select
                                        defaultValue={grade.assignmentGrade} // Matchar Omdöme i Canvas typ
                                        onChange={(e) => handleGradeChange(index, e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Välj betyg
                                        </option>
                                        <option value="F">F</option>
                                        <option value="G">G</option>
                                        <option value="VG">VG</option>
                                    </select>
                                </td>
                                <td>{grade.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No grades available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Canvas;
