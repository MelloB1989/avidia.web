const admin = require('../firestore_auth');

const get_labs = async (userId) => {
    try{
        if(!userId) { return null; console.log("UserID not defined!"); }
        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);
        const snapshot = await userRef.get();
        const courses = snapshot.data().active_labs;
        //console.log(courses)
        return courses;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = get_labs;