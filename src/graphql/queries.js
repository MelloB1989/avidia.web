/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const user = /* GraphQL */ `
  query User($id: ID!) {
    user(id: $id) {
      id
      activeLabs {
        ecs_ip
        expiry
        lab_id
        start
        running
        __typename
      }
      challenges {
        id
        name
        description
        solved
        __typename
      }
      quizzes {
        id
        title
        passed
        __typename
      }
      myCourses {
        id
        completedEpisodes
        startedFrom
        certificate
        __typename
      }
      timeSpent {
        courseId
        labId
        timeInMinutes
        __typename
      }
      __typename
    }
  }
`;
export const users = /* GraphQL */ `
  query Users {
    users {
      id
      activeLabs {
        ecs_ip
        expiry
        lab_id
        start
        running
        __typename
      }
      challenges {
        id
        name
        description
        solved
        __typename
      }
      quizzes {
        id
        title
        passed
        __typename
      }
      myCourses {
        id
        completedEpisodes
        startedFrom
        certificate
        __typename
      }
      timeSpent {
        courseId
        labId
        timeInMinutes
        __typename
      }
      __typename
    }
  }
`;
export const course = /* GraphQL */ `
  query Course($id: ID!) {
    course(id: $id) {
      id
      title
      description
      episodes {
        id
        title
        duration
        content
        __typename
      }
      __typename
    }
  }
`;
export const courses = /* GraphQL */ `
  query Courses {
    courses {
      id
      title
      description
      episodes {
        id
        title
        duration
        content
        __typename
      }
      __typename
    }
  }
`;
