import "./FeaturesHome.css"

export default function FeaturesHome (props) {
    return(
        
        <div className='container-features-item'>
          <img src={props.icon} alt='chat item' className='feature-icon' />
          <h2 className='feature-item-title'>{props.title}</h2>
          <p className='feature-item-texte'>
            {props.texte}
          </p>
        </div>
        
    )
}