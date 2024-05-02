export const MESSAGE = {
  SUCCESS: {
    EMAIL: {
      VERIDIED: 'email_verified',
      CONFIRM: 'confirm_mail_send',
    },
    ROOM: {
      CREATE: 'create_room_success',
      DELETE: 'delete_room_success',
    },
    COPY: 'copy_success',
  },
  ERROR: {
    WRONG: 'wrong',
    INVALID_FIELDS: 'invalid_fields',
    EMAIL: {
      EXIST: 'exist_email',
      NOT: 'not_email',
      SEND: 'mail_send_fail',
    },
    CODE: {
      INVALID: 'invalid_code',
      EXPIRED: 'expired_code',
    },
    TOKEN: {
      NOT: 'not_token',
      EXPIRED: 'expired_token',
    },
    USER: {
      NOT: 'not_user',
    },
    ROOM: {
      CREATE: 'create_room_fail',
      DELETE: 'delete_room_fail',
    },
    COPY: 'copy_fail',
  },
};
