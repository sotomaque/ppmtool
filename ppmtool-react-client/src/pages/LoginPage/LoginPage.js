import React, { useLayoutEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Lock from '@material-ui/icons/Lock';

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';

import styles from "../../assets/js/login.js";

import image from "../../assets/img/login.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage() {
    useLockBodyScroll();

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    return (
        <>
            <Header
                color="transparent"
                brand="Personal Project Management"
                rightLinks={<HeaderLinks login={true} />}
                fixed
                changeColorOnScroll={{
                height: 200,
                color: "white"
                }}
            />
            <div style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center"
            }}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    {/* SOCIAL LOGIN OPTIONS */}
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                        <div className={classes.socialLine}>
                                        <Button
                                            justIcon
                                            href="#pablo"
                                            target="_blank"
                                            color="transparent"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className={"fab fa-twitter"} />
                                        </Button>
                                        <Button
                                            justIcon
                                            href="#pablo"
                                            target="_blank"
                                            color="transparent"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className={"fab fa-facebook"} />
                                        </Button>
                                        <Button
                                            justIcon
                                            href="#pablo"
                                            target="_blank"
                                            color="transparent"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className={"fab fa-google-plus-g"} />
                                        </Button>
                                        </div>
                                    </CardHeader>
                                    <p className={classes.divider}>Or Be Classical</p>
                                    {/* LOGIN FORM */}
                                    <CardBody>
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputIconsColor} />
                                                </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputIconsColor}>
                                                    <Lock className={classes.inputIconsColor} />
                                                    </Icon>
                                                </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    {/* LOGIN BUTTON */}
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg">
                                        Login
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div> 
            </div>
        </>
        
    );
}

function useLockBodyScroll() {
    useLayoutEffect(() => {
     // Get original body overflow
     const originalStyle = window.getComputedStyle(document.body).overflow;  
     // Prevent scrolling on mount
     document.body.style.overflow = 'hidden';
     // Re-enable scrolling when component unmounts
     return () => document.body.style.overflow = originalStyle;
     }, []); // Empty array ensures effect is only run on mount and unmount
  }
  