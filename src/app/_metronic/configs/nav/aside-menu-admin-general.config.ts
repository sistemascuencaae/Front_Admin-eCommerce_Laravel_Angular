export const AsideMenuAdminGeneral = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      name: "dashboard",
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
    },
    { section: 'Usuario' },
    {
      title: 'Usuarios',
      root: true,
      name: "users",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/users',
      submenu: [
        {
          title: 'Gestion Usuarios',
          page: '/users/list'
        }
      ]
    },



    { section: 'Productos' },
    {
      title: 'Categorias',
      root: true,
      name: "categorias",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Electric/Gas-stove.svg',
      page: '/categorias',
      submenu: [
        {
          title: 'Gestion Categorias',
          page: '/categorias/lista'
        }
      ]
    },
    {
      title: 'Productos',
      root: true,
      name: "products",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Home/Armchair.svg',
      page: '/products',
      submenu: [
        {
          title: 'Crear Productos',
          page: '/products/add-product'
        },
        {
          title: 'Listar Productos',
          page: '/products/list-product'
        }
      ]
    },
    {
      title: 'Sliders',
      root: true,
      name: "sliders",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Design/Image.svg',
      page: '/sliders',
      submenu: [
        {
          title: 'Listar Sliders',
          page: '/sliders/lista'
        }
      ]
    },



  ]
}