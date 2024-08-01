import getModuleData from '../../../../lib/firestore/lms/get_module_content';

export default async function GetModule(req, res){
        const { courseId, episodeId, lessonId, moduleId } = req.body;

    // Validate request data
    if (!courseId || !episodeId || !lessonId || !moduleId) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }

    try {
        const data = await getModuleData(courseId, episodeId, lessonId, moduleId);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Module data not found.' });
        }
    } catch (error) {
        console.error('Error fetching module data: ', error);
        res.status(500).json({ error: 'Failed to fetch module data.' });
    }
}