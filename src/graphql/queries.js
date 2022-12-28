/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSensor = /* GraphQL */ `
  query GetSensor($sensorId: String!) {
    getSensor(sensorId: $sensorId) {
      sensorId
      sensorType
    }
  }
`;
export const getSensorValue = /* GraphQL */ `
  query GetSensorValue($id: ID!) {
    getSensorValue(id: $id) {
      id
      sensorId
      efficiency
      status
      isWarning
      createdAt
      updatedAt
    }
  }
`;
export const listSensorValues = /* GraphQL */ `
  query ListSensorValues(
    $filter: ModelSensorValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensorValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sensorId
        efficiency
        status
        isWarning
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSensorDef = /* GraphQL */ `
  query GetSensorDef($id: ID!) {
    getSensorDef(id: $id) {
      id
      Email
      CompanyName
      Test
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
export const listSensorDefs = /* GraphQL */ `
  query ListSensorDefs(
    $filter: ModelSensorDefFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensorDefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Email
        CompanyName
        Test
        createdAt
        updatedAt
        Sensors {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getSensors = /* GraphQL */ `
  query GetSensors($id: ID!) {
    getSensors(id: $id) {
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
export const listSensorss = /* GraphQL */ `
  query ListSensorss(
    $filter: ModelSensorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensorss(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const sensorsByEmail = /* GraphQL */ `
  query SensorsByEmail(
    $Email: String
    $sortDirection: ModelSortDirection
    $filter: ModelSensorsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sensorsByEmail(
      Email: $Email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
