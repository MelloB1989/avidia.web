import { gql } from "@apollo/client";

const mutations = {
    createUser: gql`mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}`,
  createSubscription: gql`mutation CreateSubscription($input: CreateSubscribedCourseInput!) {
  createSubscribedCourse(input: $input) {
    id
  }
}`,
  createLab: gql`mutation CreateLab($input: CreateActiveLabInput!) {
  createActiveLab(input: $input) {
    id
  }
}`
};

module.exports = mutations;