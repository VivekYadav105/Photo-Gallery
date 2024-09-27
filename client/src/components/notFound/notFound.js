import {Link} from 'react-router-dom';
import './index.css'
const NotFound = ()=>{
    return(
        <section className='wrapper'>
            <div className="content">
                <div style={{marginBottom:'-10px'}}>
                    <img src='/404.png'></img>
                </div>
                <div className='content_404'>
                    <span id='text-main'>404</span>
                    <span id='caption'>Could Not Find the File</span>
                    <Link to={'/home'}>
                        <button className="header-btn no_shadow">Go Home</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound