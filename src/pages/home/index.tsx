import { tag, Component } from 'omi'
import css from './index.scss?raw'

import '@/components-ui/button'

@tag('home-page')
export default class extends Component {
  static css = css

  render() {
    return (
      <>
        <div class="flex gap-4 flex-wrap">
          <o-button color="primary">Primary</o-button>
          <o-button color="secondary">Secondary</o-button>
          <o-button color="success">Success</o-button>
          <o-button color="info">Info</o-button>
          <o-button color="warning">Warning</o-button>
          <o-button color="danger">Danger</o-button>
          <o-button color="light">Light</o-button>
          <o-button color="dark">Dark</o-button>
        </div>
        <div class="flex gap-4 flex-wrap mt-10">
          <o-button variant="outlined" color="primary">
            Primary
          </o-button>
          <o-button variant="outlined" color="secondary">
            Secondary
          </o-button>
          <o-button variant="outlined" color="success">
            Success
          </o-button>
          <o-button variant="outlined" color="info">
            Info
          </o-button>
          <o-button variant="outlined" color="warning">
            Warning
          </o-button>
          <o-button variant="outlined" color="danger">
            Danger
          </o-button>
          <o-button variant="outlined" color="light">
            Light
          </o-button>
          <o-button variant="outlined" color="dark">
            Dark
          </o-button>
        </div>

        <div class="flex gap-4 flex-wrap mt-10">
          <o-button variant="text" color="primary">
            Primary
          </o-button>
          <o-button variant="text" color="secondary">
            Secondary
          </o-button>
          <o-button variant="text" color="success">
            Success
          </o-button>
          <o-button variant="text" color="info">
            Info
          </o-button>
          <o-button variant="text" color="warning">
            Warning
          </o-button>
          <o-button variant="text" color="danger">
            Danger
          </o-button>
          <o-button variant="text" color="light">
            Light
          </o-button>
          <o-button variant="text" color="dark">
            Dark
          </o-button>
        </div>
        <div class="flex gap-4 flex-wrap mt-10">
          <o-button roundedFull color="primary">
            Primary
          </o-button>
          <o-button roundedFull color="secondary">
            Secondary
          </o-button>
          <o-button roundedFull color="success">
            Success
          </o-button>
          <o-button roundedFull color="info">
            Info
          </o-button>
          <o-button roundedFull color="warning">
            Warning
          </o-button>
          <o-button roundedFull color="danger">
            Danger
          </o-button>
          <o-button roundedFull color="light">
            Light
          </o-button>
          <o-button roundedFull color="dark">
            Dark
          </o-button>
        </div>
        <div class="flex gap-4 flex-wrap mt-10">
          <o-button size="small" color="primary">
            Primary
          </o-button>

          <o-button size="medium" color="primary">
            Primary
          </o-button>
          <o-button size="large" color="primary">
            Primary
          </o-button>
          <o-button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-1 h-4 w-4">
              <path
                fill-rule="evenodd"
                d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                clip-rule="evenodd"
              />
            </svg>
            Button
          </o-button>
        </div>
        <div class="mt-10 w-2/3">
          <o-button color="primary" fullWidth className="mb-2">
            Button
          </o-button>
          <o-button color="secondary" variant="outlined" fullWidth>
            Button
          </o-button>
        </div>
      </>
    )
  }
}
