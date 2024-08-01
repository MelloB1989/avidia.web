const admin = require('../../firestore_auth');
const db = admin.firestore();

/**
 * Fetches the module data based on provided IDs.
 * 
 * @param {string} courseId 
 * @param {number} episodeId 
 * @param {number} lessonId 
 * @param {number} moduleId 
 * @returns {Promise<Object>} Returns module data or null if not found.
 */
const getModuleData = async (courseId, episodeId, lessonId, moduleId) => {
    try {
        // Reference to the desired module document
        const moduleRef = db.collection('course_content')
                            .doc(courseId)
                            .collection('episodes')
                            .doc(episodeId.toString())
                            .collection('lessons')
                            .doc(lessonId.toString())
                            .collection('modules')
                            .doc(moduleId.toString());

        // Fetch the document
        const doc = await moduleRef.get();

        // Check if document exists and return its data
        if (doc.exists) {
            //console.log(doc.data().module_content);
            return doc.data();
        } else {
            console.error('Module not found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching module data: ', error);
        throw new Error('Failed to fetch module data.');
    }
}

//getModuleData('test', 3, 1, 1);

module.exports = getModuleData;