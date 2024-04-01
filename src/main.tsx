import { routes } from './routes'
import { Router } from 'omi-router'
import '@/styles/tailwind'
import '@/styles/main.scss'

// 为了被扫出来，不然样式丢失
// @ts-ignore
const classes = 'bg-success    bg-danger bg-warning bg-info '

const router = new Router({
  routes,
  renderTo: '#app',
})

router.afterEach(() => {})
