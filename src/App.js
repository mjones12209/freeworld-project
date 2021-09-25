import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, TextField } from "@material-ui/core";
import styles from "./App.module.css";
import { hourlyPotentialEarningsFunc, demoData, columns } from './DemoData/data';

export default function App() {

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("studentData"));
    let maxCreditHours = localStorage.getItem("maxCreditHours");
    if (data) {
      const unstringifyData = data.map((row) => {
        return {
          ...row,
          hourlyPotentialEarningsFunc
        };
      });
      setRows(unstringifyData);
    }
    if (maxCreditHours) {
      setMaxCreditHours(maxCreditHours);
    }
  }, []);

  const [maxEarnings, setMaxEarnings] = useState();
  const [maxCreditHours, setMaxCreditHours] = useState(20);
  const [studentsSelected, setStudentsSelected] = useState([]);
  const [rows, setRows] = useState(demoData);

  const setStudentData = (data) => {
    setRows(data);
    const stringifyData = data.map(row => {
      return {
        ...row,
        hourlyPotentialEarningsFunc: null
      }
    })
    localStorage.setItem("studentData", JSON.stringify(stringifyData));
  };

  const handleChange = (params) => {
    const newRows = rows.map((row) => {
      if (row.id === params.id) {
        let value;
        if (
          params.field === "earningsPotential" ||
          params.field === "instructionHoursNeeded"
        ) {
          value = parseInt(params.value);
        } else {
          value = String(params.value);
        }
        return { ...row, [params.field]: value };
      } else {
        return row;
      }
    });
    setStudentData(newRows);
  };

  const handleNumOfStudents = (e) => {
    let newRows = rows.slice();
    if (rows.length < e.target.value) {
      for (let i = 0; i < e.target.value - rows.length; i++) {
        newRows.push({
          id: newRows.length + 1,
          studentForConsideration: 'Please Enter Student Name',
          earningsPotential: 0,
          instructionHoursNeeded: 0,
          hourlyPotentialEarningsFunc,
        });
      }
    } else if (rows.length > e.target.value) {
      newRows = rows.filter((row) => row.id <= e.target.value);
    }
    setStudentData(newRows);
  };

  const handleMaxCreditHours = (e) => {
    setMaxCreditHours(e.target.value);
    localStorage.setItem("maxCreditHours", e.target.value);
  };

  useEffect(() => {
    const calculateMaxEarnings = () => {
      const compare = (a, b) => {
        if (a.hourlyPotentialEarningsFunc() < b.hourlyPotentialEarningsFunc()) {
          return 1;
        }
        if (a.hourlyPotentialEarningsFunc() > b.hourlyPotentialEarningsFunc()) {
          return -1;
        }
      };

      const sortedArray = rows.slice().sort(compare);

      let chosenStudents = [];
      sortedArray.reduce(
        (previousValue, currentValue, currentIndex, array) => {
          if (
            !(previousValue <= maxCreditHours) ||
            ((previousValue + currentValue.instructionHoursNeeded) >= maxCreditHours)
          ) {
            if(previousValue + currentValue.instructionHoursNeeded <= maxCreditHours) {
              chosenStudents.push(currentValue);
            }
            return previousValue;
          } else {
            chosenStudents.push(currentValue);
            return previousValue + currentValue.instructionHoursNeeded;
          }
        },
        0
      );

      const maxEarnings = chosenStudents.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.earningsPotential;
      }, 0);

      setMaxEarnings(maxEarnings);

      const selectedStudents = chosenStudents.map((student, index) => {
        if (index < chosenStudents.length - 1) {
          return student.studentForConsideration + ", ";
        } else if (index === chosenStudents.length - 1) {
          return ` and ${student.studentForConsideration}`;
        } else {
          return null;
        }
      });

      setStudentsSelected(selectedStudents);
    };

    calculateMaxEarnings();
  }, [maxCreditHours, rows]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid container className={styles.gridContainer}>
        <Grid item xs={2}>
          <TextField
            value={rows.length}
            onChange={handleNumOfStudents}
            label="Number of Students"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            value={maxCreditHours}
            onChange={handleMaxCreditHours}
            label="Max Credit Hours"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        loading={rows.length === 0}
        onCellEditCommit={handleChange}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <div className={styles.answerDiv}>
        Max Earnings of {maxEarnings} with {studentsSelected}
      </div>
    </div>
  );
}
