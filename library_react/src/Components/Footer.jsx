import { Link } from "react-router-dom";

const Footer = () => {

    return(
        <>
        <h3>Contact us</h3>
        <ul>
            <li><Link to="https://goo.gl/maps/UUcjZu9sXGEoJ9Zx8">500 Sesame St, West Carson, CA 90502, USA</Link></li>
            <li><Link to="mailto:info@squadgoal.com">info@squadgoal.com</Link></li>
            <li><Link to="https://wa.me/9724733378901">Tel: 4733378901</Link></li>
        </ul>
        <h3>Find us</h3>
        <ul>
            <li><Link to="https://www.instagram.com/"><i class="fa fa-instagram"></i></Link></li>
            <li><Link to="https://he-il.facebook.com/"><i class="fa fa-facebook-official"></i></Link></li>
        </ul>
        <p>© 2023 by Anat Mersha. All rights reserved to A.M.</p>
        </>
    )
}

export default Footer;