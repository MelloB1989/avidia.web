import getNamesByIDs from '../../../../lib/firestore/lms/get_names';  // Adjust the path accordingly

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();  // Method Not Allowed
    }

    const { courseId, episodeId, lessonId, moduleId } = req.body;

    try {
        const names = await getNamesByIDs(courseId, episodeId, lessonId, moduleId);
        if (names) {
            return res.status(200).json(names);
        } else {
            return res.status(404).json({ error: 'Data not found.' });
        }
    } catch (error) {
        console.error('Error fetching names: ', error);
        return res.status(500).json({ error: 'Failed to fetch names.' });
    }
}