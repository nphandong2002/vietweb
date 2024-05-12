const root = {
  home: '/',
  room: '/room',
  login: '/login',
  register: '/register',
  setting: '/setting',
  pet: '/pet',
};

export const PATHS = {
  home: { root: root.home },
  setting: { root: root.setting },
  room: { root: root.room, detail: (id: string) => `${root.room}/${id}` },
  login: { root: root.login },
  register: { root: root.register },
  pet: { root: root.pet },
  error: '/error',
};

export const DEFAULT_LOGIN_REDIRECT = PATHS.home.root;
