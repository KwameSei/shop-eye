const Items = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
  {
    title: 'Logout',
    url: '/logout',
  },
  // {
  //   title: 'Register',
  //   url: '/register',
  // },
  {
    title: 'Profile',
    url: '/profile/:id',
    submenu: [
      {
        title: 'Update Profile',
        url: '/profile/:id',
      },
      {
        title: 'Logout',
        url: '/logout',
      },
    ],
  },
];

export default Items;