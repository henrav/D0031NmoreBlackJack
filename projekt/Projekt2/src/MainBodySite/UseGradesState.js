// useGrades.js
import { useState, useEffect } from 'react';


// Hook för att hantera state för betyg och uppgifter
// Returnerar state och funktioner för att uppdatera state
//TestNyMainBody.js blir inte helt galet fullt av kod om man gör detta
//ingen aning om man "får" göra såhär eller om de finns bättre sätt att göra det men det funkar för budget projektet
export const useGrades = (initialKursId = "1") => {
    const [kursId, setKursId] = useState(initialKursId); // bara lite data som behövs för att kunna hämta betyg och rävar
    const [kursKod, setKursKod] = useState(""); // funktioner för att sätta dem som skickas vidare till komponenter
    const [uppgiftId, setUppgiftId] = useState(1); // så när någon komponent ändrar kursId så uppdateras det här
    const [modul, setModul] = useState(null);
    const [fullgrade, setFullgrade] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [modules, setModules] = useState([]);
    const [grades, setGrades] = useState([]);

    // hämta betyg baserat på kursId, körs när någon komponent ändrar kursId

    const registerResult = async () => {

        try {
            var grade = {
                Modul: JSON.stringify(modul.modulID),
                KursKod: kursKod,
                ELEVER: grades.map(({ PNR, assignmentGrade, date, firstName, lastName }) => ({
                    Pnr: PNR,
                    förnamn: firstName,
                    efternamn: lastName,
                    betyg: assignmentGrade,
                    datum: date,
                })),
            }
            const response = await fetch('/reg_Resultat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grade }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('Error response:', errorDetails);
                return errorDetails; // Return an empty array if there's an error
            }
            const result = await response.json();
            return result; // Return the response result
        } catch (error) {
            console.error("Error registering result:", error.message);
        }
    }


    const fetchAssignments = async (courseId) => {   //så himla mycket syntax generellt i js att jag dampar
        setGrades([]); // Rensa betyg när nya uppgifter hämtas
        try {
            const response = await fetch(`/get_Assignments?courseID=${courseId}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            const fetchedAssignments = data[0]?.assignments || [];

            setAssignments(fetchedAssignments); // Spara uppgifter i state


            const firstAssignmentId = fetchedAssignments[0]?.courseAssignmentID || null;
            setUppgiftId(firstAssignmentId); // Sätt första uppgift som default


            if (firstAssignmentId) { // Hämta betyg för första uppgiften
                await fetchGrades(firstAssignmentId);
            } else {
                setGrades([]);
            }
        } catch (error) {
            console.error("Error fetching assignments:", error);
            setAssignments([]);
            setGrades([]);
        }
    };

    // hämtar moduler baserat på kurskoden, körs när någon komponent ändrar kursKod
    const fetchModules = async (kod) => {
        setModul(null); // Rensa modul när nya moduler hämtas
        setModules([]); // Rensa moduler när nya moduler hämtas
        try {
            const response = await fetch(`/get_Modul?kursKod=${kod}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            setModules(data[0]?.Modules || []); //än så länge vet jag inte vad "data[0]?" är men det funkar, "Modules" = min databaskod det vet jag
            setModul(data[0]?.Modules[0] || null); // Sätt första modul som default (om det finns någon
        } catch (error) {                             //AS Modules FROM EpokModuler AS em
            console.error("Error fetching modules:", error);
            setModules([]);
        }
    };

    // hämta betyg baserat på uppgiftId, körs när någon komponent ändrar uppgiftId
    const fetchGrades = async (assignmentId) => {
        if (!assignmentId) return;
        setGrades([]);
        try {
            const response = await fetch(`/getStudentGradesAssignment?assignmentId=${assignmentId}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();

            const newGrades = data[0]?.grades || []; // Get the new grades or empty array
            setGrades(newGrades); // Update the grades state

            // Fetch PNRs using the new grades directly, avoiding the outdated state
            fetchPNR(newGrades);

        } catch (error) {
            console.error("Error fetching grades:", error);
            setGrades([]);
        }
    };

    const fetchPNR = async (grades) => {
        try {
            // Använd Promise.all och map för att göra parallella asynkrona anrop
            const updatedGrades = await Promise.all(
                grades.map(async (grade) => {
                    try {
                        const response = await fetch(`/get_Persnummer?userName=${grade.studUser}`);
                        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                        const data = await response.json();
                        grade.PNR = data[0]?.personNR || ""; // Uppdatera PNR för varje grade
                    } catch (error) {
                        console.error(`Error fetching PNR for student ${grade.studUser}:`, error);
                        grade.PNR = ""; // Sätt tomt värde vid fel
                    }
                    return grade; // Returnera det uppdaterade grade-objektet
                })
            );
            setGrades(updatedGrades); // Uppdatera grades med PNR-värden
        } catch (error) {
            console.error("Error fetching PNR:", error);
        }
    };

    // varjegång kursId ändras, hämta uppgifter för kursen
    useEffect(() => {
        if (kursId) {
            fetchAssignments(kursId);
        }
    }, [kursId]);

    // varjegång kursKod ändras, hämta moduler för kursen
    useEffect(() => {
        if (kursKod) fetchModules(kursKod);
    }, [kursKod]);

    // varjegång uppgiftId ändras, hämta betyg för uppgiften
    useEffect(() => {
        if (uppgiftId) fetchGrades(uppgiftId);
    }, [uppgiftId]);


    return {
        kursId, setKursId,
        kursKod, setKursKod,
        uppgiftId, setUppgiftId,
        modul, setModul,
        assignments,
        modules,
        grades,
        registerResult
    };
};
