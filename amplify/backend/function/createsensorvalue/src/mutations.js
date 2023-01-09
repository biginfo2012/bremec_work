Object.defineProperty(exports,"__esModule",{value:true});exports.updateSensorValue=exports.deleteSensorValue=exports.createSensorValue=void 0;var createSensorValue="\n  mutation CreateSensorValue(\n    $input: CreateSensorValueInput!\n    $condition: ModelSensorValueConditionInput\n  ) {\n    createSensorValue(input: $input, condition: $condition) {\n      id\n      sensorId\n      efficiency\n      efficiency2\n      status\n      isWarning\n      createdAt\n      updatedAt\n    }\n  }\n";exports.createSensorValue=createSensorValue;var updateSensorValue="\n  mutation UpdateSensorValue(\n    $input: UpdateSensorValueInput!\n    $condition: ModelSensorValueConditionInput\n  ) {\n    updateSensorValue(input: $input, condition: $condition) {\n      id\n      sensorId\n      efficiency\n      efficiency2\n      status\n      isWarning\n      createdAt\n      updatedAt\n    }\n  }\n";exports.updateSensorValue=updateSensorValue;var deleteSensorValue="\n  mutation DeleteSensorValue(\n    $input: DeleteSensorValueInput!\n    $condition: ModelSensorValueConditionInput\n  ) {\n    deleteSensorValue(input: $input, condition: $condition) {\n      id\n      sensorId\n      efficiency\n      efficiency2\n      status\n      isWarning\n      createdAt\n      updatedAt\n    }\n  }\n";exports.deleteSensorValue=deleteSensorValue;
