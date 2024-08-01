const admin = require('../firestore_auth');
const db = admin.firestore();
 /**
 * Add episodes, lessons, and modules to a course. Ensures document IDs are in numerical order.
 * 
 * @param {string} courseId 
 * @param {string} episodeName 
 * @param {string} lessonName 
 * @param {string} moduleName 
 * @returns {Promise} 
 */
const addStructure = async (course_id, episodeName, lessonName, moduleName) => {
  try {
    const courseRef = db.collection('course').doc(course_id);
    const courseSnap = await courseRef.get();

    if (!courseSnap.exists) {
      // If course doesn't exist, create new with nested structure
      await courseRef.set({
        course_name: course_id,
        episodes: [{
          episode_name: episodeName,
          lessons: [{
            lesson_name: lessonName,
            modules: [{
              module_name: moduleName
            }]
          }]
        }]
      });
    } else {
      // If course exists, update it by appending to the arrays
      const courseData = courseSnap.data();

      // Find the episode, if it exists
      const episodeIndex = courseData.episodes.findIndex(ep => ep.episode_name === episodeName);
      if (episodeIndex === -1) {
        // Add new episode if it doesn't exist
        await courseRef.update({
          episodes: admin.firestore.FieldValue.arrayUnion({
            episode_name: episodeName,
            lessons: [{
              lesson_name: lessonName,
              modules: [{
                module_name: moduleName
              }]
            }]
          })
        });
      } else {
        // If episode exists, find the lesson within
        const lessonIndex = courseData.episodes[episodeIndex].lessons.findIndex(ls => ls.lesson_name === lessonName);
        if (lessonIndex === -1) {
          // Add new lesson if it doesn't exist within the episode
          courseData.episodes[episodeIndex].lessons.push({
            lesson_name: lessonName,
            modules: [{
              module_name: moduleName
            }]
          });
          await courseRef.set(courseData);
        } else {
          // If lesson exists, add the module
          courseData.episodes[episodeIndex].lessons[lessonIndex].modules.push({
            module_name: moduleName
          });
          await courseRef.set(courseData);
        }
      }
    }

    console.log('Data saved to Firestore successfully');
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
  }
};

//addStructure('web_fdev', 'Introduction', 'HTML Basics', 'Intro to HTML');

module.exports = addStructure;