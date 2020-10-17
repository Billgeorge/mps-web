import React from "react";
import "assets/scss/landingCheckout.scss";
import GridContainer from "components/Grid/GridContainer.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridItem from "components/Grid/GridItem.js";

const dashboardRoutes = [];

export default function LandingCheckout(props) {

    const { ...rest } = props;

    React.useEffect(() => dinamycBackground(), []);
    const dinamycBackground = ()=>{
        const canvas = document.getElementById('canvas');
        canvas.style.width='100%';
        canvas.style.height='100%';
        //canvas.width  = canvas.offsetWidth;
        //canvas.height = canvas.offsetHeight;
            const context = canvas.getContext('2d');
            let time = 0;

            const color = function (x, y, r, g, b) {
                context.fillStyle = `rgb(${r}, ${g}, ${b})`
                context.fillRect(x, y, canvas.width, canvas.height);
            }
            const R = function (x, y, time) {
                let r = Math.floor(20 + 40 * Math.cos((x * x - y * y) / 300 + time))
                console.log(r)
                return r;
            }

            const G = function (x, y, time) {
                return (Math.floor(100 + 64 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300)));
            }

            const B = function (x, y, time) {
                return 250;
            }

            const startAnimation = function () {
                for (let x = 0; x <= 30; x++) {
                    for (let y = 0; y <= 30; y++) {
                        color(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
                    }
                }
                time = time + 0.03;
                window.requestAnimationFrame(startAnimation);
            }

            startAnimation();
    }
       

    return (
        
            
        <GridContainer justify="center" style={{width:"100%", margin:"0"}}>
                
                
                <Header class="header"
                    color="transparent"
                    routes={dashboardRoutes}
                    brand="MiPagoSeguro"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                    height: 400,
                    color: "white"
                    }}
                    {...rest}
                />
                
                <GridItem xs={12} sm={12} md={12} style={{padding:"0%"}}>
                    <div class="diagonal-section bg-contrast-lower">
                    <canvas id="canvas"></canvas>
                    </div>
                    <div class="title">
                        <h1 class="h1-title">Te ponemos el checkout</h1>
                        <p>Simple y minimalista. Hecho para incrementar conversiones y ahorrar dinero</p>
                    </div>
                </GridItem>                    
            
      </GridContainer>
      
    )

}