const Items = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Products',
    url: '/products-display',
  },
  {
    title: 'Best Selling',
    url: '/best-selling',
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'Events',
    url: '/product-events',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
  {
    title: 'FAQ',
    url: '/faq',
  },
  // {
  //   title: 'Login',
  //   url: '/login',
  // },
  // {
  //   title: 'Logout',
  //   url: '/logout',
  // },
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