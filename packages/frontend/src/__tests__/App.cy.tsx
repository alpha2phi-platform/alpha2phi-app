import { mount } from '@cypress/react18'
import App from '../App'

describe('<App>', () => {
  it('mounts', () => {
    mount(<App />)
  })
})
