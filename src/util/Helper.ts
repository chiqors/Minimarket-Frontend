import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

import { APP_BACKEND_URL } from "@/config";

export const checkIfPhotoFromExternalSource = (photo: string) => {
    // check if photo is from external source
    if (photo) {
        return photo.includes("http");
    } else {
        return false;
    }
};

export const getAssetPath = (asset: string) => {
    // get asset path
    const checkAsset = checkIfPhotoFromExternalSource(asset);
    if (checkAsset) {
        return asset;
    } else {
        return `${APP_BACKEND_URL + asset}`;
    }
};

export const getAgeFromBirthDate = (birthDate: string) => {
    // example output: 21
    return dayjs().diff(dayjs(birthDate), "year");
}

export const getGenderName = (gender: string) => {
    if (gender === "M") {
        return "Male";
    } else if (gender === "F") {
        return "Female";
    } else {
        return "Unknown";
    }
}

export const convertToCurrency = (amount: number) => {
    // indonesia currency format
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export const shortenDescription = (description: string) => {
    if (description.length > 100) {
        return description.slice(0, 100) + "...";
    } else {
        return description;
    }
}

export const getBirthdate = (datetime: string) => {
    // example output: "1999-12-31"
    return dayjs(datetime).format("YYYY-MM-DD");
};

export const getHumanReadableDate = (datetime: string) => {
    // example output: "September 1, 2021"
    return dayjs(datetime).format("MMMM D, YYYY");
};

export const getHumanReadableTime = (datetime: string) => {
    // example output: "12:00 AM"
    return dayjs(datetime).format("h:mm A");
};

export const getHumanReadableDatetime = (datetime: string | undefined) => {
    // example output: "September 1, 2021 12:00 AM"
    if (datetime) {
        return dayjs(datetime).format("MMMM D, YYYY h:mm A");
    } else {
        return "-";
    }
};

export const getHumanReadableDatetimeV2 = (datetime: string | undefined) => {
    // example output: 20:00 at 20 Jan 2021
    if (datetime) {
        return dayjs(datetime).format("HH:mm [at] DD MMM YYYY");
    } else {
        return "-";
    }
}

export const getHumanReadableDateFromNow = (datetime: string) => {
    // yesterday, 2 days ago and 3 days ago. After that, it will return the date
    if (dayjs().diff(dayjs(datetime), "day") < 4) {
        return dayjs(datetime).fromNow();
    } else {
        return getHumanReadableDatetime(datetime);
    }
}