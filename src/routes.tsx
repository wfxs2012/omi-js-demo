import 'omi-suspense'
import './index.css'
import { Router } from 'omi-router'
import { AdminLayout } from './layout/layout.tsx'
import { Component } from 'omi'
import { pending } from './components/pending.tsx'
import { fallback } from './components/fallback.tsx'

export const routes = [
  createAdminRoute('/', () => import('./home-page')),
  {
    path: '*',
    render() {
      return <h1 class="text-3xl">404</h1>
    },
  },
]

function createAdminRoute(path: string, componentImport: () => Promise<unknown>) {
  return {
    path,
    render(router: Router) {
      return (
        <AdminLayout current={router.currentRoute?.path}>
          <o-suspense
            minLoadingTime={400}
            imports={[componentImport()]}
            customRender={(results: { [x: string]: Function }[]) => {
              const Module = results[0][Object.keys(results[0])[0]]
              return (
                <o-appear
                  class="opacity-0 translate-y-4"
                  onReady={() => {
                    // @ts-ignore
                    window.refreshDark()
                    window.scrollTo(0, 0)
                  }}
                >
                  {isClassOrFunction(Module) === 'Function' ? Module(router.params) : <Module></Module>}
                </o-appear>
              )
            }}
            fallback={fallback}
            beforePending={async (suspense: Component) => {
              suspense.shadowRoot?.firstElementChild?.classList.add('opacity-0', 'translate-y-4')
              return new Promise((resolve) => setTimeout(resolve, 300))
            }}
            pending={pending}
            onLoaded={() => {
              // @ts-ignore
              window.refreshDark()
            }}
          ></o-suspense>
        </AdminLayout>
      )
    },
  }
}
function isClassOrFunction(obj: any) {
  if (typeof obj !== 'function') {
    return 'Not a function or class'
  }

  if (obj.prototype && obj.prototype.constructor === obj) {
    if (obj.toString().startsWith('class ')) {
      return 'Class'
    } else {
      return 'Function'
    }
  }
  return 'Not a function or class'
}
