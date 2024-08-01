import get_labs from '../firestore/get_labs';

const SECRET_KEY = process.env.JWT_KEY; // Replace this with a long and secure random string

const lab_access = async (userId, lab) => {
  var access = {
    access : false
  };
    try {
        const labs = await get_labs(userId)
        labs.map((available_lab) => {
          if(available_lab.lab_id === lab){
            //Check if the lab is running or not
            if(available_lab.task_running === ""){
              //Send the access object
              access = {
                access : true,
                running : false
              }
            }
            else {
              //Send the access object if lab alread running
              access = {
                access : true,
                running : available_lab.task_running
              }
            }
          }
        });
        return access;
        }
     catch (error) {
      return error;
    }
}

module.exports = lab_access;