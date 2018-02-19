import Texty from './Texty'
export default class BlueButton extends Component {
  render() {
    return (
      <TouchableOpacity style={{backgroundColor:'blue'}} onPress={() => this.props.onPress()}>
        <Texty style={{color:'white'}}>{this.props.title}</Texty>
      </TouchableOpacity>
    )
  }
}