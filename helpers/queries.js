import { gql } from "@apollo/client";

const queries = {
    getUser: gql`query getUser($input: String!) {
  getUser(nbspID: $input) {
    active_labs
    attendedLiveSessions
    id
    nbspID
    subscribedCourseIds
    timeSpentIds
  }
}`,
getUserQuiz: gql`query getUser($input: String!) {
  getUser(nbspID: $input) {
    quizzes
  }
}`,
  getUserCoderD: gql`query getUser($input: String!) {
  getUser(nbspID: $input) {
    coderlabUID
    AVC_balance
    id
  }
}`,
  getCohort: gql`query getCohort($input: String!) {
  queryCohortsByIdPermalinkIndex(permalink: $input) {
    items {
      catchLine
      coupons
      description
      id
      instructors
      intercept
      labs
      name
      numberEnrolled
      previewVideo
      priceInr
      registrations
      requirements
      startDate
      thumb
      type
    }
  }
}`,
getInstructor: gql`query getInstructor($input: ID!) {
  getInstructor(id: $input) {
    description
    designation
    id
    name
    nbspID
    nbspUsername
    profile
  }
}`,
listInstructors: gql`query listInstructors {
  listInstructors(limit: 10) {
    items {
      description
      id
      name
      nbspID
      profile
      designation
      nbspUsername
    }
  }
}`
};

module.exports = queries;