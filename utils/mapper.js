import {
  CSV_ENTRY_DELIMITER,
  CSV_FIELD_DELIMITER
} from "../config/application.js";
import {
  deleteFiles,
  getEgressFileName,
  writeCSVLine
} from "./files.js";

let employeesAsJson;

const mapEmployees = (employees) => {
  employeesAsJson = employees.map((item) => {
    const employeeAsArray = item.split(CSV_FIELD_DELIMITER);
    return {
      lastName: employeeAsArray[1],
      firstName: employeeAsArray[0],
      email: employeeAsArray[2],
      zipCode: employeeAsArray[3],
    };
  });

  return employeesAsJson;
};

const startMapping = async (file) => {
  console.log('Start mapping employees list...');
  try {
    const employeesAsArr = file.split(CSV_ENTRY_DELIMITER);
    employeesAsArr.shift();  // Skip CSV headers

    const employees = mapEmployees(employeesAsArr);
    const egressFileName = getEgressFileName();

    await employees.forEach(employee => writeCSVLine(egressFileName, employee));
    console.log('Mapping is a success!');
  } catch (error) {
    console.error(`Got an error trying to map the file: ${error.message}`);
  }
}

export { employeesAsJson, mapEmployees, startMapping };
