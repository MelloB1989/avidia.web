const admin = require('../../firestore_auth');
const db = admin.firestore();
const userId = "1";
const taskArn = "arn:aws:ecs:ap-south-2:641688873870:task/Respawn/a28037d1261d403fae60490a58987626";

const test = async () => {
try {
        const activityRef = db.collection('admin').doc('activity');
        const doc = await activityRef.get();

        if (doc.exists) {
            const activeLabs = doc.data().active_labs || [];
            const updatedLabs = activeLabs.filter(lab => {
                return !(lab.user_id === userId && lab.task_id === taskArn);
            });

            console.log("Update Labs", updatedLabs);
            await activityRef.update({
                active_labs: updatedLabs
            });

            console.log('User ID and Task ID removed successfully!');
        } else {
            console.log('Document does not exist!');
        }
    } catch (error) {
        console.error('Error updating activityRef:', error);
        return error;
    }
}
test();

/*const admin = require('../../firestore_auth');
const db = admin.firestore();
const data = {
        "course_name": "cohort_2024",
        "episodes": [
            {
                "episode_name": "Introduction and Setting Up",
                "lessons": [
                    {
                        "lesson_name": "The World of C Programming",
                        "modules": [
                            {
                                "module_name": "Origin and Evolution of C"
                            },
                            {
                                "module_name": "Key Advantages of C"
                            },
                            {
                                "module_name": "Real-world Applications of C"
                            }
                        ]
                    },
                    {
                        "lesson_name": "Your First C Experience",
                        "modules": [
                            {
                                "module_name": "Crafting the \"Hello, World!\" Program"
                            },
                            {
                                "module_name": "Understanding Compilation and Execution"
                            }
                        ]
                    }
                ]
            }
        ]
}
const fetchUserDocument = async (userId) => {
  /*db.collection("courses").doc("web_dev").get()
    .then((doc) => {
      if (doc.exists) {
        console.log("User data:", JSON.stringify(doc.data()));
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
    db.collection("course").doc("cohort_2024").set(data)
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    }

// Usage
fetchUserDocument("0");
*/