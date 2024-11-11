// useGrades.js
import { useState, useEffect } from 'react';


// Hook för att hantera state för betyg och uppgifter
// Returnerar state och funktioner för att uppdatera state
//TestNyMainBody.js blir inte helt galet fullt av kod
//ingen aning om man "får" göra såhär eller om de finns bättre sätt att göra det men det funkar för budget projektet
export const useGrades = (initialKursId = "1") => {
    const [kursId, setKursId] = useState(initialKursId); // bara lite data som behövs för att kunna hämta betyg och rävar
    const [kursKod, setKursKod] = useState(""); // funktioner för att sätta dem som skickas vidare till komponenter
    const [uppgiftId, setUppgiftId] = useState(1); // så när någon komponent ändrar kursId så uppdateras det här
    const [modul, setModul] = useState(null);

    const [assignments, setAssignments] = useState([]);
    const [modules, setModules] = useState([]);
    const [grades, setGrades] = useState([]);

    // hämta betyg baserat på kursId
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

    // hämtar moduler baserat på kurskoden
    const fetchModules = async (kod) => {
        try {
            const response = await fetch(`/get_Modul?kursKod=${kod}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            setModules(data[0]?.Modules || []);
        } catch (error) {
            console.error("Error fetching modules:", error);
            setModules([]);
        }
    };

    // hämta betyg baserat på uppgiftId
    const fetchGrades = async (assignmentId) => {
        if (!assignmentId) return;
        setGrades([]);
        try {
            const response = await fetch(`/getStudentGradesAssignment?assignmentId=${assignmentId}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            setGrades(data[0]?.grades || []);
        } catch (error) {
            console.error("Error fetching grades:", error);
            setGrades([]);
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
    };
};
