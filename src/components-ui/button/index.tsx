import { classNames, Component, tag } from 'omi'
import { tailwind } from '../../styles/tailwind'
import 'omi-ripple'
type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

type Props = {
  ripple: boolean
  color: Colors
  variant: 'contained' | 'outlined' | 'text'
  size: 'small' | 'medium' | 'large'
  tag: 'button' | 'a'
  href?: string
  rounded?: boolean
  floating?: boolean
  disabled?: boolean
  fullWidth?: boolean
  roundedFull?: boolean
  uppercase?: boolean
  active?: boolean
  className: string
  children: any[]
}

// https://mui.com/material-ui/api/button/
const theme = {
  common:
    'flex items-center justify-center leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0 overflow-hidden',

  light: {
    contained: 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-200',
    active: 'bg-neutral-200',
    outlined: 'border-neutral-100 text-neutral-800 hover:border-neutral-200 focus:border-neutral-200',
    outlined_active: '',

    text: 'text-neutral-800 hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-200',
    text_active: 'bg-neutral-200',
  },
  dark: {
    contained: 'bg-neutral-800 text-neutral-50 hover:bg-neutral-800 focus:bg-neutral-800 active:bg-neutral-900',
    active: 'bg-neutral-900',
    outlined: 'border-neutral-800 text-neutral-800',
    outlined_active: '',
    text: 'text-neutral-800 hover:bg-neutral-800 focus:bg-neutral-800 active:bg-neutral-900 hover:text-white focus:text-white active:text-white',
    text_active: 'bg-neutral-900',
  },

  secondary: {
    contained:
      'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:bg-secondary/80 active:bg-secondary/90',
    active: 'bg-primary-accent-200',
    text: 'text-primary hover:bg-secondary/80 focus:bg-secondary/80 active:bg-secondary hover:text-primary focus:text-primary active:text-primary',
    text_active: 'bg-secondary text-primary',
  },
  primary: {
    contained: 'bg-primary text-primary-foreground hover:bg-primary/80 focus:bg-primary/80 active:bg-primary/90',
    active: 'bg-primary-700',
    outlined: ' border-primary text-primary',
    outlined_active: '',
    text: 'text-primary hover:bg-primary/80 focus:bg-primary/80 active:bg-primary/90 hover:text-white focus:text-white active:text-white',
    text_active: 'bg-primary/90 text-white',
  },
  success: {
    contained: 'bg-success text-white hover:bg-success-600 focus:bg-success-600 active:bg-success-700',
    active: 'bg-success-700',
    outlined:
      ' border-success text-success hover:border-success-600 focus:border-success-600 active:border-success-700 hover:text-success-600 focus:text-success-600 active:text-success-700',
    outlined_active: 'border-success-700 text-success-700',
    text: 'text-success hover:bg-success-600 focus:success-600 active:success-700 hover:text-success-600 focus:text-success-600 active:text-success-700',
    text_active: 'bg-success-700 text-success-700',
  },
  danger: {
    contained: 'bg-danger text-white hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-700',
    active: 'bg-danger-700',
    outlined:
      ' border-danger text-danger hover:border-danger-600 focus:border-danger-600 active:border-danger-700 hover:text-danger-600 focus:text-danger-600 active:text-danger-700',
    outlined_active: 'border-danger-700 text-danger-700',
    text: 'text-danger hover:bg-danger-600 focus:danger-600 active:danger-700 hover:text-danger-600 focus:text-danger-600 active:text-danger-700',
    text_active: 'bg-danger-700 text-danger-700',
  },
  warning: {
    contained: 'bg-warning text-white hover:bg-warning-600 focus:bg-warning-600 active:bg-warning-700',
    active: 'bg-warning-700',
    outlined:
      ' border-warning text-warning hover:border-warning-600 focus:border-warning-600 active:border-warning-700 hover:text-warning-600 focus:text-warning-600 active:text-warning-700',
    outlined_active: 'border-warning-700 text-warning-700',
    text: 'text-warning hover:bg-warning-600 focus:warning-600 active:warning-700 hover:text-warning-600 focus:text-warning-600 active:text-warning-700',
    text_active: 'bg-warning-700 text-warning-700',
  },
  info: {
    contained: 'bg-info text-white hover:bg-info-600 focus:bg-info-600 active:bg-info-700',
    active: 'bg-info-700',
    outlined:
      ' border-info text-info hover:border-info-600 focus:border-info-600 active:border-info-700 hover:text-info-600 focus:text-info-600 active:text-info-700',
    outlined_active: 'border-info-700 text-info-700',
    text: 'text-info hover:bg-info-600 focus:info-600 active:info-700 hover:text-info-600 focus:text-info-600 active:text-info-700',
    text_active: 'bg-info-700 text-info-700',
  },

  contained: '',
  outlined: '',
  text: '',

  small: 'px-4 leading-[29px] text-xs font-medium h-[29px]',
  medium: 'px-6 leading-[36px] text-xs font-medium h-[36px]',
  large: 'px-7 leading-[43px] text-sm font-medium h-[43px]',

  rounded: 'rounded',
  roundedFull: 'rounded-full',

  fullWidth: 'w-full block',

  floating: {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  },

  disabled: 'pointer-events-none opacity-50',
}

@tag('o-button')
export class Button extends Component<Props> {
  static css = [
    tailwind,
    `:host {
    display: inline-block;
  }
  `,
  ]

  static defaultProps = {
    ripple: true,
    color: 'primary',
    variant: 'contained',
    size: 'medium',
    tag: 'button',
    href: null,
    rounded: true,
    floating: false,
    disabled: false,
    fullWidth: false,
    roundedFull: false,
    uppercase: false,
    active: false,
    className: '',
  }

  install() {
    if (this.props.fullWidth) {
      this.style.display = 'block'
    }
  }

  updated() {
    if (this.props.fullWidth) {
      this.style.display = 'block'
    }
  }

  render(props: Props) {
    const { color } = props
    // @ts-ignore
    const config: any = theme[color]
    let active = ''
    let btnClass = ''

    switch (props.variant) {
      case 'contained':
        btnClass = config.contained
        active = config.active
        break

      case 'outlined':
        switch (props.color) {
          case 'secondary':
            btnClass = `border-2  hover:bg-neutral-500  hover:bg-opacity-10 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`
            active = ``
            break
          default:
            btnClass = `border-2 ${config.outlined} hover:bg-neutral-500  hover:bg-opacity-10`
            active = config.outlined_active
            break
        }
        break
      case 'text':
        switch (props.color) {
          case 'light':
          case 'dark':
            btnClass = `${config.text}  `
            active = config.text_active
            break
          default:
            btnClass = `${config.text}  hover:bg-opacity-10 focus:bg-opacity-10 active:bg-opacity-10`
            active = config.text_active
            break
        }
    }

    return (
      <props.tag
        type={props.tag === 'button' ? 'button' : undefined}
        href={props.tag === 'a' ? props.href : undefined}
        o-ripple={props.ripple === false ? null : ''}
        class={classNames({
          [theme.common]: true,
          [btnClass]: true,
          [theme[props.size]]: props.size && !props.floating,
          [theme.rounded]: props.rounded && !props.roundedFull,
          [theme.roundedFull]: props.roundedFull,
          [props.className]: true,
          [theme.disabled]: props.disabled,
          [theme.floating[props.size]]: props.floating,
          [theme.fullWidth]: props.fullWidth,
          uppercase: props.uppercase,
          [active]: props.active && !props.disabled,
        })}
      >
        <slot></slot>
      </props.tag>
    )
  }
}
