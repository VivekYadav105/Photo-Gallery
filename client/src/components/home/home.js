import { Link } from 'react-router-dom'
import './home.css'
export default function Home(){
    return(
    <section style={{flexDirection:"column"}}>
        <div className="home_content">
            <div className='illustration'>
                <img src='/illustration-main.png' alt='GALLERY'/>
            </div>
            <div>
                <p className="heading">Connect with your media remotely via <span>GALLERY</span></p>
                <p className="caption">Effortlessly upload your photos and share your moments with the world. Our platform makes it simple and seamless for you to showcase your creativity</p>
                <Link to={'/'}>
                    <button className="header-btn no-shadow">Try Now</button>
                </Link>
            </div>
        </div>
        <div className="full_panel">

        </div>
        <div className="full_panel">
            
        </div>
    </section>)
}