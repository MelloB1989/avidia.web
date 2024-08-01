const admin = require('../../firestore_auth');
const db = admin.firestore();

/**
 * Fetches the episode name, lesson name, and module name based on provided IDs.
 * 
 * @param {string} courseId 
 * @param {number} episodeId 
 * @param {number} lessonId 
 * @param {number} moduleId 
 * @returns {Promise<Object>} Returns an object with episode name, lesson name, and module name or null if not found.
 */
const getNamesByIDs = async (courseId, episodeId, lessonId, moduleId) => {
    try {
        // Reference to the desired documents
        const episodeRef = db.collection('course_content').doc(courseId).collection('episodes').doc(episodeId.toString());
        const lessonRef = episodeRef.collection('lessons').doc(lessonId.toString());
        const moduleRef = lessonRef.collection('modules').doc(moduleId.toString());

        // Fetch the documents
        const [episodeDoc, lessonDoc, moduleDoc] = await Promise.all([episodeRef.get(), lessonRef.get(), moduleRef.get()]);

        // Check if documents exist and return their data
        if (episodeDoc.exists && lessonDoc.exists && moduleDoc.exists) {
            const data = {
                episode_name: episodeDoc.data().episode_name,
                lesson_name: lessonDoc.data().lesson_name,
                module_name: moduleDoc.data().module_name
            }
            //console.log(data);
            return data;
        } else {
            console.error('Data not found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw new Error('Failed to fetch data.');
    }
}

//getNamesByIDs('bootcamp_2024', 1, 1, 1);

module.exports = getNamesByIDs;