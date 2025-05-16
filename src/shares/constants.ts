export const constants = {
  USER: {
    SEX: {
      FEMALE: 'Female',
      MALE: 'Male',
    },
    IMAGE_FOR_SEX: {
      FEMALE: 'https://i.imgur.com/9ClDjnR.png',
      MALE: 'https://i.imgur.com/A4rs3bu.png',
    },
    POSITION: {
      GUEST: "Guest",
      MEMBER: "Member",
      MANAGER: "Manager",
      ADMIN: "Admin",
      POSTER: "Poster",
      COLLABORATOR: "Collaborator",
      MODERATOR: "Moderator" 
    }
  },

  AUTH: {
    METHOD_LOGIN: {
      GOOGLE: 'Google',
      ACCOUNT: 'Account',
    },
  },
};

export const env = {
  SANDBOX: "SANDBOX",
  PRODUCTION: "PRODUCTION"
}