/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($id: ID!) {
    createUser(id: $id) {
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
export const enrollInCourse = /* GraphQL */ `
  mutation EnrollInCourse($userId: ID!, $courseId: ID!) {
    enrollInCourse(userId: $userId, courseId: $courseId) {
      id
      completedEpisodes
      startedFrom
      certificate
      __typename
    }
  }
`;
export const startLab = /* GraphQL */ `
  mutation StartLab($userId: ID!, $labId: ID!) {
    startLab(userId: $userId, labId: $labId) {
      ecs_ip
      expiry
      lab_id
      start
      running
      __typename
    }
  }
`;
export const completeChallenge = /* GraphQL */ `
  mutation CompleteChallenge($userId: ID!, $challengeId: ID!) {
    completeChallenge(userId: $userId, challengeId: $challengeId) {
      id
      name
      description
      solved
      __typename
    }
  }
`;
export const passQuiz = /* GraphQL */ `
  mutation PassQuiz($userId: ID!, $quizId: ID!) {
    passQuiz(userId: $userId, quizId: $quizId) {
      id
      title
      questions {
        id
        text
        choices
        correctAnswer
        __typename
      }
      passed
      __typename
    }
  }
`;
