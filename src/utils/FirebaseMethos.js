export const handleAddData = async () => {
    try {
        await addDoc(trackerCollection, {
            amount,
            date,
            name,
            option: optionType
        }
        )
        setUpdatedValues({name:"",option:"",date:"",amount:""});
        getData();
        console.log(name, date, optionType, amount)
    } catch (error) {
        console.log(error);
    }
}

//  get all data
export const getData = async () => {
    try {
        const data = await getDocs(trackerCollection);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTracker(filteredData);
        // console.log(filteredData);
    } catch (error) {
        console.log(error)
    }
}