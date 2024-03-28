import {routes} from './routes'
import {Router} from 'omi-router'
import './tailwind'

const router = new Router({
    routes,
    renderTo: '#app'
})

router.afterEach(() => {
    // @ts-ignore
  window.refreshDark()
})
