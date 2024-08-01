const admin = require('../firestore_auth');
const db = admin.firestore();

/**
 * Add episodes, lessons, and modules to a course.
 * 
 * @param {string} courseId 
 * @param {string} episodeId
 * @param {string} episodeName 
 * @param {string} lessonId
 * @param {string} lessonName 
 * @param {string} moduleId
 * @param {string} moduleName 
 * @param {string} moduleContent 
 * @returns {Promise} 
 */
const addContent = async (courseId, episodeId, episodeName, lessonId, lessonName, moduleId, moduleName, moduleContent) => {
  try {
    //console.log(moduleContent);
    const courseRef = db.collection('course_content').doc(courseId);

    // Add or update episode
    await setDocumentWithId(courseRef.collection('episodes'), episodeId, { episode_name: episodeName });

    // Add or update lesson to the episode
    const episodeRef = courseRef.collection('episodes').doc(episodeId);
    await setDocumentWithId(episodeRef.collection('lessons'), lessonId, { lesson_name: lessonName });

    // Add or update module to the lesson
    const lessonRef = episodeRef.collection('lessons').doc(lessonId);
    await setDocumentWithId(lessonRef.collection('modules'), moduleId, {
      module_name: moduleName,
      module_content: moduleContent,
    });

    return { success: true, message: 'Content added successfully!' };
  } catch (error) {
    console.error('Error adding content: ', error);
    throw new Error('Failed to add content.');
  }
}

/**
 * Set the document with the provided ID and data.
 * 
 * @param {CollectionReference} collection 
 * @param {string} documentId
 * @param {Object} data 
 * @returns {Promise} 
 */
const setDocumentWithId = async (collection, documentId, data) => {
  const docRef = collection.doc(documentId);
  await docRef.set(data);
  return docRef;
}

module.exports = addContent;