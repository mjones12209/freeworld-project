export function hourlyPotentialEarningsFunc() {
  return this.earningsPotential / this.instructionHoursNeeded;
}

export const columns = [
    { field: "id", headerName: "ID", width: 110, hide: true },
    {
      field: "studentForConsideration",
      headerName: "Student for Consideration",
      width: 239,
      editable: true,
    },
    {
      field: "earningsPotential",
      headerName: "Earnings Potential",
      width: 200,
      editable: true,
    },
    {
      field: "instructionHoursNeeded",
      headerName: "Instruction Hours Needed",
      type: "number",
      width: 240,
      editable: true,
    },
  ];


export const demoData = [
  {
    id: 1,
    studentForConsideration: "Jane",
    earningsPotential: 1000,
    instructionHoursNeeded: 3,
    hourlyPotentialEarningsFunc,
  },
  {
    id: 2,
    studentForConsideration: "Bob",
    earningsPotential: 3000,
    instructionHoursNeeded: 5,
    hourlyPotentialEarningsFunc,
  },
  {
    id: 3,
    studentForConsideration: "Mark",
    earningsPotential: 2700,
    instructionHoursNeeded: 4,
    hourlyPotentialEarningsFunc,
  },
  {
    id: 4,
    studentForConsideration: "Jill",
    earningsPotential: 5000,
    instructionHoursNeeded: 8,
    hourlyPotentialEarningsFunc,
  },
  {
    id: 5,
    studentForConsideration: "Don",
    earningsPotential: 3600,
    instructionHoursNeeded: 5,
    hourlyPotentialEarningsFunc,
  },
];
