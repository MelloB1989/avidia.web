import setUnlockDates from '../../../lib/firestore/timetable/set_unlock_dates';
export default async (req, res) => {
    const { courseId, unlockDates } = req.body;

    const result = await setUnlockDates(courseId, unlockDates);

    if (result.success) {
        res.json({ message: 'Unlock dates set successfully' });
    } else {
        res.status(500).json({ error: result.error });
    }
}