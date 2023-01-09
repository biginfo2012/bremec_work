/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSensorValue = /* GraphQL */ `
  mutation CreateSensorValue(
    $input: CreateSensorValueInput!
    $condition: ModelSensorValueConditionInput
  ) {
    createSensorValue(input: $input, condition: $condition) {
      id
      sensorId
      efficiency
      efficiency2
      status
      isWarning
      createdAt
      updatedAt
    }
  }
`;
export const updateSensorValue = /* GraphQL */ `
  mutation UpdateSensorValue(
    $input: UpdateSensorValueInput!
    $condition: ModelSensorValueConditionInput
  ) {
    updateSensorValue(input: $input, condition: $condition) {
      id
      sensorId
      efficiency
      efficiency2
      status
      isWarning
      createdAt
      updatedAt
    }
  }
`;
export const deleteSensorValue = /* GraphQL */ `
  mutation DeleteSensorValue(
    $input: DeleteSensorValueInput!
    $condition: ModelSensorValueConditionInput
  ) {
    deleteSensorValue(input: $input, condition: $condition) {
      id
      sensorId
      efficiency
      efficiency2
      status
      isWarning
      createdAt
      updatedAt
    }
  }
`;
export const createSensorDef = /* GraphQL */ `
  mutation CreateSensorDef(
    $input: CreateSensorDefInput!
    $condition: ModelSensorDefConditionInput
  ) {
    createSensorDef(input: $input, condition: $condition) {
      id
      Email
      CompanyName
      PhoneNumber
      RegisteredCountry
      RegisteredCity
      RegisteredAddress
      RegisteredZipCode
      OperativeCountry
      OperativeCity
      OperativeAddress
      OperativeZipCode
      P_IVA
      SDI
      PECEmail
      createdAt
      updatedAt
      Sensors {
        items {
          id
          Email
          SensorsId
          SensorName
          SensorFriendlyName
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateSensorDef = /* GraphQL */ `
  mutation UpdateSensorDef(
    $input: UpdateSensorDefInput!
    $condition: ModelSensorDefConditionInput
  ) {
    updateSensorDef(input: $input, condition: $condition) {
      id
      Email
      CompanyName
      PhoneNumber
      RegisteredCountry
      RegisteredCity
      RegisteredAddress
      RegisteredZipCode
      OperativeCountry
      OperativeCity
      OperativeAddress
      OperativeZipCode
      P_IVA
      SDI
      PECEmail
      createdAt
      updatedAt
      Sensors {
        items {
          id
          Email
          SensorsId
          SensorName
          SensorFriendlyName
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteSensorDef = /* GraphQL */ `
  mutation DeleteSensorDef(
    $input: DeleteSensorDefInput!
    $condition: ModelSensorDefConditionInput
  ) {
    deleteSensorDef(input: $input, condition: $condition) {
      id
      Email
      CompanyName
      PhoneNumber
      RegisteredCountry
      RegisteredCity
      RegisteredAddress
      RegisteredZipCode
      OperativeCountry
      OperativeCity
      OperativeAddress
      OperativeZipCode
      P_IVA
      SDI
      PECEmail
      createdAt
      updatedAt
      Sensors {
        items {
          id
          Email
          SensorsId
          SensorName
          SensorFriendlyName
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createSensors = /* GraphQL */ `
  mutation CreateSensors(
    $input: CreateSensorsInput!
    $condition: ModelSensorsConditionInput
  ) {
    createSensors(input: $input, condition: $condition) {
      id
      Email
      SensorsId
      SensorName
      SensorFriendlyName
      createdAt
      updatedAt
    }
  }
`;
export const updateSensors = /* GraphQL */ `
  mutation UpdateSensors(
    $input: UpdateSensorsInput!
    $condition: ModelSensorsConditionInput
  ) {
    updateSensors(input: $input, condition: $condition) {
      id
      Email
      SensorsId
      SensorName
      SensorFriendlyName
      createdAt
      updatedAt
    }
  }
`;
export const deleteSensors = /* GraphQL */ `
  mutation DeleteSensors(
    $input: DeleteSensorsInput!
    $condition: ModelSensorsConditionInput
  ) {
    deleteSensors(input: $input, condition: $condition) {
      id
      Email
      SensorsId
      SensorName
      SensorFriendlyName
      createdAt
      updatedAt
    }
  }
`;
