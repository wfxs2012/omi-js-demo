import { tag, Component } from 'omi'
import css from './index.scss?raw'

@tag('list-page')
export default class extends Component {
  static css = css

  render() {
    return <>list page !</>
  }
}
