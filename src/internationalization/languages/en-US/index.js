export default {
  translation: {
    initialPage: {
      register: 'Register',
      alreadyAPlayer: 'Already a player?',
    },
    home: {
      welcome: 'Welcome,',
      upcomingEvents: 'Upcoming events',
      eventHistory: 'Event history',
    },
    login: {
      emailLabel: 'Email',
      passwordLabel: 'Password',
      submitButton: 'Login',
      forgotPassword: 'Forgot password?',
      forgotPasswordButton: 'Click here!',
      errorMessage: 'Invalid credentials',
      error: {
        emailType: 'Email must be a valid email',
        emailRequired: 'Enter an email',
        passwordRequired: 'Enter a password',
      },
    },
    forgotPassword: {
      userNotFound: 'User not found',
      successMessage: 'An email with a token was sent to the email typed!',
      errorMessage: 'Send email error',
      emailLabel: 'Email',
      submitButton: 'Send',
      error: {
        emailType: 'Invalid email',
        emailRequired: 'Enter an email',
      },
    },
    forgotPasswordToken: {
      successMessage: 'Token validated successfully!',
      errorMessage: 'Token invalid',
      tokenLabel: 'Insert the token sent to your email',
      submitButton: 'Send',
      error: {
        tokenRequired: 'Enter token',
      },
    },
    forgotPasswordNewPassword: {
      successMessage: 'Password changed successfully!',
      errorMessage: 'Change password error',
      passwordLabel: 'Insert new password',
      submitButton: 'Send',
      error: {
        passwordRequired: 'Enter password',
        passwordMin: 'At least 8 characters',
      },
    },
    register: {
      successMessage: 'Registered successfully!',
      errorMessage: 'Register error',
      firstStep: {
        firstNameLabel: 'Name',
        lastNameLabel: 'Last name',
        ageLabel: 'Age',
        genderLabel: 'Gender',
        submitButton: 'Next',
        error: {
          firstNameRequired: 'Enter a name',
          lastNameRequired: 'Enter a last name',
          ageRequired: 'Enter an age',
          genderRequired: 'Enter a gender',
          cityRequired: 'Enter a city',
          stateRequired: 'Enter a state',
        },
      },
      secondStep: {
        emailLabel: 'Email',
        passwordLabel: 'Password',
        submitButton: 'Register',
        error: {
          emailType: 'Invalid email',
          emailRequired: 'Enter an email',
          passwordRequired: 'Enter a password',
          passwordMin: 'At least 8 characters',
        },
      },
    },
    editProfile: {
      firstNameLabel: 'Name',
      lastNameLabel: 'Last name',
      ageLabel: 'Age',
      genderLabel: 'Gender',
      cityLabel: 'City',
      stateLabel: 'State',
      submitButton: 'Save',
      successMessage: 'Profile updated successfully!',
      errorMessage: 'Profile update error',
      error: {
        firstNameRequired: 'Enter a name',
        lastNameRequired: 'Enter a last name',
        ageRequired: 'Enter an age',
        genderRequired: 'Enter a gender',
        cityRequired: 'Enter a city',
        stateRequired: 'Enter a state',
      },
    },
    changeEmail: {
      emailLabel: 'New email',
      submitButton: 'Save',
      successMessage: 'Email updated successfully!',
      errorMessage: 'Email update error',
      error: {
        emailRequired: 'Enter new email',
        emailInvalid: 'Email invalid',
      },
    },
    changePassword: {
      passwordLabel: 'New password',
      confirmPasswordLabel: 'Confirm new password',
      submitButton: 'Save',
      successMessage: 'Password updated successfully!',
      errorMessage: 'Password update error',
      error: {
        passwordRequired: 'Enter new password',
        confirmPasswordRequired: 'Enter confirm new password',
        equalPassword: 'The passwords should be equal',
        passwordMin: 'At least 8 characters',
      },
    },
    createEvent: {
      cityLabel: 'City',
      stateLabel: 'State',
      localLabel: 'Local',
      dateLabel: 'Date',
      startTimeLabel: 'Start time',
      endTimeLabel: 'End time',
      playersQuantityLabel: 'Players quantity',
      submitButton: 'Create',
      successMessage: 'Event created successfully!',
      errorMessage: 'Create event error',
      error: {
        cityRequired: 'Enter a city',
        stateRequired: 'Enter a state',
        localRequired: 'Enter a local',
        dateRequired: 'Enter a date',
        startTimeRequired: 'Enter start time',
        endTimeRequired: 'Enter end time',
        playersQuantityRequired: 'Enter players quantity',
        playersQuantityMin: 'Minimum 2 players',
        startTimeGreaterThanCurrentTime:
          'Start time should be greather than current time',
        endTimeGreaterThanStartTime:
          'End time should be greather than start time',
      },
    },
    editEvent: {
      cityLabel: 'City',
      stateLabel: 'State',
      localLabel: 'Local',
      dateLabel: 'Date',
      startTimeLabel: 'Start time',
      endTimeLabel: 'End time',
      playersQuantityLabel: 'Players quantity',
      submitButton: 'Edit',
      successMessage: 'Event edited successfully!',
      errorMessage: 'Edit event error',
      error: {
        cityRequired: 'Enter a city',
        stateRequired: 'Enter a state',
        localRequired: 'Enter a local',
        dateRequired: 'Enter a date',
        startTimeRequired: 'Enter start time',
        endTimeRequired: 'Enter end time',
        playersQuantityRequired: 'Enter players quantity',
        startTimeGreaterThanCurrentTime:
          'Start time should be greather than current time',
        endTimeGreaterThanStartTime:
          'End time should be greather than start time',
      },
    },
    events: {
      title: 'Events',
      createEvent: 'Create event',
      filters: 'Filters',
    },
    viewEvent: {
      participantsText: 'Participants',
      settingsText: 'Settings',
      reviewUsersText: 'Rate users',
      joinText: 'Join',
      joinEventSuccessMessage: 'You joined the event!',
      joinEventErrorMessage: 'Erro joining event',
      removeUserFromEventSuccessMessage: 'User removed successfully!',
      removeUserFromEventErrorMessage: 'Remove user from event error',
      userItem: {
        hostLabel: 'Host',
        removeLabel: 'Remove',
      },
      settings: {
        editEvent: 'Edit event',
        deleteEvent: 'Delete event',
        leftEvent: 'Left event',
        deleteSuccessMessage: 'Event deleted successfully"',
        deleteErrorMessage: 'Delete event error',
        leftSuccessMessage: 'You left the event',
        leftErrorMessage: 'Left event error',
      },
    },
    reviewPlayers: {
      submitButton: 'Save',
      successMessage: 'Rating made successfully!',
      errorMessage: 'Rating players error',
      error: {
        ratingRequired: 'Enter rating',
      },
    },
    eventChat: {
      errorMessage: 'Send message error',
    },
    chatsSettings: {
      newChat: 'New chat',
      newGroupChat: 'New group chat',
    },
    newGroupChat: {
      nameLabel: 'Name',
      submitButton: 'Save',
      successMessage: 'Group created successfully!',
      errorMessage: 'Create group error',
      error: {
        nameRequired: 'Enter a name',
      },
    },
    editGroupChat: {
      nameLabel: 'Name',
      submitButton: 'Save',
      successMessage: 'Group updated successfully!',
      errorMessage: 'Update group error',
      error: {
        nameRequired: 'Enter a name',
      },
    },
    addUserToGroup: {
      successMessage: 'User added successfully!',
      errorMessage: 'Add user error',
    },
    viewGroup: {
      settings: {
        addUsers: 'Add users',
        editGroup: 'Edit group',
        deleteGroup: 'Delete group',
        leftGroup: 'Left group',
        deleteSuccessMessage: 'Group deleted successfully"',
        deleteErrorMessage: 'Delete group error',
        leftSuccessMessage: 'You left the group',
        leftErrorMessage: 'Left group error',
        removeUserFromGroupSuccessMessage: 'User removed successfully!',
        removeUserFromGroupErrorMessage: 'Remove user from group error',
      },
    },
    profile: {
      title: 'Profile',
      editProfileButton: 'Edit profile',
      age: 'Age',
    },
    viewUser: {
      ageLabel: 'Age',
      cityStateLabel: 'City/State',
      ratingLabel: 'Rating',
      sendFriendRequestButton: 'Send friend request',
      answerFriendRequestButton: 'Answer friend request',
      removeFriendButton: 'Remove friend',
      cancelFriendRequestButton: 'Cancel friend request',
      sendFriendRequestSuccess: 'Friend request sent successfully!',
      sendFriendRequestError: 'Send friend request error',
      removeFriendSuccess: 'Friend removed successfully!',
      removeFriendError: 'Remove friend error',
      cancelFriendRequestSuccess: 'Friend request cancelled successfully!',
      cancelFriendRequestError: 'Cancel friend request error',
    },
    friends: {
      title: 'Friends',
    },
    addFriend: {
      nameLabel: 'Name',
      nameInputPlaceholder: 'Search..',
    },
    friendsNotifications: {
      sentFriendRequest: 'Sent you a friend request.',
      accept: 'Accept',
      decline: 'Decline',
    },
    settings: {
      changeLanguage: 'Change language',
      changeEmail: 'Change email',
      changePassword: 'Change password',
      logout: 'Logout',
    },
    changeLanguageModal: {
      title: 'Change language',
    },
    gender: {
      male: 'Masculino',
      female: 'Feminino',
    },
    routes: {
      changeLanguage: 'Change language',
      settings: 'Settings',
      register: 'Register',
      chooseSport: 'Choose sport',
      createEvent: 'Create event',
      editProfile: 'Edit profile',
      changePassword: 'Change password',
      changeEmail: 'Change email',
      editEvent: 'Edit event',
      eventChat: 'Event chat',
      calendar: 'Calendar',
      eventHistory: 'Event history',
      addFriend: 'Add friend',
      notifications: 'Notifications',
      newChat: 'New chat',
      newGroupChat: 'New group chat',
      reviewPlayers: 'Rating players',
      editGroup: 'Edit group',
      selectCity: 'Select city',
      addUsers: 'Add users',
      forgotPassword: 'Forgot password',
      forgotPasswordToken: 'Enter token',
      forgotPasswordNewPassword: 'New password',
    },
    sports: {
      soccer: 'Soccer',
      basketball: 'Basketball',
      tennis: 'Tennis',
      tableTennis: 'Table tennis',
      volleyball: 'Voleyball',
      football: 'Football',
      baseball: 'Baseball',
      golf: 'Golf',
    },
    chatMessageInput: {
      messageLabel: 'Message...',
    },
    selectCity: {
      placeholder: 'Search city...',
    },
    eventSelectCity: {
      title: 'Select city',
      stateLabel: 'State',
      cityLabel: 'City',
      submitButton: 'Save',
      errorMessage: 'Select city error',
      error: {
        cityRequired: 'Enter a city',
        stateRequired: 'Enter a state',
      },
    },
    mediaPermissionErrorMessage:
      'We need camera permission to alter profile image',
  },
};
