export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
};

export const getDayOfTheWeek = (date: Date) => {
    const day = new Date(date).getDay();
    const weekday= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    if (!weekday[day]) return '';

    return weekday[day];
}

export const getAllDaysOfTheWeek = () => {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
}

export const getMonthsOfTheYear = () => {
    return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
}

export const generateDashLinkForUser = (userIsOwner?: boolean) => {
    return `/dashboard/${userIsOwner === true ? 'owner' : 'user'}`
}

export const convertFileObjectToBinaryStr = (fileObj: File): Promise<string | ArrayBuffer | null> => {
    // returning a new promise
    return new Promise((resolve, reject) => {
        // instantiating a new object of the FileReader class to read the file object passed
        const reader = new FileReader();

        // using the object to read the file as a data url i.e 'data:image/...'
        reader.readAsDataURL(fileObj);

        // on successful read of file
        reader.onload = () => resolve(reader.result);

        // on error reading the file
        reader.onerror = error => reject(error);
    });
}

export const formatTimeString = (timeStr: string) => {
    const date = new Date(`1970-01-01T${timeStr}Z`);
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    return date.toLocaleString('en-US', options);
}

export const estimateReadingTime = (textLength: number) => {
    const wordsPerMinute = 200;
    const avgWordLength = 5;
  
    const totalWords = textLength / avgWordLength;
    const readingTimeMinutes = totalWords / wordsPerMinute;
  
    return Math.ceil(readingTimeMinutes);
}