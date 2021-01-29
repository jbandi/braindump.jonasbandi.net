export function MdImage(props){
  return (
    <div>
      Test: { props.src }
      <img src={props.src}/>
    </div>
  )
}
