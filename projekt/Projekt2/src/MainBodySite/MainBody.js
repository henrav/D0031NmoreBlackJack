// MainBody.js
import React, { useState } from "react";
import './MainBody.css';

function MainBody() {
  const [selectedCourse, setSelectedCourse] = useState("");
  
  
  const [selectedGrades, setSelectedGrades] = useState({});
  const [selectedDates, setSelectedDates] = useState({});

  
  const courseData = {
    "Course 1": [
      { name: "Diddy", grade: "G" },
      { name: "Drake", grade: "VG" },
      { name: "Dr. Disrespect", grade: "G" }
    ],
    "Course 2": [
      { name: "Disa Danielsson", grade: "VG" },
      { name: "Erika Eriksson", grade: "G" },
      { name: "Fredrik Fredriksson", grade: "VG" }
    ],
    "Course 3": [
      { name: "Greta Gustafsson", grade: "G" },
      { name: "Helena Holm", grade: "VG" },
      { name: "Ivan Ivarsson", grade: "G" }
    ]
  };

  
  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedGrades({}); 
    setSelectedDates({});  // Reset dates when selecting a new course
  };

  // Handle grade dropdown change for each student
  const handleGradeChange = (name, grade) => {
    setSelectedGrades(prevGrades => ({
      ...prevGrades,
      [name]: grade
    }));
  };

  // Handle date change for each student
  const handleDateChange = (name, date) => {
    setSelectedDates(prevDates => ({
      ...prevDates,
      [name]: date
    }));
  };

  return (
    <div className="main-body">
      {/* Dropdown Menus */}
      <div className="dropdowns">
        <div className="dropdown">
          <label>Kurskod</label>
          <select onChange={handleCourseChange}>
            <option value="">Select Course</option>
            {Object.keys(courseData).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        
        {/* Other Dropdowns */}
        <div className="dropdown">
          <label>Uppgift i Canvas</label>
          <select>
            <option value="">Select Task</option>
          </select>
        </div>
        
        <div className="dropdown">
          <label>Modul i Ladok</label>
          <select>
            <option value="">Select Module</option>
          </select>
        </div>
      </div>
      
      {/* Student List */}
      <div className="students-list">
        {selectedCourse && (
          <>
            <div className="student-list-header">
              <span>Namn</span>
              <span>Omdöme i Canvas</span>
              <span>Betyg i Ladok</span>
              <span>Datum</span>
            </div>
            <ul>
              {courseData[selectedCourse].map((student, index) => (
                <li key={index} className="student-item">
                  <span className="student-name">{student.name}</span>
                  <span className="student-grade">{student.grade}</span>
                  <select
                    className="ladok-grade-dropdown"
                    value={selectedGrades[student.name] || ""}
                    onChange={(e) => handleGradeChange(student.name, e.target.value)}
                  >
                    <option value="">Select Grade</option>
                    <option value="G">G</option>
                    <option value="VG">VG</option>
                    <option value="U">U</option>
                  </select>
                  <input
                    type="date"
                    className="grade-date-picker"
                    value={selectedDates[student.name] || ""}
                    onChange={(e) => handleDateChange(student.name, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default MainBody;
