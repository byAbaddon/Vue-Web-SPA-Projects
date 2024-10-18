/* Function to manipulate Locale Storage  */

// Save object to localStorage
const saveDataToLocalStorage = (objectName = "dataMovies", data) => {
  try {
    localStorage.setItem(objectName, JSON.stringify(data));
    return 'Data was saved successfully!';
  } catch (error) {
    console.log('Failed to save data:', error);
  }
};

// Get data from localStorage
const getDataFromLocalStorage = (objectName = "dataMovies") => {
  try {
    const storedData = localStorage.getItem(objectName);
    if (storedData) {
      const parsedData = JSON.parse(storedData); // From JSON to object
      // console.log('Get Data success:', parsedData);
      return parsedData;
    } else {
      console.log('No data found in localStorage');
    }
  } catch (error) {
    console.log('Failed to get data:', error);
  }
};



// Delete object from localStorage
const deleteDataFromLocalStorage = (objectName = "dataMovies") => {
  try {
    localStorage.removeItem(objectName);
    console.log('Object was deleted successfully.');
  } catch (error) {
    console.log('Failed to delete object:', error);
  }
};

// Clear all data from localStorage
const clearAllDataLocalStorage = () => {
  try {
    localStorage.clear();
    console.log('LocalStorage was cleared successfully!');
  } catch (error) {
    console.log('Failed to clear LocalStorage!', error);
  }
};

export { saveDataToLocalStorage, getDataFromLocalStorage, deleteDataFromLocalStorage, clearAllDataLocalStorage };
