import { AppConstants } from "@/utils/constants";

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
};

export const validateLink = (url: string): boolean => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
}

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
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;  // Convert 0 to 12 for midnight
    const minutesFormatted = minutes.toString().padStart(2, '0');
  
    return `${hour12}:${minutesFormatted}${period}`;
}

export const formatDate = (date: Date, returnFormatAsString: boolean = false): string => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    if (returnFormatAsString === true) return `${day} ${month} ${year}`;
    return `${year}-${monthNumber}-${day}`;
}

export const estimateReadingTime = (textLength: number) => {
    const wordsPerMinute = 200;
    const avgWordLength = 5;
  
    const totalWords = textLength / avgWordLength;
    const readingTimeMinutes = totalWords / wordsPerMinute;
  
    return Math.ceil(readingTimeMinutes);
}


export const getTimeAgoFromDate = (date: string) => {
    const now = new Date();
    const inputDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} secs ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} mins ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export const getYoutubeEmbedVideoLink = (url?: string) => {
    if (!url) return AppConstants.defaultPlaceYoutubeUrl;

    const embedPattern = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
    if (embedPattern.test(url)) {
        return url;
    }

    const videoIdPattern = /(?:youtube\.com\/(?:shorts\/|(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdPattern);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }

    return AppConstants.defaultPlaceYoutubeUrl;
}

export const getWeekday = (date: Date): string => {
    const weekday = date.toLocaleString('en-US', { weekday: 'long' });
    return weekday;
}

export const generateAvailableTimeIntervalsForPlace = (
    { 
        opening_time, 
        closing_time,
    }: { 
        opening_time?: string; 
        closing_time?: string;
    } = {},
    date_selected: Date,
): string[] => {
    if (!opening_time || opening_time?.length < 1 || !closing_time || closing_time?.length < 1 || !date_selected) return [];

    const passedDate = new Date(date_selected);
    const passedDateFormmatted = formatDate(passedDate);

    const openingDate = new Date(`${passedDateFormmatted}T${opening_time}`);
    const closingDate = new Date(`${passedDateFormmatted}T${closing_time}`);
  
    const lastAvailableTime = new Date(closingDate);
    lastAvailableTime.setHours(lastAvailableTime.getHours() - 1);

    const timeIntervals: string[] = [];
    let currentTime = new Date(openingDate);
    
    while (currentTime.getTime() <= lastAvailableTime.getTime()) {
        const currentTimeString = currentTime.toISOString().slice(11, 19); // format as HH:MM:SS
        if (currentTime.getTime() >= passedDate.getTime()) {
            timeIntervals.push(currentTimeString);
        }
        currentTime.setHours(currentTime.getHours() + 1);
    }
    return timeIntervals;
}

export const checkIfDateIsLessThanNYears = (date: Date, n: number) => {
    if (n < 1) return true;

    const currentYear = new Date().getFullYear();
    const selectedYear = date.getFullYear();

    return selectedYear <= currentYear - n;
};

export const calulateYearsDifference = (date: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();

    // Adjust if the birthday hasn't occurred yet this year
    const monthDifference = currentDate.getMonth() - selectedDate.getMonth();
    const dayDifference = currentDate.getDate() - selectedDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}

export const shareLinkToSocialMedia = (platform: string, url: string) => {
    let shareUrl = '';

    switch (platform.toLowerCase()) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
            break;
        case 'instagram':
            return;
        default:
            return;
    }

    // Open the share URL in a new window
    window.open(shareUrl, '_blank', 'width=600, height=400');
}

export const copyToClipboard = async (content: string) => {
    try {
        await navigator.clipboard.writeText(content)
    } catch (error) {}
}

export const getOrdinalPosition = (num: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = Math.abs(num);
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;
  
    // Determine suffix
    let suffix = suffixes[0]; // Default to "th"
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      suffix = suffixes[1]; // "st"
    } else if (lastDigit === 2 && lastTwoDigits !== 12) {
      suffix = suffixes[2]; // "nd"
    } else if (lastDigit === 3 && lastTwoDigits !== 13) {
      suffix = suffixes[3]; // "rd"
    }
  
    return `${num}${suffix}`;
} 

export const base64ToFile = (base64Data: string, fileName: string, mimeType: string): File => {
    // Split the base64 data into the metadata and the actual base64 data
    const base64String = base64Data.split(',')[1]; // Remove the "data:image/jpeg;base64," part

    // Decode the base64 string
    const binaryString = atob(base64String); 

    // Convert the binary string to a byte array
    const byteArray = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: mimeType });

    return file;
}

export const getExtensionFromMimeType = (mimeType: string): string | null => {
    const mimeTypeMap: { [key: string]: string } = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/bmp': 'bmp',
        'image/tiff': 'tiff',
        'image/svg+xml': 'svg',
        'image/vnd.microsoft.icon': 'ico',
        'image/x-icon': 'ico',
        
        'audio/mpeg': 'mp3',
        'audio/wav': 'wav',
        'audio/ogg': 'oga',
        'audio/webm': 'weba',
        'audio/mp4': 'm4a',
        'audio/x-wav': 'wav',
        'audio/pcm': 'pcm',
        
        'video/mp4': 'mp4',
        'video/webm': 'webm',
        'video/ogg': 'ogv',
        'video/mpeg': 'mpg',
        'video/x-msvideo': 'avi',
        'video/x-flv': 'flv',
        'video/quicktime': 'mov',
        'video/3gpp': '3gp',
        'video/x-matroska': 'mkv',
        
        'text/plain': 'txt',
        'text/html': 'html',
        'text/css': 'css',
        'text/javascript': 'js',
        'text/csv': 'csv',
        'text/xml': 'xml',
        'text/markdown': 'md',
        
        'application/json': 'json',
        'application/xml': 'xml',
        'application/pdf': 'pdf',
        'application/zip': 'zip',
        'application/gzip': 'gz',
        'application/x-tar': 'tar',
        'application/x-rar-compressed': 'rar',
        'application/x-7z-compressed': '7z',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'application/octet-stream': 'bin',
        
        'font/woff': 'woff',
        'font/woff2': 'woff2',
        'font/otf': 'otf',
        'font/ttf': 'ttf',
        
        'application/javascript': 'js',
        'application/x-javascript': 'js',
        'application/ld+json': 'jsonld',
        
        'application/vnd.ms-fontobject': 'eot',
        'application/x-font-ttf': 'ttf',
        'application/x-font-otf': 'otf',
        
        'application/vnd.mozilla.xul+xml': 'xul',
        'application/x-shockwave-flash': 'swf',
        
        'application/rtf': 'rtf',
        'application/x-www-form-urlencoded': 'urlencoded',
        'application/x-httpd-php': 'php',
        'text/rtf': 'rtf',
    };

    return mimeTypeMap[mimeType] || null;
}

export const blurFocusFromCurrentPage = () => {
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement && typeof activeElement.blur === 'function') activeElement.blur();
}