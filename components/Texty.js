export default class Texty extends Component {
  render() {
    return (
      <Text>{this.props.children + 'y'}</Text>
    )
  }
}
