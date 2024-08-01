const admin = require('../../firestore_auth');
const db = admin.firestore();
const subscribe_course = async (userId, courseId, labs) => {
    //TODO: THIS IS BAD, MORE THAN TWO COURSES CANNOT BE ADDED, FIX THIS AFTERWARDS.
    const updateData = {
        my_courses: [
    {
      started_from: '2024-07-21T04:32:03Z',
      id: "cohort_2024"
    }
  ],
  active_labs: [
    {
      status: 'stopped',
      ecs_ip: '',
      start: '',
      task_running: '',
      expiry: '',
      lab_id: labs
    }
  ]
    };
  // Get the document reference
  const userDocRef = db.collection('users').doc(userId);

  // First, get the document
  userDocRef.get().then(docSnapshot => {
    // If the document does not exist, create it with default values
    if (!docSnapshot.exists) {
      userDocRef.set({
        my_courses: [],
        active_labs: [],
        challenges: [],
        time_spent: []
      }).then(() => {
        // After creating the document, update it
        return userDocRef.update(updateData);
      });
    } else {
      // If the document already exists, update it
      return userDocRef.update(updateData);
    }
  })
  .then(() => {
    console.log('User data updated successfully');
  })
  .catch((error) => {
    console.error('Error updating user data: ', error);
  });
}

//subscribe_course("367", "", "vs_code");
module.exports = subscribe_course;