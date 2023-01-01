const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
         <div className="mainPage">
                <div className='AppMainLinkPage'>

                    <Link className="linkToApp mail" to="/mail">
                    <img src="./assets/img/Email-PNG-High-Quality-Image.png"/>
                    </Link>
                    <Link className="linkToApp note" to="/note">
                        <img src="./assets/img/Google_Keep_icon_(2020).png"/>
                    </Link>
                </div>
            </div>
       
    </section>
}