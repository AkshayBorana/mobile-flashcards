const logger = (store) => (next) => (action) => {
    console.group(action.type);
     console.log(`The action is`, action.type);
     const returnData = next(action);
     console.log(`The new State is`, store.getState());
    console.groupEnd();

    return returnData;
}

export default logger;