import { tag, Component, classNames, bind } from 'omi'
import { createPopper } from '@popperjs/core'
import { Router } from 'omi-router'
import { ChevronDown } from 'lucide-omi'
import { Icons } from './icons.tsx'

interface ComponentWithRouter extends Sidebar {
  router?: Router
}

type SidebarItem = {
  text: string
  href: string
  target: string
  name: string
  path: string
  value: string
  type: string
  img?: string
  inner?: string
  children: any[]
  tag?: string
  childrenHeight?: number
  isOpen?: boolean
  icon?: string
}

type Props = {
  items: SidebarItem[]
  active: string
  isOpen: boolean
}

/**
 * 左侧菜单栏组件
 */
@tag('o-sidebar')
export class Sidebar extends Component<Props> {
  static css = `
  :host {
    display: block;
  }
  `

  state = {
    isOpen: false,
    active: '',
  }

  onMouseEnter(item: SidebarItem) {
    if (this.state.isOpen) return
    // @ts-ignore
    item.tooltip.classList.remove('hidden')
    // @ts-ignore
    item.popper.update()
  }

  onMouseLeave(item: SidebarItem) {
    if (this.state.isOpen) return
    // @ts-ignore
    item.tooltip.classList.add('hidden')
    // @ts-ignore
    item.popper.update()
  }

  installed() {
    const triggers = this.shadowRoot?.querySelectorAll('.trigger')!

    triggers.forEach((trigger: Element, index: number) => {
      const tooltip = trigger.querySelector('.tip') as HTMLElement

      if (trigger && tooltip) {
        const popper = createPopper(trigger, tooltip, {
          placement: 'right',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 0],
              },
            },
          ],
        })
        // @ts-ignore
        this.props.items[index].popper = popper
        // @ts-ignore
        this.props.items[index].tooltip = tooltip
      }
    })
  }

  onItemClick(item: SidebarItem) {
    item.isOpen = !item.isOpen
    item.childrenHeight = item.children.length * 36
    this.update()
  }

  receiveProps(props: Props) {
    this.state.active = props.active
    this.state.isOpen = props.isOpen
  }

  install() {
    this.state.active = this.props.active
    this.state.isOpen = this.props.isOpen

    this.props.items.forEach((item) => {
      item.childrenHeight = item.isOpen ? item.children.length * 36 : 0
    })
  }

  @bind
  select(item: SidebarItem) {
    ;(this as ComponentWithRouter).router?.push(item.href.replace('#', ''))

    this.state.active = this.props.active
    this.update()
    this.fire('change', {
      item,
    })
  }

  renderChild(child: SidebarItem) {
    return (
      <li
        onClick={() => this.select(child)}
        class={classNames(
          'py-1 h-9 indent-10 rounded hover:bg-zinc-100 flex items-center text-sm text-zinc-500 dark:text-zinc-200 cursor-pointer',
          {
            'bg-zinc-100': this.state.active === child.value,
          },
        )}
      >
        <a href="javascript:void();" class="flex items-center space-x-2 whitespace-nowrap">
          <span>{child.text}</span>
        </a>
      </li>
    )
  }

  renderToolTipChild(child: SidebarItem) {
    return (
      <li class="py-1 h-9 px-3 rounded hover:bg-zinc-100 flex items-center text-sm text-zinc-500 dark:text-zinc-200">
        <a href={child.href} class="flex items-center space-x-2 whitespace-nowrap">
          <span>{child.text}</span>
        </a>
      </li>
    )
  }

  render() {
    return (
      <section class=" flex">
        <div
          class={classNames('bg-background text-foreground transition-all p-2 flex flex-col justify-between', {
            'w-60': this.state.isOpen,
            'w-16': !this.state.isOpen,
          })}
        >
          {/* logo */}
          <header class={classNames('flex items-center h-[50px] space-x-2 justify-center')}>
            <i class="h-8 w-8">
              <img src="https://omi.cdn-go.cn/admin/latest/home/omi.svg"></img>
            </i>
            <h1
              class={classNames('text-black text-2xl font-semibold whitespace-nowrap', {
                block: this.state.isOpen,
                hidden: !this.state.isOpen,
              })}
            >
              OMI Admin
            </h1>
          </header>
          {/* 菜单 */}
          <nav class="flex-1 overflow-auto">
            <ul>
              {this.props.items.map((item: SidebarItem) => {
                const hasChildren = !!(item.children && item.children.length)
                return (
                  <li>
                    <a
                      href={hasChildren ? 'javascript:' : item.href}
                      onClick={() => this.onItemClick(item)}
                      onMouseEnter={() => this.onMouseEnter(item)}
                      onMouseLeave={() => this.onMouseLeave(item)}
                      class={classNames('trigger flex items-center  hover:bg-zinc-100 h-9 rounded px-2', {
                        'justify-between': this.state.isOpen,
                        'justify-center': !this.state.isOpen,
                      })}
                    >
                      <div class="flex items-center space-x-2 text-zinc-600 dark:text-zinc-200">
                        {/*左侧图标*/}
                        <Icons icon={item.icon} />
                        {/*菜单名称*/}
                        {this.state.isOpen && <span class="text-sm">{item.text}</span>}
                      </div>
                      {/*小屏幕弹窗菜单*/}
                      <ul
                        class="p-1 border tip hidden overflow-hidden bg-background dark:bg-zinc-800 rounded shadow-md"
                        style={{
                          opacity: this.state.isOpen ? '0' : '1',
                        }}
                      >
                        {item.children.map((child: SidebarItem) => {
                          return this.renderToolTipChild(child)
                        })}
                      </ul>
                      {/* 打开关闭图标 */}
                      {hasChildren && this.state.isOpen && (
                        <ChevronDown
                          size="18"
                          class={classNames('transition-all text-zinc-500', {
                            'rotate-0': !item.isOpen,
                            'rotate-180': item.isOpen,
                          })}
                        />
                      )}
                    </a>
                    {/* 大屏幕菜单 */}
                    {hasChildren && this.state.isOpen && (
                      <ul
                        class="transition-all overflow-hidden"
                        style={{
                          height: item.isOpen ? item.childrenHeight + 'px' : '0',
                        }}
                      >
                        {item.children.map((child: SidebarItem) => {
                          return this.renderChild(child)
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </section>
    )
  }
}
