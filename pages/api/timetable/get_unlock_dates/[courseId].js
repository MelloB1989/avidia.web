import getUnlockDates from '../../../../lib/firestore/timetable/get_unlock_dates';
export default async (req, res) => {
    const { courseId } = req.params;

    const result = await getUnlockDates(courseId);

    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
}