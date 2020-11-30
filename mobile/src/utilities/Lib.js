import AsyncStorageUtil from "./AsyncStorageUtil";

export default Lib = {
    showError(error) {
        console.log(error);
        setTimeout(() => {
            alert(error);
        }, 500);
    },

    async processServerResponse(status, json, errorMessage) {
        if (!status || status != 200) {
            console.error(json);
            console.error(errorMessage);
            console.error(status);

            if (status === 400) {
                await AsyncStorageUtil.clear();
                alert("Please try closing the app and reopening the app.");
            }

            throw new Error(json.message ? json.message : errorMessage);
        }
    },

};
