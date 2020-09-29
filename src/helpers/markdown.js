/* Parses markdown to HTML */
import snarkdown from 'snarkdown'

const markdown = text => snarkdown(text)

export default markdown
