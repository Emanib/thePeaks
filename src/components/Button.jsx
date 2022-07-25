
export default function Button({content, onClick}) {
  return (
    <button  onClick= {onClick} className = 'btn-view'> {content} </button>
  )
}
