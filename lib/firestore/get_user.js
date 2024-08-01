const admin = require('../firestore_auth');

const get_user = async (userId) => {
    try{
        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);
        const snapshot = await userRef.get();
        const user = snapshot.data();
        //console.log(user)
        return user;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = get_user;