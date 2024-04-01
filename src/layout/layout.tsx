import { classNames, Component, tag, VNode } from 'omi'
import { activeMenuItem, activeSidebarItem, isSidebarOpen, navbarItems, sidebarItems } from '../store.ts'
import '@/components/sidebar'

/* Because the menu needs to update user avatars, a separate component is packaged for local updates */
@tag('sidebar-wrpapper')
export class SidebarWrapper extends Component {
  render() {
    return (
      <o-sidebar
        onChange={(evt: CustomEvent) => (activeSidebarItem.value = evt.detail.item.value)}
        items={sidebarItems.value}
        active={activeSidebarItem.value}
        isOpen={isSidebarOpen.value}
        onInstalled={() => {}}
      />
    )
  }
}

export function AdminLayout(props: { current?: string; children?: VNode | VNode[] }) {
  return (
    <article class="flex h-screen ">
      <section
        class={classNames(' text-white flex flex-col transition-all', {
          'w-60': isSidebarOpen.value,
          'w-16': !isSidebarOpen.value,
        })}
      >
        <sidebar-wrpapper />
      </section>

      {/*  右侧 */}
      <section class="flex-1 flex flex-col overflow-auto bg-background text-foreground border-l">
        {/*  头部菜单 */}
        <header class="shadow py-2 px-4 sticky	">
          <div class="flex items-center justify-between">
            <button
              class="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-600"
              onClick={() => (isSidebarOpen.value = !isSidebarOpen.value)}
            >
              <svg
                fill="none"
                viewBox="0 0 16 16"
                width="1.5em"
                height="1.5em"
                class="t-icon t-icon-view-list collapsed-icon"
              >
                <path
                  fill="currentColor"
                  d="M14 4.5H2v-1h12v1zM14 8.5H2v-1h12v1zM2 12.5h12v-1H2v1z"
                  fill-opacity="0.9"
                ></path>
              </svg>
            </button>

            <o-navbar items={navbarItems.value} value={activeMenuItem.value} onInstalled={() => {}}></o-navbar>
          </div>
        </header>
        {/*  内容区*/}
        <div class="p-4 relative flex-1 ">
          <div class=" absolute inset-0 overflow-y-auto overflow-x-hidden">{props.children}</div>
        </div>
      </section>
    </article>
  )
}
