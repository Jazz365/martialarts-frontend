export class AppConstants {
    static get tokenKey () {
        return 'MARTIAL_DETAIL'
    }

    static get savedToken () {
        return localStorage.getItem(this.tokenKey);
    }

    static get socialLinks () {
        return {
            instagram: 'https://www.instagram.com/martialarts.guru/',
            youtube: 'https://www.youtube.com/channel/UC6uU1pZ3QmwzRoKtYH_DiSw',
        }
    }

    static get guruSupportMail () {
        return 'team@martialarts.guru';
    }

    static get defaultPlaceYoutubeUrl () {
        return "https://www.youtube.com/embed/bxuYDT-BWaI";
    }

    static get mapKey () {
        return 'MARTIAL_MAP_KEY'
    }
}