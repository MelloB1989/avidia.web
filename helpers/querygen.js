import { gql } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';

const querygen = (q, i) => {
  if(q === "getCohort") return gql`query getCohort {
  queryCohortsByIdPermalinkIndex(permalink: \"${i}\") {
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
      labCredits
      offerings
      syllabus
    }
  }
}`
else if(q === "getInstructor") return gql`query getInstructor {
  getInstructor(id: \"${i}\") {
    description
    designation
    id
    name
    nbspID
    nbspUsername
    profile
  }
}`
else if(q === "getUserCoderD") return gql`query getUser {
  getUser(nbspID: \"${i}\") {
    coderlabUID
    AVC_balance
    id
  }
}`
else if(q === "createQuiz") return gql`mutation MyMutation {
  createQuiz(input: {qd: \"${i.qd}\", score: ${i.score}, u_nbspid: \"${i.nbspid}\"}) {
    id
  }
}`
else if(q === "getUserCourseIds") return gql`query MyQuery {
  getUser(nbspID: \"${i.nbspid}\") {
    subscribedCourseIds
    transactions
  }
}`
else if(q === "getUserCourseQuiz") return gql`query MyQuery {
  getSubscribedCourse(id: \"${i}\") {
    quizzes
    score
  }
}`
else if(q === "updateUserCourseQuiz") return gql`mutation MyMutation {
  updateSubscribedCourse(input: {id: \"${i.id}\", quizzes: ${JSON.stringify(i.quizzes)}, score: ${i.score}, nbsp: \"${i.nbspid}\"}) {
    id
  }
}`
else if(q === "createUserCourse") return gql`mutation MyMutation {
  createSubscribedCourse(input: {nbsp: \"${i.nbspid}\", permalink: \"${i.permalink}\", startedFrom: \"${(new Date()).toISOString()}\"}){
    id
  }
}`
else if(q === "registerUserCourse") return gql`mutation MyMutation {
  updateUser(input: {nbspID: \"${i.nbspid}\", subscribedCourseIds: ${JSON.stringify(i.courses)}, transactions: ${JSON.stringify(i.transactions)}}){
    id
  }
}`
else if(q === "getUserQuizzes") return gql`query MyQuery {
  listQuizzes(filter: {u_nbspid: {eq: \"${i}\"}}) {
    items {
      id
      qd
      score
    }
  }
}`
else if(q === "getLiveSessions") return gql`query MyQuery ($filter: TableLiveSessionsFilterInput) {
  listLiveSessions(filter: $filter) {
    items {
      courseId
      endTimestamp
      id
      instructor
      slug
      title
      timestamp
      thumbnail
    }
  }
}`
else if(q === "getQuizContestQuestions") return gql`query MyQuery($filter: TableQuizQuestionFilterInput) {
  listQuizQuestions(filter: $filter) {
    items {
      id
      question
      options_data
      description
    }
  }
}`
else if(q === "getQuizContestAnswers") return gql`query MyQuery {
  listQuizQuestions(filter: {contest_slug: {eq: \"${i}\"}}) {
    items {
      id
      answer
      score
    }
  }
}`
else if(q === "getQuizContestQuestion") return gql`query MyQuery {
  listQuizQuestions(filter: {contest_slug: {eq: \"${i}\"}}) {
    items {
      id
      question
      answer
      score
    }
  }
}`
else if(q === "getQuizContestByCourseId") return gql`query MyQuery {
  queryQuizContestsByIdCourseIndex(course_id: \"${i}\") {
    items {
      start
      slug
      name
      image
      id
      end
      description
      course_id
    }
  }
}`
else if(q === "getQuizContestBySlug") return gql`query MyQuery($slug: String!) {
  queryQuizContestsByIdSlugIndex(slug: $slug) {
    items {
      course_id
      description
      end
      id
      image
      name
      slug
      start
    }
  }
}`
else if(q === "putquizAnswers") return gql `mutation createQuizAnswers {
  createQuizAnswers(input: {answers: "${i.answers}", correct: \"${i.correct}\", courseId: \"${i.courseId}\", nbspId: \"${i.nbspId}\", quizSlug: \"${i.quizSlug}\", timeTaken: \"${i.timeTake}\", score: ${i.score}}) {
    nbspId
  }
}`
else if (q === "getQuizAnswers") return gql `query MyQuery {
  getQuizAnswers(nbspId: \"${i.nbsp}\", quizSlug: \"${i.slug}\") {
    score
    timeTaken
    quizSlug
    nbspId
    courseId
    correct
    answers
  }
}`
else if(q === "getQuizAnswersByNbspId") return gql`query MyQuery {
  queryQuizAnswersByNbspIdCourseIdIndex(nbspId: \"${i}\") {
    items {
      answers
      correct
      courseId
      nbspId
      quizSlug
      score
      timeTaken
    }
  }
}`
else if(q === "getUserTransactions") return gql`query MyQuery {
  getUser(nbspID: \"${i}\") {
    transactions
  }
}`
else if(q === "getTransactionDetails") return gql`query MyQuery {
  getMyCustomType(id: \"${i}\") {
    amt
    date
    description
    type
  }
}`
else if (q === "addQuizQuestion") return gql`mutation MyMutation($input: CreateQuizQuestionInput!) {
  createQuizQuestion(input: $input) {
    id
  }
}`
else if(q === "addQuizContest") return gql`mutation MyMutation($input: CreateQuizContestInput!) {
  createQuizContest(input: $input) {
    id
  }
}`
else if(q === "addHandouts") return gql`mutation MyMutation($input: CreateHandoutsInput!) {
  createHandouts(input: $input) {
    id
  }
}`
else if(q === "getCourseHandouts") return gql`query MyQuery {
  listHandouts(filter: {courseId: {eq: \"${i}\"}}) {
    items {
      courseId
      description
      id
      name
      url
    }
  }
}`
else if(q === "listCohorts") return gql`query MyQuery {
  listCohorts {
    items {
      id
    }
  }
}`
else if(q === "getCohortById") return gql `query MyQuery {
  queryCohortsByIdPermalinkIndex(permalink: \"${i}\") {
    items {
      type
      thumb
      startDate
      requirements
      registrations
      priceInr
      previewVideo
      permalink
      numberEnrolled
      name
      labs
      intercept
      instructors
      id
      description
      coupons
      catchLine
      labCredits
      offerings
      syllabus
    }
  }
}`
else if(q === "getUserSubscribedCourses") return gql`query MyQuery {
  getUser(nbspID: \"${i}\") {
    subscribedCourseIds
  }
}`
else if(q === "getUserSubscribedCourse") return gql`query MyQuery {
  getSubscribedCourse(id: \"${i}\") {
    nbsp
    permalink
    certificate
    challengeAttempted
    challenges
    completedEpisodes
    id
    practiseSessions
    quizAttempted
    quizzes
    score
    startedFrom
  }
}`

else if(q === "getGITID") return gql`query getUser {
  getUser(nbspID: \"${i}\") {
    coderlabUID
    git_uid
    id
  }
}`

else if(q === "updateUserGITID") return gql`mutation MyMutation {
  updateUser(input: {git_uid: "${i.gitID}", nbspID: "${i.nbspID}"}) {
    nbspID
  }
}`

else if(q === "createUserProject") return gql`mutation MyMutation {
  createAvidiaProjects(input: {courseID: \"${i.courseID}\", nbspid: \"${i.nbspID}\", slug: \"${i.slug}\", description: "", points: [], steps: [], verified_feedback: []}) {
    nbspid
    courseID
  }
}`

else if(q === "getCourseProject") return gql`query MyQuery {
  listAvidiaProjectDetails(filter: {courseID: {eq: \"${i}\"}}) {
    items {
      courseID
          description
          commits
          price
          project_slug
          steps
          title
          thumbnail
          template_url
    }
  }
}`;

else if(q === "getCourseProjectsBySlug") return gql`query MyQuery {
  getAvidiaProjectDetails(project_slug: \"${i}\") {
    courseID
    description
    price
    project_slug
    steps
    title
    thumbnail
    template_url
    commits
  }
}`;

else if(q === "getUserProjects") return gql `query MyQuery {
  getAvidiaProjects(nbspid: \"${i.nbspID}\", slug: \"${i.slug}\") {
    verified_feedback
    points
    nbspid
    courseID
    slug
    steps
  }
}`

else if(q === "getCoupons") return gql`query MyQuery {
  listCoupons(filter: {coupon: {eq: \"${i}\"}}) {
    items {
      applies
      coupon
      id
      discount
    }
  }
}`

else if(q === "createLiveSession") return gql`mutation MyMutation {
  createLiveSessions(input: {courseId: \"${i.courseId}\", endTimestamp: \"${i.end}\", id: \"${uuidv4()}\", instructor: \"${i.instructor}\", joinRoomID: \"${i.room}\", recordedURL: \"${i.recorded}\", slug: \"${i.slug}\", thumbnail: \"${i.thumbnail}\", timestamp: \"${i.start}\", title: \"${i.title}\"}) {
    endTimestamp
  }
}`

else if(q === "updateLiveSession") return gql`mutation MyMutation {
  updateLiveSessions(input: {
    id: \"${i.id}\",
    ${i.courseId !== "" ? `courseId: \"${i.courseId}\",` : ""} 
    ${i.end !== "" ? `endTimestamp: \"${i.end}\",` : ""}  
    ${i.instructor !== "" ? `instructor: \"${i.instructor}\",` : ""} 
    ${i.room !== "" ? `joinRoomID: \"${i.room}\",` : ""} 
    ${i.recorded !== "" ? `recordedURL: \"${i.recorded}\",` : ""} 
    ${i.slug !== "" ? `slug: \"${i.slug}\",` : ""} 
    ${i.title !== "" ? `title: \"${i.title}\",` : ""} 
    ${i.start !== "" ? `timestamp: \"${i.start}\",` : ""} 
    ${i.thumbnail !== "" ? `thumbnail: \"${i.thumbnail}\"` : ""}
  }) {
    id
  }
}`
else if(q === "updateSession") return gql`mutation MyMutation($input: UpdateLiveSessionsInput!) {
  updateLiveSessions(input: $input) {
    id
  }
}`
else if(q === "createSession") return gql`mutation MyMutation($input: CreateLiveSessionsInput!) {
  createLiveSessions(input: $input) {
    id
  }
}`
else if(q === "listAllTransactions") return gql`query MyQuery {
  listMyCustomTypes(filter: {type: {eq: \"${i.cohort}\"}}) {
    items {
      amt
      date
      description
      id
      type
    }
  }
}`

else if(q === "createAvidiaProjectDetails") return gql`mutation MyMutation($input: CreateAvidiaProjectDetailsInput!) {
  createAvidiaProjectDetails(input: $input) {
    title
    courseID
  }
}`

}

module.exports = querygen;