import React from 'react'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Hotels = React.lazy(() => import('./views/pages/hotels/Hotels'))
const Customers = React.lazy(() => import('./views/pages/customers/Customers'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const MediaEntertainment = React.lazy(() =>
  import('./views/pages/complimentary_services/media-entertainment/MediaEntertainment'),
)
// routing for managing Complimentary services (Popular with Guest)
const FormControl = React.lazy(() =>
  import('./views/pages/complimentary_services/Popular-with-guests/GuestPopular'),
)
// End of the above routing
const Other = React.lazy(() => import('./views/pages/complimentary_services/others/Other'))
const Subscription = React.lazy(() => import('./views/pages/subscriptions/Subscription'))
const Amenities = React.lazy(() => import('./views/pages/amenities/Amenities'))
const AddSubscription = React.lazy(() => import('./views/pages/subscriptions/AddSubscription'))
const Bathroom = React.lazy(() => import('./views/pages/complimentary_services/bathrooms/Bathroom'))
const RoomFeature = React.lazy(() =>
  import('./views/pages/complimentary_services/room-features/RoomFeature'),
)

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },

  {
    path: '/hotels',
    name: 'Hotels',
    element:
      // <PrivateRoute>
      Hotels,
    // </PrivateRoute>
  },

  {
    path: '/customers',
    name: 'Customers',
    element:
      // <PrivateRoute>
      Customers,
    // </PrivateRoute>
  },

  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  {
    path: '/complimentary-services/popular-with-guests',
    name: 'Form Control',
    element: FormControl,
  },
  { path: '/complimentary-services/room-feature', name: 'RoomFeature', element: RoomFeature },
  {
    path: '/complimentary-services/media-entertainment',
    name: 'Media& Entertainment',
    element: MediaEntertainment,
  },
  { path: '/complimentary-services/bathroom', name: 'Bathroom', element: Bathroom },
  { path: '/complimentary-services/other', name: 'Other', element: Other },
  { path: '/subscriptions', name: 'Subscription', element: Subscription },
  { path: '/amenities', name: 'Amenities', element: Amenities },
  { path: '/addsubscriptions', name: 'AddSubscription', element: AddSubscription },
  { path: '/addsubscriptions/:id', name: 'AddSubscription', element: AddSubscription },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
